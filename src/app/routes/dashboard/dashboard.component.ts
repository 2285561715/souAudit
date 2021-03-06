import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';
import { NzDrawerService, NzMessageService, NzModalService } from 'ng-zorro-antd';

import { DashboardDataUpZxComponent } from './dataupzx.component';
import { DashboardDataUpFxComponent } from './dataupfx.component';
import { DashboardFileUpZxComponent } from './fileupzx.component';
import { DashboardFileUpFxComponent } from './fileupfx.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private modal: ModalHelper,
    private drawerService: NzDrawerService,
    private msgSrv: NzMessageService,
    private modalService: NzModalService,
    public loadUser: SettingsService,
  ) {}

  listOfData: any[] = [];
  value: string;
  visible = false;
  statusStr = '1';

  ngOnInit() {
    this.loadInfo();
  }

  loadInfo(): void {
    // 获得评估任务-------------------------------------------------

    switch (this.loadUser.user.unitNo) {
      case 'zxbmtb':
        this.http.get('/api/adapply').subscribe((res: any[]) => {
          res.forEach(item => {
            if (item.isZx && this.loadUser.user.userFrom === 'zx') {
              this.listOfData.push(item);
            }
          });
          this.cdr.detectChanges();
        });
        break;
      case 'fxtb':
        this.http.get('/api/adapply').subscribe((res: any[]) => {
          res.forEach(item => {
            if (!item.isZx && this.loadUser.user.userFrom === 'fx') {
              this.listOfData.push(item);
            }
          });
          this.cdr.detectChanges();
        });
        break;
      case 'xnzj':
        this.http.get('/api/zjps/index?userId=' + this.loadUser.user.id).subscribe((res: any) => {
          this.listOfData.push(res);
          // this.listOfData = [...this.listOfData, res];
          this.cdr.detectChanges();
        });
        break;
      case 'xwzj':
        this.http.get('/api/zjps/index?userId=' + this.loadUser.user.id).subscribe((res: any) => {
          this.listOfData.push(res);
          // this.listOfData = [...this.listOfData, res];
          console.log(res);
          this.cdr.detectChanges();
        });
        break;
      default:
        break;
    }

    // this.http.get('/api/adapply').subscribe((res: any[]) => {
    //   res.forEach(item => {
    //     if (item.isZx && this.loadUser.user.userFrom === 'zx') {
    //       this.listOfData.push(item);
    //     }
    //     if (!item.isZx && this.loadUser.user.userFrom === 'fx') {
    //       this.listOfData.push(item);
    //     }
    //   });
    //   this.cdr.detectChanges();
    // });
  }

  // 总校数据上报sjtb
  openDataUp(record: any): void {
    const dataValue = record;
    dataValue.deptId = this.loadUser.user.bid;
    dataValue.deptName = this.loadUser.user.bname;

    const drawerRef = this.drawerService.create<DashboardDataUpZxComponent, { value: any }, string>({
      nzTitle: '【' + this.loadUser.user.bname + '】' + '填报任务',
      nzWidth: 490,
      nzPlacement: 'left',
      nzMaskClosable: false,
      nzContent: DashboardDataUpZxComponent,
      nzContentParams: {
        value: dataValue,
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
  // 分校数据上报sjtb
  openDataUpFx(record: any): void {
    const dataValue = record;
    dataValue.deptId = this.loadUser.user.bid;
    dataValue.deptName = this.loadUser.user.bname;

    const drawerRef = this.drawerService.create<DashboardDataUpFxComponent, { value: any }, string>({
      nzTitle: '【' + this.loadUser.user.bname + '】' + '数据填报任务',
      nzWidth: 800,
      nzPlacement: 'left',
      nzMaskClosable: false,
      nzContent: DashboardDataUpFxComponent,
      nzContentParams: {
        value: dataValue,
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
  // 总校文件上传file
  openFileUp(record: any): void {
    const dataValue = record;
    dataValue.deptId = this.loadUser.user.bid;
    dataValue.deptName = this.loadUser.user.bname;

    const drawerRef = this.drawerService.create<DashboardFileUpZxComponent, { value: any }, string>({
      nzTitle: '【' + this.loadUser.user.bname + '】' + '文字材料上传',
      nzWidth: 500,
      nzPlacement: 'left',
      nzMaskClosable: false,
      nzContent: DashboardFileUpZxComponent,
      nzContentParams: {
        value: dataValue,
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
  // -------------------------------------------
  // 分校文件上传file
  openFileUpFx(record: any): void {
    const dataValue = record;
    dataValue.deptId = this.loadUser.user.bid;
    dataValue.deptName = this.loadUser.user.bname;

    const drawerRef = this.drawerService.create<DashboardFileUpFxComponent, { value: any }, string>({
      nzTitle: '【' + this.loadUser.user.bname + '】' + '文字单片材料上传',
      nzWidth: 830,
      nzPlacement: 'left',
      nzMaskClosable: false,
      nzContent: DashboardFileUpFxComponent,
      nzContentParams: {
        value: dataValue,
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
  // --------------------------------------------
}
