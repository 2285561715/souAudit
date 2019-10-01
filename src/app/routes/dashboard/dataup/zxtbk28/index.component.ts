import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';

@Component({
  selector: 'app-dashboard-dataup-zxtbk28-index',
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDataUpZxtbK28IndexComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    public loadUser: SettingsService,
  ) {}

  editCache: { [key: string]: any } = {};
  listOfData: any[] = [];
  value: any = {};

  ngOnInit(): void {
    // 获得数据表的数据
    this.http.get('/api/data/tables/search/sjzxtb_k28_ssgjjl').subscribe((res: any[]) => {
      res.forEach(item => {
        item.id = item.id + '';
        this.listOfData = [...this.listOfData, item];
        this.editCache[item.id] = {
          edit: false,
          data: { ...item },
        };
      });
      console.log(this.listOfData);
      this.cdr.detectChanges();
    });
    // this.updateEditCache();
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
  // 保存数据
  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    const data = this.editCache[id].data;
    console.log(data);
    // 登录用户部门id
    this.http
      .put(
        `/api/data/tables/entry?id=` +
          id +
          `&tableno=sjzxtb_k28_ssgjjl&appId=17&stepId=21&deptId=` +
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
        `/api/data/tables/entry/init?tableno=sjzxtb_k28_ssgjjl&nd=` +
          date.getFullYear() +
          '&appId=17&stepId=21&deptId=' +
          this.loadUser.user.bid,
      )
      .subscribe(res => {
        this.msgSrv.success('新增成功');
      });
    this.listOfData = [];
  }

  dataDelete(id: string): void {
    this.http.delete('/api/data/tables/entry/del?tableno=sjzxtb_k28_ssgjjl&id=' + id).subscribe((res: any) => {
      this.msgSrv.success('删除数据成功');
      this.cdr.detectChanges();
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
}