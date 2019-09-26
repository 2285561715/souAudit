import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';

@Component({
  selector: 'app-dashboard-dataup-zxtbk01-index',
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDataUpZxtbK01IndexComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
  ) {}

  editCache: { [key: string]: any } = {};
  listOfData: any[] = [];
  value: any = {};

  ngOnInit(): void {
    // 获得数据表的数据
    this.http.get('/api/data/tables/search/sjzxtb_k01_ldxx').subscribe((res: any[]) => {
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

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    const data = this.editCache[id].data;
    // data.id = Number(id);
    // data.tableno = 'sjzxtb_xxjbqk_ldxx';
    data.leaveDate = '2019-10-10';
    console.log(data);
    this.http.put(`/api/data/tables/entry?id=` + id + `&tableno=sjzxtb_k01_ldxx`, data).subscribe(res => {
      this.msgSrv.success('保存成功');
    });

    this.editCache[id].edit = false;
  }

  // close() {
  //   this.modal.destroy();
  // }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }
}
