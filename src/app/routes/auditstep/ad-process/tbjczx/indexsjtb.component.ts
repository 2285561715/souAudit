import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService, NzModalService, NzDrawerService } from 'ng-zorro-antd';
import { AuditstepAdProcessTbjcZxDataViewComponent } from './dataview.component';

@Component({
  selector: 'app-auditstep-ad-process-tbjczx-index-sjtb',
  templateUrl: './indexsjtb.component.html',
})
export class AuditstepAdProcessTbjcZxIndexSjtbComponent implements OnInit {
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
        // res.forEach(item => {
        //   if (item.fileupUrl) {
        //     const idx = item.fileupUrl.lastIndexOf('.');
        //     const exName = item.fileupUrl.substring(idx + 1, item.fileupUrl.length);
        //     item.exName = exName;
        //   }
        //   this.listOfData = [...this.listOfData, item];
        // });
        this.listOfData = res;
        this.cdr.detectChanges();
      });
  }

  // 评估管理员，查看已填报数据，并可修改
  dataBarShow(record: any): void {
    const drawerRef = this.drawerService.create<AuditstepAdProcessTbjcZxDataViewComponent, { value: any }, string>({
      nzTitle: '<b>【' + record.dtName + '】数据填报</b>',
      nzWidth: document.body.clientWidth - 280,
      nzPlacement: 'right',
      // nzMaskClosable: false,
      nzContent: AuditstepAdProcessTbjcZxDataViewComponent,
      nzContentParams: {
        value: record,
      },
    });

    drawerRef.afterOpen.subscribe(() => {
      // console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      // this.loadSteps();
      if (typeof data === 'string') {
        this.value = data;
      }
    });
  }
}
