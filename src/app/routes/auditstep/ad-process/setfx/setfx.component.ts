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
import { concat } from 'rxjs/operators';

@Component({
  selector: 'app-auditstep-ad-process-setfx',
  templateUrl: './setfx.component.html',
  styleUrls: ['./setfx.component.less'],
})
export class AuditstepAdProcessSetFxComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    private modalService: NzModalService,
    private drawerRef: NzDrawerRef<string>,
  ) {}

  value: any = [];
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
    console.log(this.value);
    this.http.get('/api/fxlist/es?appId=' + this.value.id).subscribe((res: any) => {
      // this.listOfselectChk = res[0].branchIdList;
      this.listOfData = res;
      this.listOfDisplayData = this.listOfData;
      console.log(res);
      // 查询用户列表
      // this.http.get('/api/branches').subscribe((ress: any[]) => {
      //   ress.forEach(item => {
      //     this.listOfselectChk.includes(item.id + '') ? (item.isChecked = true) : (item.isChecked = false);
      //     this.listOfData.push(item);
      //   });
      //   this.listOfDisplayData = this.listOfData;
      // });
      this.cdr.detectChanges();
    });
  }

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

  // 是否选择分校
  ngchkChange(event: NzFormatEmitEvent, i: number): void {
    this.listOfData[i].isChecked = event ? true : false;
  }
  // 学历教育模块
  ngxlChange(event: NzFormatEmitEvent, i: number): void {
    this.listOfData[i].isXl = event ? true : false;
  }
  // 学历教育模块
  ngfxlChange(event: NzFormatEmitEvent, i: number): void {
    this.listOfData[i].isFxl = event ? true : false;
  }
  // 社区教育模块
  ngsqChange(event: NzFormatEmitEvent, i: number): void {
    this.listOfData[i].isSq = event ? true : false;
  }

  submitForm(): void {
    console.log(this.listOfData);
    this.http.put('/api/fxlist/es?appId=' + this.value.id, this.listOfData).subscribe((res: any) => {
      this.msgSrv.success('修改信息成功');
      this.cdr.detectChanges();
      this.close(res);
    });
  }

  close(res: any): void {
    this.drawerRef.close(res);
  }
}
