import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';

@Component({
  selector: 'app-dashboard-dataup-zxtbk152-index',
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDataUpZxtbK152IndexComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    private modalService: NzModalService,
    public loadUser: SettingsService,
  ) {}

  editCache: { [key: string]: any } = {};
  listOfData: any[] = [];
  value: any = {};
  upUrl = '';

  @Input() dataStr: any;

  ngOnInit(): void {
    this.upUrl =
      '/api/excel/import?tableName=sjzxtb_k15_web&appId=' +
      this.dataStr.id +
      '&stepId=' +
      this.dataStr.stepId +
      '&deptId=' +
      this.loadUser.user.bid;
    this.loadInfo();
  }
  loadInfo(): void {
    this.listOfData = [];
    // 获得数据表的数据
    this.http.get('/api/data/tables/search/zxtb/sjzxtb_k15_web').subscribe((res: any[]) => {
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

    // 登录用户部门id
    this.http
      .put(
        `/api/data/tables/entry?id=` +
          id +
          `&tableno=sjzxtb_k15_web&appId=` +
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
        `/api/data/tables/entry/init?tableno=sjzxtb_k15_web&nd=` +
          date.getFullYear() +
          `&appId=` +
          this.dataStr.id +
          `&stepId=` +
          this.dataStr.stepId +
          `&deptId=` +
          this.loadUser.user.bid,
      )
      .subscribe(res => {
        this.msgSrv.success('新增数据成功');
        this.loadInfo();
      });
  }

  dataDelete(id: string): void {
    this.http.delete('/api/data/tables/entry/del?tableno=sjzxtb_k15_web&id=' + id).subscribe((res: any) => {
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
  deleteConfirm(): void {
    this.modalService.confirm({
      nzTitle: '<i>是否要删除数据</i>',
      nzContent: '<b>删除数据后无法恢复，确认要删除？</b>',
      nzOnOk: () => this.deleteInfo(),
    });
  }

  deleteInfo() {
    this.http
      .delete(
        '/api/data/tables/entry/del/nd?tableNo=sjzxtb_k15_web&tableLx=zx&deptId=' + this.loadUser.user.bid + '&nd=2016',
      )
      .subscribe((res: any) => {});

    this.http
      .delete(
        '/api/data/tables/entry/del/nd?tableNo=sjzxtb_k15_web&tableLx=zx&deptId=' + this.loadUser.user.bid + '&nd=2017',
      )
      .subscribe((res: any) => {});

    this.http
      .delete(
        '/api/data/tables/entry/del/nd?tableNo=sjzxtb_k15_web&tableLx=zx&deptId=' + this.loadUser.user.bid + '&nd=2018',
      )
      .subscribe((res: any) => {
        this.msgSrv.success('清空数据成功');
        this.loadInfo();
      });
  }
}
