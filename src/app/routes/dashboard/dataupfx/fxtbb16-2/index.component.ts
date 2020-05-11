import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';

@Component({
  selector: 'app-dashboard-dataup-fxtbb162-index',
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDataUpFxtbB162IndexComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    public loadUser: SettingsService,
    private modalService: NzModalService,
  ) {}

  editCache: { [key: string]: any } = {};
  listOfData: any[] = [];
  inData: any[] = [];
  upUrl = '';
  parmOfSql: any = {};

  @Input() dataStr: any;

  ngOnInit(): void {
    console.log(this.dataStr.dtNo);
    this.upUrl =
      '/api/excel/import?tableName=' +
      this.dataStr.dtNo +
      '&startLine=1' +
      '&appId=' +
      this.dataStr.id +
      '&stepId=' +
      this.dataStr.stepId +
      '&deptId=' +
      this.loadUser.user.bid;
    this.loadInfo();
  }

  loadInfo(): void {
    // 获得数据表的数据
    this.listOfData = [];
    this.parmOfSql = {
      tableName: this.dataStr.dtNo,
      fieldList: ['id', 'nd', 'xxdm', 'xxmc', 'hdmc', 'cjrs', 'islock'],
      predication: " xxdm='" + this.loadUser.user.bid + "' ",
      orderDirections: ' nd DESC,id DESC',
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

  // 新增1条数据
  addData(): void {
    const date = new Date();
    this.http
      .put(
        `/api/data/tables/entry/init?tableno=` +
          this.dataStr.dtNo +
          `&nd=` +
          date.getFullYear() +
          `&appId=` +
          this.dataStr.id +
          `&stepId=` +
          this.dataStr.stepId +
          `&deptId=` +
          this.loadUser.user.bid +
          `&deptName=` +
          this.loadUser.user.bname,
      )
      .subscribe(res => {
        this.msgSrv.success('新增数据成功');
        this.loadInfo();
      });
  }

  dataDelete(id: string): void {
    this.http.delete('/api/data/tables/entry/del?tableno=' + this.dataStr.dtNo + '&id=' + id).subscribe((res: any) => {
      this.msgSrv.success('删除数据成功');
      this.loadInfo();
    });
  }

  // -----------------
  deleteConfirm(): void {
    this.modalService.confirm({
      nzTitle: '<i>是否要删除数据</i>',
      nzContent: '<b>删除数据后无法恢复，确认要删除？</b>',
      nzOnOk: () => this.deleteInfo(),
    });
  }

  deleteInfo() {
    const subData = {
      tableName: this.dataStr.dtNo,
      predication: 'islock=0 and xxdm=' + this.loadUser.user.bid,
    };
    this.http.request('delete', '/api/dynamic/delete', { body: subData }).subscribe((res: any) => {
      this.msgSrv.success('清空数据成功');
      this.loadInfo();
    });
  }
  // -------------------------------------------------------

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
      this.msgSrv.success('本次导入数据：' + event.fileList[0].response + ' 条！');
      this.loadInfo();
    }
  }
  // -----------------
}
