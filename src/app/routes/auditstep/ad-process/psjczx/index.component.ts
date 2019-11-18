import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService, NzModalService, NzDrawerService } from 'ng-zorro-antd';
import { AuditstepAdProcessPsjcZxDataViewComponent } from './dataview.component';

@Component({
  selector: 'app-auditstep-ad-process-psjczx-index',
  templateUrl: './index.component.html',
})
export class AuditstepAdProcessPsjcZxIndexComponent implements OnInit {
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

    // api/stepwbs/zjpsrwSee/zx?appId=18&stepId=29&zjId=1

    this.http
      .get('/api/tbrwjdcx?appId=' + this.value.appId + '&pglx=zx&conType=' + this.conStr)
      .subscribe((res: any[]) => {
        res.forEach(item => {
          if (item.fileupUrl) {
            const idx = item.fileupUrl.lastIndexOf('.');
            const exName = item.fileupUrl.substring(idx + 1, item.fileupUrl.length);
            item.exName = exName;
          }
          this.listOfData = [...this.listOfData, item];
        });
        // this.listOfData = res;
        this.cdr.detectChanges();
      });
  }

  showData(funconstr: string): void {
    this.conStr = funconstr;
    this.loadInfo();
  }

  dataBarShow(record: any): void {
    this.modal.create(AuditstepAdProcessPsjcZxDataViewComponent, { size: 'xl' }).subscribe((res: any) => {});
  }
}
