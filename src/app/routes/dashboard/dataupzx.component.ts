import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd/modal';

import { DashboardDataUpZxSjtbComponent } from './dataupzx/zxsjtb.component';

@Component({
  selector: 'app-dashboard-dataup-zx',
  templateUrl: './dataupzx.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDataUpZxComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    private drawerService: NzDrawerService,
    private drawerRef: NzDrawerRef<string>,
    private modalService: NzModalService,
  ) {}

  value: any = [];
  listOfTableList: any = [];
  listOfData: any[] = [];
  parmOfSql: any = {};

  ngOnInit() {
    this.loadSteps();
  }

  loadSteps(): void {
    this.parmOfSql = {
      tableName: 'ad_apply_wbstb',
      fieldList: [
        'id',
        'ver_index',
        'app_id',
        'step_id',
        'dt_no',
        'dt_name',
        'index_id',
        'index_name',
        'index_remark',
        'up_time',
        'mod_time',
        'check_time',
      ],
      predication: " app_id='17' and step_id='21' and dept_id='40' and con_type='sjtb' ",
      orderFieldList: ['dt_no'],
      orderDirection: 'ASC',
    };
    this.http.post('/api/dynamic/search', this.parmOfSql).subscribe((res: any[]) => {
      this.listOfTableList = res;
      // console.log(this.listOfData);
      this.cdr.detectChanges();
    });

    // 可以传 conType='sjtb' or 'file'
    // this.http
    //   .get('/api/deptrwcx?appId=' + this.value.id + '&deptId=' + this.value.deptId + '&conType=sjtb')
    //   .subscribe((res: any) => {
    //     this.listOfTableList = res;
    //     console.log(this.listOfTableList);
    //     this.cdr.detectChanges();
    //   });
  }

  // 数据上传file
  dataUpFun(dt: any): void {
    const tdata = this.value;
    tdata.dtNo = dt.dt_no;
    tdata.dtName = dt.dt_name;
    tdata.stepId = dt.step_id;

    const drawerRef = this.drawerService.create<DashboardDataUpZxSjtbComponent, { value: any }, string>({
      nzTitle: '<b>【' + dt.dt_name + '】数据填报</b>',
      nzWidth: document.body.clientWidth - 180,
      nzPlacement: 'right',
      // nzMaskClosable: false,
      nzContent: DashboardDataUpZxSjtbComponent,
      nzContentParams: {
        value: tdata,
      },
    });

    drawerRef.afterOpen.subscribe(() => {
      // console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      if (typeof data === 'string') {
        this.value = data;
      }
    });
  }

  showComet(titleStr: string, commentStr: string): void {
    this.modalService.info({
      nzTitle: '【<b>' + titleStr + '</b>】内涵说明',
      nzContent: '<p>' + commentStr + '</p>',
      nzWidth: 580,
      nzOnOk: () => console.log('Info OK'),
    });
  }
  // close(res: any) {
  //   this.modal.close(res);
  // }
}
