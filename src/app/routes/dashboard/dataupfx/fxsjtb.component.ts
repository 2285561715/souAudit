import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard-dataup-fxsjtb',
  templateUrl: './fxsjtb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDataUpFxSjtbComponent implements OnInit {
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
  listOfTableDesc: any = {};
  outDataUrl = '';

  listOfFields: any = [];
  listOfFieldsZH: any = [];

  ngOnInit(): void {
    this.value.stepId = 29;
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
}
