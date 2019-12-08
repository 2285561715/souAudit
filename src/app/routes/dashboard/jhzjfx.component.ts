import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';

import { DashboardFileUpFxJhzjComponent } from './fileup/fxjhzj.component';

@Component({
  selector: 'app-dashboard-jhzj-fx',
  templateUrl: './jhzjfx.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardJhzjFxComponent implements OnInit {
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
    console.log(this.value);
  }

  loadInfo(): void {
    this.listOfFileList = [];
    this.http.get('/api/fxjhzj?xxdm=' + this.value.deptId).subscribe((res: any) => {
      // console.log(res);
      res.forEach(item => {
        if (item.ncjhFile) {
          const idxjh = item.ncjhFile.lastIndexOf('.');
          const exNcName = item.ncjhFile.substring(idxjh + 1, item.ncjhFile.length);
          item.exNcName = exNcName;
        }
        if (item.nzzjFile) {
          const idxzj = item.nzzjFile.lastIndexOf('.');
          const exNzName = item.nzzjFile.substring(idxzj + 1, item.nzzjFile.length);
          item.exNzName = exNzName;
        }
        this.listOfFileList = [...this.listOfFileList, item];
      });
      this.cdr.detectChanges();
    });
  }

  // 文件上传file
  fileUpFun(dt: any): void {
    const tdata = this.value;
    tdata.xxdm = dt.xxdm;
    tdata.nd = dt.nd;
    tdata.ncjhFile = dt.ncjhFile;
    tdata.nzzjFile = dt.nzzjFile;
    tdata.exNcName = dt.exNcName;
    tdata.exNzName = dt.exNzName;

    const drawerRef = this.drawerService.create<DashboardFileUpFxJhzjComponent, { value: any }, string>({
      nzTitle: '<' + this.value.deptName + '>【' + dt.nd + '】计划总结上报',
      nzWidth: document.body.clientWidth - 830,
      nzPlacement: 'right',
      // nzMaskClosable: false,
      nzContent: DashboardFileUpFxJhzjComponent,
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
}
