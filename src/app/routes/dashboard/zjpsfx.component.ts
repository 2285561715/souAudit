import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd/modal';

import { DashboardZjpsdfFxpsComponent } from './zjpsdf/fxps.component';

@Component({
  selector: 'app-dashboard-zjps-fx',
  templateUrl: './zjpsfx.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardZjpsFxComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    private drawerService: NzDrawerService,
    private drawerRef: NzDrawerRef<string>,
    private modalService: NzModalService,
    public loadUser: SettingsService,
  ) {}

  value: any = [];
  listOfTableList: any = [];
  // zjNum = this.value.zjUserInfoList.length;

  ngOnInit() {
    this.loadSteps();
  }

  loadSteps(): void {
    console.log(this.value);
    this.http
      .get(
        '/api/stepwbs/zjpsrwSee/fx?appId=' +
          this.value.appId +
          '&stepId=' +
          this.value.stepId +
          '&zjId=' +
          this.value.ZjId,
      )
      .subscribe((res: any) => {
        this.listOfTableList = res;
        console.log(this.listOfTableList);
        this.cdr.detectChanges();
      });
  }

  // 数据上传file
  dataUpFun(dt: any): void {
    const tdata = this.value;
    tdata.stepId = dt.stepId;

    const drawerRef = this.drawerService.create<DashboardZjpsdfFxpsComponent, { value: any }, string>({
      nzTitle: '【' + dt.indexName + '】评审',
      nzWidth: document.body.clientWidth - 180,
      nzPlacement: 'right',
      // nzMaskClosable: false,
      nzContent: DashboardZjpsdfFxpsComponent,
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
