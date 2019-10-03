import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';
// import { DashboardDataUpZxtbK09IndexComponent } from './fxtbk09/index.component';
// import { DashboardDataUpZxtbK10IndexComponent } from './fxtbk10/index.component';

@Component({
  selector: 'app-dashboard-dataup-fxsjtb',
  templateUrl: './fxsjtb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDataUpFxSjtbComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    private drawerService: NzDrawerService,
    private drawerRef: NzDrawerRef<string>,
    public loadUser: SettingsService,
  ) {}

  listOfData: any[] = [];
  value: any = {};
  listOfTableDesc: any = {};
  descRules = '';
  checkRules = '';
  tableHtml = '';
  upUrl = '';

  data = {
    otherdata: 1,
    time: new Date(),
  };

  listOfFields: any = [];
  listOfFieldsZH: any = [];

  // @ViewChild(DashboardDataUpZxtbK09IndexComponent, { static: false })
  // private k09Component: DashboardDataUpZxtbK09IndexComponent;

  // @ViewChild(DashboardDataUpZxtbK10IndexComponent, { static: false })
  // private k10Component: DashboardDataUpZxtbK10IndexComponent;

  ngOnInit(): void {
    // 数据导入地址
    // 登录用户部门id
    this.upUrl =
      '/api/excel/import?tableName=' + this.value.dtNo + '&appId=18&stepId=29&deptId=' + this.loadUser.user.bid;
    console.log(this.upUrl);
    // console.log(this.value);
    // 获得数据表的 填写规则、校验规则、样例数据等
    this.http.get('/api/data/tables/' + this.value.dtNo).subscribe((res: any[]) => {
      this.listOfTableDesc = res;
      this.cdr.detectChanges();
      this.descRules = this.listOfTableDesc.descRules;
      this.checkRules = this.listOfTableDesc.checkRules;
      this.tableHtml = this.listOfTableDesc.tableHtml;
      this.listOfFields = this.listOfTableDesc.zdNameList.split(',');
      // console.log(this.listOfFields);
      this.listOfFieldsZH = this.listOfTableDesc.zdZhNameList.split(',');
      // console.log(this.listOfFieldsZH);
    });
  }

  fupChange(event): void {
    // console.log(event);
    this.msgSrv.success('数据导入成功');
    // switch (this.value.dtNo) {
    //   case 'sjzxtb_k09_jsjbxx':
    //     if (event.fileList && event.fileList.length > 0) {
    //       this.k09Component.loadInfo();
    //     }
    //     break;
    //   case 'sjzxtb_k10_glryxx':
    //     if (event.fileList && event.fileList.length > 0) {
    //       this.k10Component.loadInfo();
    //     }
    //     break;
    //   default:
    //     break;
    // }
  }
}
