import { Component, OnInit, Input, TemplateRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import {
  NzFormatEmitEvent,
  NzDrawerRef,
  NzDrawerService,
  NzMessageService,
  NzModalService,
  id_ID,
} from 'ng-zorro-antd';

import { AuditstepAdStartAddComponent } from './add/add.component';
import { AuditstepAdStartEditComponent } from './edit/edit.component';
import { AuditstepAdStartStepComponent } from './step/step.component';

@Component({
  selector: 'app-auditstep-ad-start',
  templateUrl: './ad-start.component.html',
})
export class AuditstepAdStartComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private modal: ModalHelper,
    private drawerService: NzDrawerService,
    private msgSrv: NzMessageService,
    private modalService: NzModalService,
  ) {}

  listOfData: any[] = [];

  value: string;
  visible = false;

  ngOnInit() {
    this.loadInfo();
  }

  loadInfo(): void {
    this.http.get('/api/adapply').subscribe((res: any[]) => {
      this.listOfData = res;
      this.cdr.detectChanges();
    });
  }

  addInfo() {
    this.modal.create(AuditstepAdStartAddComponent, { size: 'md' }).subscribe((res: any) => {
      this.loadInfo();
    });
  }

  editInfo(record: any[]) {
    this.modal.create(AuditstepAdStartEditComponent, { record }, { size: 'lg' }).subscribe((res: any) => {
      this.loadInfo();
    });
  }

  openStepInfo(record: any): void {
    const drawerRef = this.drawerService.create<AuditstepAdStartStepComponent, { value: any }, string>({
      nzTitle: '【' + record.appName + '】阶段进程安排',
      nzWidth: 500,
      nzPlacement: 'left',
      nzMaskClosable: false,
      // nzClosable: false,
      nzContent: AuditstepAdStartStepComponent,
      nzContentParams: {
        // value: this.value,
        value: record,
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

  nzEvent(event: NzFormatEmitEvent): void {}
}
