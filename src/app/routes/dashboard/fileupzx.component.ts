import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';

import { DashboardFileUpZxWzclComponent } from './fileup/zxwzcl.component';

@Component({
  selector: 'app-dashboard-fileup-zx',
  templateUrl: './fileupzx.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardFileUpZxComponent implements OnInit {
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
  listOfFileList: any = [];

  ngOnInit() {
    this.loadSteps();
  }

  loadSteps(): void {
    // 可以传 conType='sjtb' or 'file'
    this.listOfFileList = [];
    this.http
      .get('/api/deptrwcx?appId=' + this.value.id + '&deptId=' + this.value.deptId + '&conType=file')
      .subscribe((res: any) => {
        res.forEach(item => {
          if (item.fileupUrl) {
            const idx = item.fileupUrl.lastIndexOf('.');
            const exName = item.fileupUrl.substring(idx + 1, item.fileupUrl.length);
            item.exName = exName;
          }
          this.listOfFileList = [...this.listOfFileList, item];
        });
        this.cdr.detectChanges();
      });
  }

  // 文件上传file
  fileUpFun(dt: any): void {
    const tdata = this.value;
    tdata.dtNo = dt.dtNo;
    tdata.stepId = 21;

    const drawerRef = this.drawerService.create<DashboardFileUpZxWzclComponent, { value: any }, string>({
      nzTitle: '【' + dt.dtName + '】材料上传',
      nzWidth: document.body.clientWidth - 490,
      nzPlacement: 'right',
      // nzMaskClosable: false,
      nzContent: DashboardFileUpZxWzclComponent,
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
  // close(res: any) {
  //   this.modal.close(res);
  // }
}
