import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';
import { DomSanitizer } from '@angular/platform-browser';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
  selector: 'app-dashboard-zjpsdf-zxps',
  templateUrl: './zxps.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardZjpsdfZxpsComponent implements OnInit {
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

  ngOnInit(): void {
    // console.log(this.value);
    this.i = 5;
  }

  selOutFldsToExcel(fldsvalue: any): void {
    this.listOfSelFlds = fldsvalue;
  }

  // 全部数据导出功能
  exportToExcel(event: any): void {
    this.isVisible = true;
    this.http
      .get(
        '/api/data/export?tableNo=' +
          this.value.dtNo +
          '&tableName=' +
          this.value.dtName +
          '&tableLx=fx&deptId=' +
          this.loadUser.user.bid,
      )
      .subscribe(res => {
        this.downExcelUrl = res.data;
      });
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  save(value: any) {
    // value.id = this.record.id;
    value.dataFromDate = value.dataFromDate.substring(0, 10);
    value.dataEndDate = value.dataEndDate.substring(0, 10);
    value.releaseDate = value.releaseDate.substring(0, 10);
    const date = new Date();
    let month: string | number = date.getMonth() + 1;
    let strDate: string | number = date.getDate();
    month = month < 10 ? '0' + month : month;
    strDate = strDate < 10 ? '0' + strDate : strDate;

    value.lastModTime =
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

    this.http.post(`/api/main/infos`, value).subscribe(res => {
      this.msgSrv.success('保存成功');
      // this.modal.close(true);
    });
  }

  close() {
    // this.modal.destroy();
  }
}
