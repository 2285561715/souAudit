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
import { parse } from 'querystring';

@Component({
  selector: 'app-auditstep-ad-process-zjzuser',
  templateUrl: './zjzuser.component.html',
  styleUrls: ['./zjzuser.component.less'],
})
export class AuditstepAdProcessZjpsZjzUserComponent implements OnInit {
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
  listOfType = [{ text: '校内专家', value: '校内专家' }, { text: '校外专家', value: '校外专家' }];
  listOfSearchType: string[] = [];
  listOfDisplayData: any[] = [];

  listOfselectChk: any[] = [];
  selectChargeId: number;

  ngOnInit() {
    this.http.get('/api/stepwbs/zjz?id=' + this.value).subscribe((res: any) => {
      this.listOfselectChk = res[0].zjuserIdList;
      this.selectChargeId = res[0].chargeUserId;
      // 查询用户列表
      this.http.get('/api/users').subscribe((ress: any[]) => {
        ress.forEach(item => {
          if ((item.unitName === '校内专家' || item.unitName === '校外专家') && item.status === true) {
            this.listOfselectChk.includes(item.id + '') ? (item.isChecked = true) : (item.isChecked = false);
            this.listOfData.push(item);
          }
        });
        this.listOfDisplayData = this.listOfData;
      });
      this.cdr.detectChanges();
    });
  }

  filter(listOfSearchType: string[]): void {
    this.listOfSearchType = listOfSearchType;
    this.search();
  }

  search(): void {
    // ** filter data **/ unitname
    const filterFunc = (item: { unitName: string }) =>
      this.listOfSearchType.length
        ? this.listOfSearchType.some(unitName => item.unitName.indexOf(unitName) !== -1)
        : true;
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

  ngChgChange(event: NzFormatEmitEvent, id: number): void {
    this.selectChargeId = id;
  }

  submitForm(): void {
    const zjuserdata: any = {};
    zjuserdata.id = this.value;
    zjuserdata.zjuserIdList = this.listOfselectChk;
    zjuserdata.chargeUserId = this.selectChargeId;

    this.http.put('/api/stepwbs/zjz', zjuserdata).subscribe((res: any) => {
      this.msgSrv.success('修改信息成功');
      this.cdr.detectChanges();
      this.close(res);
    });
  }

  close(res: any): void {
    this.drawerRef.close(res);
  }
}
