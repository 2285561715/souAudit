import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';
import { NzDrawerService, NzMessageService, NzModalService } from 'ng-zorro-antd';

import { DashboardDataUpZxComponent } from './dataupzx.component';
import { DashboardDataUpFxComponent } from './dataupfx.component';
import { DashboardZjpsZxComponent } from './zjpszx.component';
import { DashboardZjpsFxComponent } from './zjpsfx.component';
import { DashboardJhzjFxComponent } from './jhzjfx.component';
import { DashboardDataUpZxIndexsViewComponent } from './dataupzx/indexsview.component';
import { DashboardDataUpFxIndexsViewComponent } from './dataupfx/indexsview.component';
import { DashboardManualVideoPlayComponent } from './manual/videoplay.component';

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
  pgYear: number;
  bname = '';
  unitName = '';
  unitNo = '';

  // -------------------------------------
  mapOfExpandData: { [key: string]: boolean } = {};
  // -------------------------------------

  ngOnInit() {
    this.bname = this.loadUser.user.bname;
    this.unitName = this.loadUser.user.unitName;
    this.unitNo = this.loadUser.user.unitNo;

    const pgdate = new Date();
    this.pgYear = pgdate.getFullYear();

    this.loadInfo();
  }

  loadInfo(): void {
    // 获得评估任务-------------------------------------------------
    switch (this.loadUser.user.unitNo) {
      case 'zxbmtb':
        // this.http.get('/api/adapply').subscribe((res: any[]) => {
        //   res.forEach(item => {
        //     if (item.isZx && this.loadUser.user.userFrom === 'zx') {
        //       this.listOfData.push(item);
        //     }
        //   });
        //   this.cdr.detectChanges();
        // });
        this.listOfData = [
          {
            appName: '2020年上海开放大学整体办学水平评估',
            dataEndDate: '2019-12-31',
            dataFromDate: '2019-01-01',
            endDate: '2020-05-31',
            esName: '上海开放大学整体办学水平评估指标及内涵（试行）',
            esType: '整体办学水平评估',
            id: 19,
            step_id: 32,
            inTime: '2020-04-30',
            isZx: true,
            startDate: '2020-05-01',
            verIndex: 'sou-zx-bxsp-2020',
          },
        ];
        break;
      case 'fxtb':
        // this.http.get('/api/adapply').subscribe((res: any[]) => {
        //   console.log(res);
        //   res.forEach(item => {
        //     if (!item.isZx && this.loadUser.user.userFrom === 'fx') {
        //       this.listOfData.push(item);
        //     }
        //   });
        //   this.cdr.detectChanges();
        // });
        this.listOfData = [
          {
            appName: '2020年上海开放大学分校办学水平评估',
            dataEndDate: '2019-12-31',
            dataFromDate: '2019-01-01',
            endDate: '2020-05-31',
            esName: '上海开放大学分校办学水平评估指标及内涵（试行）',
            esType: '分校办学水平评估',
            id: 20,
            step_id: 35,
            inTime: '2020-04-30',
            isZx: false,
            startDate: '2020-05-01',
            verIndex: 'sou-fx-bxsp-2020',
          },
        ];
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
      // console.log('Drawer(Component) open');
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
      // console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      if (typeof data === 'string') {
        this.value = data;
      }
    });
  }

  // -------------------------------------------
  // 视频演示
  openVideo(record: any, fileName: string) {
    const dataValue = record;
    dataValue.fileUrl = fileName;
    this.modal.create(DashboardManualVideoPlayComponent, { record }, { size: 'lg' }).subscribe((res: any) => {
      this.loadInfo();
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
  // 总校按指标展开上传材料，打开模版预览抽屉
  openProfileZX(record: any): void {
    // console.log(record);
    const subData = {
      verIndex: record.verIndex,
      esName: record.esName,
      appId: record.id,
      stepId: record.step_id,
      deptId: this.loadUser.user.bid,
    };
    const drawerRef = this.drawerService.create<DashboardDataUpZxIndexsViewComponent, { value: any }, string>({
      nzTitle: '<b>【' + record.appName + '】 数据填报和材料上传</b>',
      nzWidth: 1280,
      nzPlacement: 'left',
      nzMaskClosable: false,
      nzContent: DashboardDataUpZxIndexsViewComponent,
      nzContentParams: {
        value: subData,
      },
    });

    drawerRef.afterOpen.subscribe(() => {
      // console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      console.log('关闭=' + data);
      if (typeof data === 'string') {
        this.value = data;
      }
    });
  }

  // --------------------------------------------
  // 分校按指标展开上传材料，打开模版预览抽屉
  openProfileFX(record: any): void {
    const subData = {
      verIndex: record.verIndex,
      esName: record.esName,
      appId: record.id,
      stepId: record.step_id,
      deptId: this.loadUser.user.bid,
    };

    const drawerRef = this.drawerService.create<DashboardDataUpFxIndexsViewComponent, { value: any }, string>({
      nzTitle: '<b>【' + record.appName + '】 数据填报和材料上传</b>',
      nzWidth: 1280,
      nzPlacement: 'left',
      nzMaskClosable: false,
      nzContent: DashboardDataUpFxIndexsViewComponent,
      nzContentParams: {
        value: subData,
      },
    });

    drawerRef.afterOpen.subscribe(() => {
      // console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      console.log('关闭=' + data);
      if (typeof data === 'string') {
        this.value = data;
      }
    });
  }
}
