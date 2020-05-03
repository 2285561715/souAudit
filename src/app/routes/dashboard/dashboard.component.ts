import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';
import { NzDrawerService, NzMessageService, NzModalService } from 'ng-zorro-antd';

import { DashboardDataUpZxComponent } from './dataupzx.component';
import { DashboardDataUpFxComponent } from './dataupfx.component';
import { DashboardFileUpZxComponent } from './fileupzx.component';
import { DashboardFileUpFxComponent } from './fileupfx.component';
import { DashboardZjpsZxComponent } from './zjpszx.component';
import { DashboardZjpsFxComponent } from './zjpsfx.component';
import { DashboardJhzjFxComponent } from './jhzjfx.component';
import { DashboardProfileViewComponent } from './fileup/pfofileview.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
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

  bname = '';
  unitName = '';
  unitNo = '';

  // -------------------------------------
  termData = [
    {
      key: 1,
      flag: '评估学期',
      termname: '2020 年',
      termno: '2020-1',
      appName: '上海开放大学2019年分校办学水平评估',
      dataEndDate: '2019-08-01',
      dataFromDate: '2016-08-01',
      deptId: '31030',
      deptName: '杨浦分校 ',
      endDate: '2019-12-31',
      esName: '上海开放大学分校办学水平评估指标及内涵（2019版）',
      esType: '分校办学水平评估',
      id: 17,
      inTime: '2019-08-16',
      isZx: false,
      startDate: '2019-08-31',
      verIndex: 'sou-zx-bxsp-2020',
      dtNo: 'sjfxtb_b08_hzbx',
    },
    {
      key: 2,
      termname: '2019 年',
      termno: '2019-2',
      appName: '上海开放大学2019年分校办学水平评估',
      dataEndDate: '2019-08-01',
      dataFromDate: '2016-08-01',
      deptId: '31030',
      deptName: '杨浦分校 ',
      endDate: '2019-12-31',
      esName: '上海开放大学分校办学水平评估指标及内涵（2019版）',
      esType: '分校办学水平评估',
      id: 17,
      inTime: '2019-08-16',
      isZx: false,
      startDate: '2019-08-31',
      verIndex: 'sou-fx-bxsp-2019',
      dtNo: 'sjfxtb_b08_hzbx',
    },
    {
      key: 3,
      termname: '2018 年',
      termno: '2019-1',
      appName: '上海开放大学2019年分校办学水平评估',
      dataEndDate: '2019-08-01',
      dataFromDate: '2016-08-01',
      deptId: '31030',
      deptName: '杨浦分校 ',
      endDate: '2019-12-31',
      esName: '上海开放大学分校办学水平评估指标及内涵（2019版）',
      esType: '分校办学水平评估',
      id: 18,
      inTime: '2019-08-16',
      isZx: false,
      startDate: '2019-08-31',
      verIndex: 'sou-fx-bxsp-2019',
      dtNo: 'sjfxtb_b08_hzbx',
    },
  ];
  mapOfExpandData: { [key: string]: boolean } = {};
  // -------------------------------------

  ngOnInit() {
    this.bname = this.loadUser.user.bname;
    this.unitName = this.loadUser.user.unitName;
    this.unitNo = this.loadUser.user.unitNo;

    this.loadInfo();
    console.log(this.listOfData);
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
          this.cdr.detectChanges();
        });
        break;
      default:
        break;
    }

    // console.log(this.listOfData);
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
      nzTitle: '【' + this.loadUser.user.bname + '】' + '填报数据表',
      nzWidth: 590,
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

  // -------------------------------------------
  // 分校年初计划年终总结上传file
  openJhZjFx(record: any): void {
    const dataValue = record;
    dataValue.deptId = this.loadUser.user.bid;
    dataValue.deptName = this.loadUser.user.bname;

    const drawerRef = this.drawerService.create<DashboardJhzjFxComponent, { value: any }, string>({
      nzTitle: '【' + this.loadUser.user.bname + '】 - 【' + '年初计划、年度总结】上报',
      nzWidth: 830,
      nzPlacement: 'left',
      nzMaskClosable: false,
      nzContent: DashboardJhzjFxComponent,
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

  // 专家评审——总校评估
  zxZjpsWeb(record: any): void {
    const dataValue = record;
    dataValue.ZjId = this.loadUser.user.id;

    const drawerRef = this.drawerService.create<DashboardZjpsZxComponent, { value: any }, string>({
      nzTitle: '【' + record.appName + ' - ' + record.stepName + '】' + '专家评审',
      nzWidth: 890,
      nzPlacement: 'left',
      nzMaskClosable: false,
      nzContent: DashboardZjpsZxComponent,
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

  // 专家评审——分校评估
  fxZjpsWeb(record: any): void {
    // console.log('hellooo');
    // console.log(record);
    const dataValue = record;
    dataValue.ZjId = this.loadUser.user.id;

    const drawerRef = this.drawerService.create<DashboardZjpsFxComponent, { value: any }, string>({
      nzTitle: '【' + record.appName + ' - 虹口分校 - ' + record.stepName + '】' + '专家评审',
      nzWidth: 890,
      nzPlacement: 'left',
      nzMaskClosable: false,
      nzContent: DashboardZjpsFxComponent,
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
  // 打开模版预览抽屉
  openProfile(record: any): void {
    const drawerRef = this.drawerService.create<DashboardProfileViewComponent, { value: string }, string>({
      nzTitle: record.esName + ' 评估模版',
      nzWidth: 1280,
      nzPlacement: 'left',
      nzMaskClosable: false,
      nzContent: DashboardProfileViewComponent,
      nzContentParams: {
        value: record.verIndex,
      },
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      console.log('关闭=' + data);
      if (typeof data === 'string') {
        this.value = data;
      }
    });
  }
}
