import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { _HttpClient, SettingsService } from '@delon/theme';

@Component({
  selector: 'app-dashboard-dataup-fxtbb142-index',
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDataUpFxtbB142IndexComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    public loadUser: SettingsService,
  ) {}

  editCache: { [key: string]: any } = {};
  listOfData: any[] = [];
  value: any = {};
  parmOfSql: any = {};

  @Input() dataStr: any;

  ngOnInit(): void {
    this.loadInfo();
  }

  loadInfo(): void {
    // 获得数据表的数据
    this.listOfData = [];
    this.parmOfSql = {
      tableName: this.dataStr.dtNo,
      fieldList: ['id', 'nd', 'xxdm', 'xxmc', 'xms', 'fgs', 'rss', 'islock'],
      predication: " xxdm='" + this.loadUser.user.bid + "' ",
      orderDirections: 'nd DESC,id DESC',
    };
    this.http.post('/api/dynamic/search', this.parmOfSql).subscribe((res: any[]) => {
      // this.listOfData = res;
      res.forEach(item => {
        item.id = item.id + '';
        this.listOfData = [...this.listOfData, item];
        this.editCache[item.id] = {
          edit: false,
          data: { ...item },
        };
      });
      console.log('helsdafkld');

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
  // 保存数据
  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    const data = this.editCache[id].data;

    // 登录用户部门id
    this.http
      .put(
        `/api/data/tables/entry?id=` +
          id +
          `&tableno=` +
          this.dataStr.dtNo +
          `&appId=` +
          this.dataStr.id +
          `&stepId=` +
          this.dataStr.stepId +
          `&deptId=` +
          this.loadUser.user.bid,
        data,
      )
      .subscribe(res => {
        this.msgSrv.success('保存成功');
      });

    this.editCache[id].edit = false;
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
