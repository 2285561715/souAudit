import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService, NzModalService, NzDrawerService } from 'ng-zorro-antd';
import { stringify } from 'querystring';

@Component({
  selector: 'app-auditstep-ad-process-tbjcfx-index',
  templateUrl: './index.component.html',
})
export class AuditstepAdProcessTbjcFxIndexComponent implements OnInit {
  constructor(
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private modalService: NzModalService,
    private drawerService: NzDrawerService,
  ) {}

  listOfData: any[] = [];
  listOfDisplayData: any[] = [];
  listOfSearchType: string[] = [];

  value: any = [];
  conStr = 'sjtb';
  sortName: string | null = null;
  sortValue: string | null = null;
  // listOfType = [];
  listOfType = [
    { text: '虹口分校', value: '虹口分校' },
    { text: '杨浦分校', value: '杨浦分校' },
    { text: '行业', value: '行业' },
    { text: '政企', value: '政企' },
    { text: '校企', value: '校企' },
  ];

  ngOnInit() {
    // console.log(this.value);
    this.loadInfo();
  }

  loadInfo(): void {
    this.listOfData = [];
    this.http
      .get('/api/tbrwjdcx?appId=' + this.value.appId + '&pglx=fx&conType=' + this.conStr)
      .subscribe((res: any[]) => {
        this.listOfData = res;
        this.listOfDisplayData = this.listOfData;
        this.http.get('/api/branches').subscribe((ress: any[]) => {
          ress.forEach(item => {
            const itemdata = { text: item.bname, value: item.bno };
            this.listOfType.push(itemdata);
          });
        });
        this.cdr.detectChanges();
      });
  }

  filter(listOfSearchType: string[]): void {
    this.listOfSearchType = listOfSearchType;
    this.search();
  }

  search(): void {
    // ** filter data **/
    const filterFunc = (item: { deptId: string }) =>
      this.listOfSearchType.length ? this.listOfSearchType.some(deptId => item.deptId.indexOf(deptId) !== -1) : true;
    const data = this.listOfData.filter(item => filterFunc(item));
    // ** sort data **/
    if (this.sortName && this.sortValue) {
      this.listOfDisplayData = data.sort((a, b) =>
        this.sortValue === 'ascend'
          ? a[this.sortName!] > b[this.sortName!]
            ? 1
            : -1
          : b[this.sortName!] > a[this.sortName!]
          ? 1
          : -1,
      );
    } else {
      this.listOfDisplayData = data;
    }
  }

  showData(funconstr: string): void {
    this.conStr = funconstr;
    this.loadInfo();
  }
}
