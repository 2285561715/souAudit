import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';
import { NzDrawerService, NzMessageService, NzModalService } from 'ng-zorro-antd';
import { format } from 'date-fns';

import { AuditstepPreviewZjpsZxIndexsViewComponent } from './zjpszx/indexsview.component';
@Component({
  selector: 'app-auditstep-p-preview',
  templateUrl: './p-preview.component.html',
  styleUrls: ['./p-preview.component.less'],
})
export class AuditstepPPreviewComponent implements OnInit {
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

  // 专家评审——总校评估
  zxZjpsWeb(record: any): void {
    const dataValue = record;
    dataValue.ZjId = this.loadUser.user.id;

    const drawerRef = this.drawerService.create<AuditstepPreviewZjpsZxIndexsViewComponent, { value: any }, string>({
      nzTitle: '【' + record.appName + ' - ' + record.stepName + '】' + '专家评审',
      nzWidth: 1440,
      nzPlacement: 'left',
      nzMaskClosable: false,
      nzContent: AuditstepPreviewZjpsZxIndexsViewComponent,
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
  // fxZjpsWeb(record: any): void {
  //   // console.log('hellooo');
  //   // console.log(record);
  //   const dataValue = record;
  //   dataValue.ZjId = this.loadUser.user.id;

  //   const drawerRef = this.drawerService.create<DashboardZjpsFxComponent, { value: any }, string>({
  //     nzTitle: '【' + record.appName + ' - 虹口分校 - ' + record.stepName + '】' + '专家评审',
  //     nzWidth: 890,
  //     nzPlacement: 'left',
  //     nzMaskClosable: false,
  //     nzContent: DashboardZjpsFxComponent,
  //     nzContentParams: {
  //       value: dataValue,
  //     },
  //   });

  //   drawerRef.afterOpen.subscribe(() => {
  //     console.log('Drawer(Component) open');
  //   });

  //   drawerRef.afterClose.subscribe(data => {
  //     if (typeof data === 'string') {
  //       this.value = data;
  //     }
  //   });
  // }

  // ------------------------------------------------------------------
}
