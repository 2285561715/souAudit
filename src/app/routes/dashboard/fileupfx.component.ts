import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';

import { DashboardFileUpFxWzclComponent } from './fileup/fxwzcl.component';

@Component({
  selector: 'app-dashboard-fileup-fx',
  templateUrl: './fileupfx.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardFileUpFxComponent implements OnInit {
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
  listOfFileList: any = [];

  ngOnInit() {
    this.loadInfo();
  }

  loadInfo(): void {
    // 可以传 conType='sjtb' or 'file'
    this.listOfFileList = [];
    this.http
      .get('/api/deptrwcx?appId=' + this.value.id + '&deptId=' + this.value.deptId + '&conType=file')
      .subscribe((res: any) => {
        this.listOfFileList = res;
        console.log(this.listOfFileList);
        this.cdr.detectChanges();
      });

    // this.http.get('/api/wzfile/files?fileType=fxwz').subscribe((res: any[]) => {
    //   this.listOfFileList = res;
    //   this.cdr.detectChanges();
    // });
  }

  // 文件上传file
  fileUpFun(dt: any): void {
    const tdata = this.value;
    tdata.dtNo = dt.dtNo;
    const drawerRef = this.drawerService.create<DashboardFileUpFxWzclComponent, { value: any }, string>({
      nzTitle: '【' + dt.dtName + '】材料上传',
      nzWidth: document.body.clientWidth - 490,
      nzPlacement: 'right',
      // nzMaskClosable: false,
      nzContent: DashboardFileUpFxWzclComponent,
      nzContentParams: {
        value: tdata,
      },
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      this.loadInfo();
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
