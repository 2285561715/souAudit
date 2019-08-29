import {
  NzFormatEmitEvent,
  NzTreeComponent,
  NzTreeNodeOptions,
  NzMessageService,
  NzModalService,
  NzDrawerRef,
  NzDrawerService,
} from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';

@Component({
  selector: 'app-auditstep-ad-process-zjzpsfx',
  templateUrl: './zjzpsfx.component.html',
  styleUrls: ['./zjzpsfx.component.less'],
})
export class AuditstepAdProcessZjpsZjzPsfxComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    private modalService: NzModalService,
    private drawerRef: NzDrawerRef<string>,
  ) {}

  value: string;
  listOfData: any[] = [];

  sortName: string | null = null;
  sortValue: string | null = null;
  listOfType = [
    { text: '市区', value: '市区' },
    { text: '郊区', value: '郊区' },
    { text: '行业', value: '行业' },
    { text: '政企', value: '政企' },
    { text: '校企', value: '校企' },
  ];
  listOfSearchType: string[] = [];
  listOfDisplayData: any[] = [];

  listOfselectChk: any[] = [];

  ngOnInit() {
    this.http.get('/api/stepwbs/zjz?id=' + this.value).subscribe((res: any) => {
      this.listOfselectChk = res[0].branchIdList;
      // 查询用户列表
      this.http.get('/api/branches').subscribe((ress: any[]) => {
        ress.forEach(item => {
          this.listOfselectChk.includes(item.id + '') ? (item.isChecked = true) : (item.isChecked = false);
          this.listOfData.push(item);
        });
        this.listOfDisplayData = this.listOfData;
      });
      this.cdr.detectChanges();
    });
  }

  // sort(sort: { key: string; value: string }): void {
  //   this.sortName = sort.key;
  //   this.sortValue = sort.value;
  //   this.search();
  // }

  filter(listOfSearchType: string[]): void {
    this.listOfSearchType = listOfSearchType;
    this.search();
  }

  search(): void {
    // ** filter data **/
    const filterFunc = (item: { btype: string; bno: string }) =>
      this.listOfSearchType.length ? this.listOfSearchType.some(btype => item.btype.indexOf(btype) !== -1) : true;
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

  ngModelChange(event: NzFormatEmitEvent, id: number): void {
    if (event) {
      if (!this.listOfselectChk.includes(id + '')) {
        this.listOfselectChk.push(id + '');
      }
    } else {
      this.listOfselectChk = this.listOfselectChk.filter(item => item !== id + '');
    }
  }

  submitForm(): void {
    const zjbdata: any = {};
    zjbdata.id = this.value;
    zjbdata.branchIdList = this.listOfselectChk;

    this.http.put('/api/stepwbs/zjz', zjbdata).subscribe((res: any) => {
      this.msgSrv.success('修改信息成功');
      this.cdr.detectChanges();
      this.close(res);
    });
  }

  close(res: any): void {
    this.drawerRef.close(res);
  }
}
