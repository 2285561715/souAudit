import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService, NzModalService, NzDrawerService } from 'ng-zorro-antd';

@Component({
  selector: 'app-auditstep-ad-process-tbjczx-index-pf',
  templateUrl: './indexpf.component.html',
})
export class AuditstepAdProcessTbjcZxIndexPfComponent implements OnInit {
  constructor(
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private modalService: NzModalService,
    private drawerService: NzDrawerService,
  ) {}

  listOfData: any[] = [];
  value: any = [];
  conStr = 'sjtb';

  ngOnInit() {
    console.log(this.value);
    this.loadInfo();
  }

  loadInfo(): void {}
}
