import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { of, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sysdata-zx-handupfile-edit',
  templateUrl: './edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SysdataZxHandupfileEditComponent implements OnInit {
  record: any = {};
  i: any;

  listOfDept = [{ label: '请选择', value: 0 }];
  optionList$ = new BehaviorSubject<any>({});
  dutyDeptName: string;

  schema: SFSchema = {
    properties: {
      fileName: { type: 'string', title: '文字资料名称' },
      esType: {
        type: 'string',
        title: '评估类别',
        enum: ['整体办学水平评估', '分校办学水平评估'],
        default: '整体办学水平评估',
      },
      dutyDept: { type: 'string', title: '责任部门', default: 0 },
      remark: { type: 'string', title: '资料内容说明' },
    },
    required: ['fileName'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 130,
      grid: { span: 11 },
    },
    $fileName: {
      widget: 'string',
      grid: { span: 22 },
    },
    $esType: {
      widget: 'select',
      grid: { span: 11 },
    },
    $dutyDept: {
      widget: 'select',
      grid: { span: 11 },
      asyncData: () => this.optionList$.asObservable(),
    },
    $remark: {
      widget: 'textarea',
      grid: { span: 22 },
      autosize: { minRows: 3, maxRows: 6 },
    },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    public http: _HttpClient,
  ) {}

  ngOnInit(): void {
    this.i = this.record;
    this.loadDept();
  }

  loadDept(): void {
    this.http.get('/api/departments').subscribe((res: any) => {
      const temp = res;
      temp.forEach(tmp => {
        const dept = {
          label: tmp.bname,
          value: tmp.id,
        };
        this.listOfDept.push(dept);
      });
      this.optionList$.next(this.listOfDept);
    });
  }

  save(value: any) {
    value.id = this.record.id;
    value.fileType = 'zxwz';
    const date = new Date();
    let month: string | number = date.getMonth() + 1;
    let strDate: string | number = date.getDate();
    month = month < 10 ? '0' + month : month;
    strDate = strDate < 10 ? '0' + strDate : strDate;

    value.modTime =
      date.getFullYear() +
      '-' +
      month +
      '-' +
      strDate +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      date.getSeconds();

    value.modRecords = '';

    this.listOfDept.forEach(element => {
      if (element.value === value.dutyDept) {
        this.dutyDeptName = element.label;
      }
    });
    value.dutyDeptName = this.dutyDeptName;

    this.http.put(`/api/wzfile/files`, value).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });
  }

  close() {
    this.modal.destroy();
  }
}
