import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { of, BehaviorSubject } from 'rxjs';
import { format } from 'date-fns';

@Component({
  selector: 'app-sysdata-portdata-add',
  templateUrl: './add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SysdataPortDataAddComponent implements OnInit {
  record: any = {};
  i: any;

  listOfDept = [{ label: '请选择', value: 0 }];

  schema: SFSchema = {
    properties: {
      port_no: { type: 'string', title: '接口地址' },
      port_name: { type: 'string', title: '接口名称' },
      es_type: {
        type: 'string',
        title: '评估类别',
        enum: ['整体办学水平评估', '分校办学水平评估'],
        default: '整体办学水平评估',
      },
      remark: { type: 'string', title: '详细说明' },
    },
    required: ['port_no', 'port_name'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 130,
      grid: { span: 11 },
    },
    $port_no: {
      widget: 'string',
      grid: { span: 22 },
    },
    $port_name: {
      widget: 'string',
      grid: { span: 22 },
    },
    $es_type: {
      widget: 'select',
      grid: { span: 11 },
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
  }

  save(value: any) {
    const date = new Date();
    value.modTime = format(date, 'YYYY-MM-DD HH:mm:ss');

    const subData = {
      tableName: 'sj_dataports',
      fieldList: ['es_type', 'port_no', 'port_name', 'remark', 'mod_time'],
      valueList: [
        "'" + value.es_type + "'",
        "'" + value.port_no + "'",
        "'" + value.port_name + "'",
        "'" + value.remark + "'",
        "'" + value.modTime + "'",
      ],
    };

    this.http.post('/api/dynamic/add', subData).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });

    // this.http.request('post', '/api/dynamic/add', { body: subData }).subscribe((res: any) => {
    //   this.msgSrv.success('数据接口添加成功');
    // });
    // --------------------------------------
  }

  close() {
    this.modal.destroy();
  }
}
