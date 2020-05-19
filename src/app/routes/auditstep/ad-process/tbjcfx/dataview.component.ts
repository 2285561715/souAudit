import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { STColumn } from '@delon/abc';
import { SFSchema } from '@delon/form';

@Component({
  selector: 'app-auditstep-ad-process-tbjcfx-data-view',
  templateUrl: './dataview.component.html',
})
export class AuditstepAdProcessTbjcFxDataViewComponent implements OnInit {
  description: any;
  tableTitle: any;
  checkRules: any;
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    private drawerService: NzDrawerService,
    private drawerRef: NzDrawerRef<string>,
    private sanitizer: DomSanitizer,
    public loadUser: SettingsService,
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

  ngOnInit(): void {
    // console.log(this.value);
    // 导出数据接口地址
    this.outDataUrl =
      '/api/excel/export?tableName=' +
      this.value.dtNo +
      '&dtName=' +
      this.value.dtName +
      '&deptId=' +
      this.loadUser.user.bid;

    // 获得数据表的 填写规则、校验规则、样例数据等
    this.http.get('/api/data/tables/' + this.value.dtNo).subscribe((res: any[]) => {
      this.listOfTableDesc = res;
      this.cdr.detectChanges();
      this.description = this.sanitizer.bypassSecurityTrustHtml(this.listOfTableDesc.descRules);
      this.tableTitle = this.sanitizer.bypassSecurityTrustHtml(this.listOfTableDesc.tableHtml);
      // this.checkRules = this.sanitizer.bypassSecurityTrustHtml(this.listOfTableDesc.checkRules);
      this.listOfFields = this.listOfTableDesc.zdNameList.split(',');
      this.listOfFieldsZH = this.listOfTableDesc.zdZhNameList.split(',');
    });
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
    // console.log(this.downExcelUrl);
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
