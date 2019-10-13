import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService, NzModalService, NzDrawerService } from 'ng-zorro-antd';

@Component({
  selector: 'app-auditstep-ad-process-tbjczx-index',
  templateUrl: './index.component.html',
})
export class AuditstepAdProcessTbjcZxIndexComponent implements OnInit {
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
    // console.log(this.value);
    this.loadInfo();
  }

  loadInfo(): void {
    this.listOfData = [];
    this.http
      .get('/api/tbrwjdcx?appId=' + this.value.appId + '&pglx=zx&conType=' + this.conStr)
      .subscribe((res: any[]) => {
        this.listOfData = res;
        // console.log(this.listOfData);
        this.cdr.detectChanges();
      });
  }

  showData(funconstr: string): void {
    this.conStr = funconstr;
    this.loadInfo();
  }
}
