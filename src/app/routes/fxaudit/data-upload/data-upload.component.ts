import { Component, OnInit, Input, TemplateRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzFormatEmitEvent, NzDrawerRef, NzDrawerService, NzMessageService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-fxaudit-data-upload',
  templateUrl: './data-upload.component.html',
})
export class FxauditDataUploadComponent implements OnInit {
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
  //
}
