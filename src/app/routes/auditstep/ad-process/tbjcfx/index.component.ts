import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService, NzModalService, NzDrawerService } from 'ng-zorro-antd';
import { stringify } from 'querystring';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { resolve } from 'q';

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

  value: any = [];
  conStr = 'sjtb';
  sortName: string | null = null;
  sortValue: string | null = null;
  // listOfType = [];
  listOfType = [
    { text: '虹口分校', value: '虹口分校' },
    { text: '闵行二分校', value: '闵行二分校' },
    { text: '宝山分校', value: '宝山分校' },
    { text: '浦东东校', value: '浦东东校' },
    { text: '闵行一分校', value: '闵行一分校' },
    { text: '金山分校', value: '金山分校' },
    { text: '松江分校', value: '松江分校' },
    { text: '浦东南校', value: '浦东南校' },
    { text: '奉贤分校', value: '奉贤分校' },
    { text: '青浦分校', value: '青浦分校' },
    { text: '崇明分校', value: '崇明分校' },
    { text: '嘉定分校', value: '嘉定分校' },
    { text: '百联集团分校', value: '百联集团分校' },
    { text: '新世界集团分校', value: '新世界集团分校' },
    { text: '航空运输学院', value: '航空运输学院' },
    { text: '企业家联合会', value: '企业家联合会' },
    { text: '杨浦分校 ', value: '杨浦分校 ' },
    { text: '黄浦分校', value: '黄浦分校' },
    { text: '普陀分校', value: '普陀分校' },
    { text: '西南进修学院分校', value: '西南进修学院分校' },
    { text: '浦东西校', value: '浦东西校' },
    { text: '商业分校', value: '商业分校' },
    { text: '时尚学院', value: '时尚学院' },
    { text: '工程大分校', value: '工程大分校' },
    { text: '贸易学校教学点', value: '贸易学校教学点' },
    { text: '邮电分校', value: '邮电分校' },
    { text: '新知教学点', value: '新知教学点' },
    { text: '旅游局教学点', value: '旅游局教学点' },
    { text: '泽达进修学院', value: '泽达进修学院' },
    { text: '交大昂立分校', value: '交大昂立分校' },
    { text: '外经贸分校', value: '外经贸分校' },
    { text: '慧承文化进修学院', value: '慧承文化进修学院' },
    { text: '徐汇财贸分校', value: '徐汇财贸分校' },
    { text: '建设分校', value: '建设分校' },
    { text: '静安分校', value: '静安分校' },
    { text: '徐汇分校', value: '徐汇分校' },
    { text: '石化工业学校培训中心教学点', value: '石化工业学校培训中心教学点' },
  ];
  searchType: string;
  selectedValue = null;

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
            const itemdata = { text: item.bname, value: item.bname };
            this.listOfType.push(itemdata);
          });
        });
        this.cdr.detectChanges();
      });

    // ======================================================
    // zip(
    //   this.http.get('/api/tbrwjdcx?appId=' + this.value.appId + '&pglx=fx&conType=' + this.conStr),
    //   this.http.get('/api/branches'),
    // )
    //   .pipe(
    //     catchError(([rwlst, branchlst]) => {
    //       resolve(null);
    //       return [rwlst, branchlst];
    //     }),
    //   )
    //   .subscribe(
    //     ([rwlst, branchlst]) => {
    //       this.listOfData = rwlst;
    //       this.listOfType = branchlst;
    //     },
    //     () => {},
    //     () => {
    //       this.listOfDisplayData = this.listOfData;
    //       this.listOfType.forEach(item => {
    //         const itemdata = { text: item.bname, value: item.bno };
    //         this.listOfType.push(itemdata);
    //       });
    //       this.cdr.detectChanges();
    //     },
    //   );
    // ======================================================
  }

  filter(searchType: string): void {
    this.searchType = searchType;
    this.search();
  }

  search(): void {
    // ** filter data **/
    const filterFunc = (item: { deptName: string }) =>
      this.searchType ? item.deptName.indexOf(this.searchType) !== -1 : true;
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
