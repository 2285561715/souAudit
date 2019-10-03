import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';

@Component({
  selector: 'app-dashboard-dataup-fxtbk01-index',
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDataUpFxtbK01IndexComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    public loadUser: SettingsService,
  ) {}
  // 登录用户部门id
  editCache: { [key: string]: any } = {};
  listOfData: any[] = [];
  value: any = {};
  upUrl = '';

  ngOnInit(): void {
    // this.upUrl = '/api/excel/import?tableName=sjfxtb_xxjbqk_ldxx&appId=18&stepId=29&deptId=' + this.loadUser.user.bid;
    this.loadInfo();
  }

  loadInfo(): void {
    // 获得数据表的数据
    this.listOfData = [];
    this.http.get('/api/data/tables/search/sjfxtb_xxjbqk_ldxx').subscribe((res: any[]) => {
      res.forEach(item => {
        if (item.xxdm === this.loadUser.user.bid) {
          item.id = item.id + '';
          this.listOfData = [...this.listOfData, item];
          this.editCache[item.id] = {
            edit: false,
            data: { ...item },
          };
        }
      });
      this.cdr.detectChanges();
    });
  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false,
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    const data = this.editCache[id].data;
    // console.log(data);
    this.http
      .put(
        `/api/data/tables/entry?id=` +
          id +
          `&tableno=sjfxtb_xxjbqk_ldxx&appId=18&stepId=29&deptId=` +
          this.loadUser.user.bid,
        data,
      )
      .subscribe(res => {
        this.msgSrv.success('保存成功');
      });
    this.editCache[id].edit = false;
  }

  // 新增1条数据
  addData(): void {
    const date = new Date();
    this.http
      .put(
        `/api/data/tables/entry/init?tableno=sjfxtb_xxjbqk_ldxx&nd=` +
          date.getFullYear() +
          '&appId=18&stepId=29&deptId=' +
          this.loadUser.user.bid,
      )
      .subscribe(res => {
        this.msgSrv.success('新增成功');
        this.loadInfo();
      });
  }

  dataDelete(id: string): void {
    this.http.delete('/api/data/tables/entry/del?tableno=sjfxtb_xxjbqk_ldxx&id=' + id).subscribe((res: any) => {
      this.msgSrv.success('删除数据成功');
      this.loadInfo();
    });
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }
  // 数据导入后回调函数
  fupChange(event): void {
    if (event.type === 'success') {
      this.msgSrv.success('本次导入数据：' + event.file.response.dataCount + ' 条！');
      this.loadInfo();
    }
  }
  // -----------------
}
