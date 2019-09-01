import { Component, OnInit, Input, TemplateRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzFormatEmitEvent, NzDrawerRef, NzDrawerService, NzMessageService, NzModalService } from 'ng-zorro-antd';

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
    // private settingService: SettingsService,
    public settings: SettingsService,
  ) {}

  listOfData: any[] = [];
  value: string;
  visible = false;

  ngOnInit() {
    this.loadInfo();
    console.log('dfd=');
    console.log(this.settings.user.userFrom);
  }

  loadInfo(): void {
    this.http.get('/api/adapply').subscribe((res: any[]) => {
      this.listOfData = res;
      this.cdr.detectChanges();
    });
  }
  //
}
