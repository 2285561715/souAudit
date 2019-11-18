import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';
import { DomSanitizer } from '@angular/platform-browser';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
  selector: 'app-dashboard-zjpsdf-fxps',
  templateUrl: './fxps.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardZjpsdfFxpsComponent implements OnInit {
  i: any;
  schema: SFSchema = {
    properties: {
      psPoint: {
        type: 'string',
        title: '评审打分',
        enum: [
          { label: '发展态势趋向正面且加速度为正，设为A档', value: 'A' },
          { label: '发展态势趋向正面且加速度为负，设为B档', value: 'B' },
          { label: '发展态势平稳或出现波动，设为C档', value: 'C' },
          { label: '发展态势趋向负面，设为D档', value: 'D' },
        ],
        default: 'A',
      },
      psText: { type: 'string', title: '意见反馈' },
    },
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 130,
      grid: { span: 12 },
    },
    $psPoint: {
      widget: 'radio',
      grid: { span: 20 },
      height: '45px',
      lineHeight: '45px',
    },
    $psText: {
      widget: 'textarea',
      grid: { span: 20 },
      autosize: { minRows: 5, maxRows: 6 },
    },
  };
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    private drawerService: NzDrawerService,
    private drawerRef: NzDrawerRef<string>,
    private sanitizer: DomSanitizer,
    public loadUser: SettingsService, // private modal: NzModalRef,
  ) {}

  listOfData: any[] = [];
  value: any = {};
  listOfSelFlds: any[] = [];
  listOfTableDesc: any = {};
  outDataUrl = '';
  downExcelUrl = '';
  isVisible = false;

  listOfFields: any = [];
  listOfFieldsZH: any = [];

  radioValue = 'A';
  style = {
    display: 'block',
    height: '45px',
    lineHeight: '45px',
  };

  salesPieData = [
    {
      x: '家用电器',
      y: 4544,
    },
    {
      x: '食用酒水',
      y: 3321,
    },
    {
      x: '个护健康',
      y: 3113,
    },
    {
      x: '服饰箱包',
      y: 2341,
    },
    {
      x: '母婴产品',
      y: 1231,
    },
    {
      x: '其他',
      y: 1231,
    },
  ];

  trVisible = 'false';

  ngOnInit(): void {
    console.log(this.value.branchInfoList);
    this.i = 5;
  }

  save(value: any) {
    // value.id = this.record.id;
    const date = new Date();
    // this.http.post(`/api/main/infos`, value).subscribe(res => {
    //   this.msgSrv.success('保存成功');
    //   // this.modal.close(true);
    // });
  }

  close() {
    // this.modal.destroy();
  }
}
