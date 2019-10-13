import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';

import { DashboardDataUpFxSjtbComponent } from './dataupfx/fxsjtb.component';

@Component({
  selector: 'app-dashboard-dataup-fx',
  templateUrl: './dataupfx.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDataUpFxComponent implements OnInit {
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

  ngOnInit() {
    this.loadSteps();
    console.log('value=');
    console.log(this.value);
  }

  loadSteps(): void {
    // 可以传 conType='sjtb' or 'file'
    this.listOfTableList = [];
    this.http
      .get('/api/deptrwcx?appId=' + this.value.id + '&deptId=' + this.value.deptId + '&conType=sjtb')
      .subscribe((res: any) => {
        this.listOfTableList = res;
        console.log(this.listOfTableList);
        this.cdr.detectChanges();
      });
  }

  // 分校数据填报，弹出框
  dataUpFun(dt: any): void {
    const tdata = this.value;
    tdata.dtNo = dt.dtNo;

    const drawerRef = this.drawerService.create<DashboardDataUpFxSjtbComponent, { value: any }, string>({
      nzTitle: '【' + dt.dtName + '】数据填报',
      nzWidth: document.body.clientWidth - 100,
      nzPlacement: 'right',
      // nzMaskClosable: false,
      nzContent: DashboardDataUpFxSjtbComponent,
      nzContentParams: {
        value: tdata,
      },
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      this.loadSteps();
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
}
