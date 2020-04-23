import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { of, BehaviorSubject } from 'rxjs';
import { format } from 'date-fns';

@Component({
  selector: 'app-sysdata-portdata-edit',
  templateUrl: './edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SysdataPortDataEditComponent implements OnInit {
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
    value.id = this.record.id;
    const date = new Date();
    value.modTime = format(date, 'YYYY-MM-DD HH:mm:ss');

    const subData = {
      tableName: 'sj_dataports',
      updateValues:
        "es_type='" +
        value.es_type +
        "',port_no='" +
        value.port_no +
        "',port_name='" +
        value.port_name +
        "',remark='" +
        value.remark +
        "',mod_Time='" +
        value.modTime +
        "'",
      predication: 'id=' + value.id,
    };
    this.http.put('/api/dynamic/update', subData).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });
  }

  close() {
    this.modal.destroy();
  }
}
