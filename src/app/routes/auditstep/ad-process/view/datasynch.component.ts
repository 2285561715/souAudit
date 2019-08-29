import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzFormatEmitEvent, NzDrawerRef, NzDrawerService, NzMessageService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-auditstep-ad-process-view-data-synch',
  templateUrl: './datasynch.component.html',
})
export class AuditstepAdProcessViewDataSynchComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private modal: ModalHelper,
    private drawerService: NzDrawerService,
    private msgSrv: NzMessageService,
    private modalService: NzModalService,
  ) {}

  listOfSjcj: any = [];
  data: any = [];
  value: string;

  ngOnInit() {
    console.log(this.data);
    this.loadInfo();
  }

  loadInfo(): void {
    // 按评估类别是总校还是分校查询，显示填报表、采集表、资料表清单---------------------------------
    if (this.data.verIndex.substring(4, 6) === 'zx') {
      this.http.get('http://139.224.62.102:8080/api/data/tables?dtType=zxcj').subscribe((res: any[]) => {
        this.listOfSjcj = res;
      });
    } else {
      this.http.get('http://139.224.62.102:8080/api/data/tables?dtType=fxcj').subscribe((res: any[]) => {
        this.listOfSjcj = res;
      });
    }
    this.cdr.detectChanges();
  }

  showSynchData(tableNo: string): void {
    const record: any = [];
    record.fromDataDate = this.data.fromDataDate;
    record.endDataDate = this.data.endDataDate;
    record.tableNo = tableNo;

    window.open('/#/auditstep/datasynchshow?table=' + tableNo);
    // this.modal
    //   .create(AuditstepAdProcessViewDataSynchShowComponent, { record }, { size: 'xl' })
    //   .subscribe((res: any) => {});
  }

  nzEvent(event: NzFormatEmitEvent): void {}
}
