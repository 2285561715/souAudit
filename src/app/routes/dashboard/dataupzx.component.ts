import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd/modal';

import { DashboardDataUpZxSjtbComponent } from './dataup/zxsjtb.component';

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

  ngOnInit() {
    this.loadSteps();
    console.log('value=');
    console.log(this.value);
  }

  loadSteps(): void {
    // 可以传 conType='sjtb' or 'file'
    this.http
      .get('/api/deptrwcx?appId=' + this.value.id + '&deptId=' + this.value.deptId + '&conType=sjtb')
      .subscribe((res: any) => {
        this.listOfTableList = res;
        console.log(this.listOfTableList);
        this.cdr.detectChanges();
      });
  }

  // 文件上传file
  dataUpFun(dt: any): void {
    const tdata = this.value;
    tdata.dtNo = dt.dtNo;

    const drawerRef = this.drawerService.create<DashboardDataUpZxSjtbComponent, { value: any }, string>({
      nzTitle: '【' + dt.dtName + '】数据填报',
      nzWidth: document.body.clientWidth - 200,
      nzPlacement: 'right',
      // nzMaskClosable: false,
      nzContent: DashboardDataUpZxSjtbComponent,
      nzContentParams: {
        value: tdata,
      },
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
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
