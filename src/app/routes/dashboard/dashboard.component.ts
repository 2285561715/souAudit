import { Component, OnInit, Input, TemplateRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzFormatEmitEvent, NzDrawerRef, NzDrawerService, NzMessageService, NzModalService } from 'ng-zorro-antd';

import { DashboardDataUpComponent } from './dataup.component';

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
    this.http.get('/api/adapply').subscribe((res: any[]) => {
      this.listOfData = res;
      this.cdr.detectChanges();
    });
  }
  //
  openDataUp(record: any): void {
    // console.log(record);
    // console.log(this.loadUser.user);
    const dataValue = record;
    dataValue.deptId = this.loadUser.user.bid;
    dataValue.deptName = this.loadUser.user.bname;

    const drawerRef = this.drawerService.create<DashboardDataUpComponent, { value: any }, string>({
      nzTitle: record.appName + '【' + this.loadUser.user.bname + '】' + '填报任务',
      nzWidth: 550,
      nzPlacement: 'left',
      nzMaskClosable: false,
      nzContent: DashboardDataUpComponent,
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
