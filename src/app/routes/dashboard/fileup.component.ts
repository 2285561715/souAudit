import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';

import { DashboardFileUpZxWzclComponent } from './fileup/zxwzcl.component';

@Component({
  selector: 'app-dashboard-dataup',
  templateUrl: './fileup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardFileUpComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    private drawerService: NzDrawerService,
    private drawerRef: NzDrawerRef<string>,
  ) {}

  value: any = [];
  listOfAppStep: any = [];

  ngOnInit() {
    this.loadSteps();
    // console.log('value=');
    // console.log(this.value);
  }

  loadSteps(): void {
    // 可以传 conType='sjtb' or 'file'
    this.http
      .get('/api/deptrwcx?appId=' + this.value.id + '&deptId=' + this.value.deptId + '&conType=file')
      .subscribe((res: any) => {
        this.listOfAppStep = res;
        console.log(this.listOfAppStep);
        this.cdr.detectChanges();
      });
  }

  // 文件上传file
  fileUpFun(dt: any): void {
    const tdata = this.value;
    tdata.dtNo = dt.dtNo;
    const drawerRef = this.drawerService.create<DashboardFileUpZxWzclComponent, { value: any }, string>({
      nzTitle: '【' + dt.dtName + '】材料上传',
      nzWidth: document.body.clientWidth - 490,
      nzPlacement: 'right',
      nzMaskClosable: false,
      nzContent: DashboardFileUpZxWzclComponent,
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
  // close(res: any) {
  //   this.modal.close(res);
  // }
}
