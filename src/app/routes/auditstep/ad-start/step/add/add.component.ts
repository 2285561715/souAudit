import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzModalRef, NzMessageService, NzTimeValueAccessorDirective } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { defaultCipherList } from 'constants';

@Component({
  selector: 'app-auditstep-ad-start-step-add',
  templateUrl: './add.component.html',
})
export class AuditstepAdStartStepAddComponent implements OnInit {
  msg: any;
  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    public http: _HttpClient,
  ) {}
  record: any = {};
  zsRecord: any = {};
  activeNode: any = {};
  i: any;
  appId: number;

  schema: SFSchema = {
    properties: {
      stepName: { type: 'string', title: '阶段任务名称' },
      stepType: {
        type: 'string',
        title: '阶段类别',
        enum: ['评估启动', '数据采集', '数据填报', '数据审核', '预评估', '专家评审', '评估报告', '评估结束'],
        default: '评估启动',
      },
      fromDate: { type: 'string', title: '开始日期' },
      endDate: { type: 'string', title: '截止日期' },
      isZx: {
        type: 'string',
        title: '阶段对象',
        enum: [{ label: '总校', value: '1' }, { label: '分校', value: '2' }, { label: '总校和分校', value: '3' }],
        default: '1',
      },
    },
    required: ['indexName'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 130,
      grid: { span: 12 },
    },
    $stepName: {
      widget: 'string',
      grid: { span: 12 },
    },
    $stepType: {
      widget: 'select',
      grid: { span: 10 },
    },
    $fromDate: {
      widget: 'date',
      grid: { span: 12 },
    },
    $endDate: {
      widget: 'date',
      grid: { span: 10 },
    },
    $isZx: {
      widget: 'radio',
      grid: { span: 12 },
    },
  };

  ngOnInit(): void {
    this.i = this.zsRecord;
  }

  save(valueData: any) {
    valueData.appId = this.record.id;
    valueData.appName = this.record.appName;
    valueData.fromDate = valueData.fromDate.substring(0, 10);
    valueData.endDate = valueData.endDate.substring(0, 10);
    valueData.isDone = 0;
    this.http.post(`/api/adapply/steps`, valueData).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });
  }

  close() {
    this.modal.destroy();
  }
}
