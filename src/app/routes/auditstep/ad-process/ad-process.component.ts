import { Component, OnInit, Input, TemplateRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzFormatEmitEvent, NzDrawerRef, NzDrawerService, NzMessageService, NzModalService } from 'ng-zorro-antd';

import { AuditstepAdProcessStepComponent } from './step.component';

@Component({
  selector: 'app-auditstep-ad-process',
  templateUrl: './ad-process.component.html',
})
export class AuditstepAdProcessComponent implements OnInit {
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

  openStepInfo(record: any): void {
    const drawerRef = this.drawerService.create<AuditstepAdProcessStepComponent, { value: any }, string>({
      nzTitle: '【' + record.appName + '】进程',
      nzWidth: 500,
      nzPlacement: 'right',
      // nzMaskClosable: false,
      // nzClosable: false,
      nzContent: AuditstepAdProcessStepComponent,
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
  //
}
