import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';

@Component({
  selector: 'app-dashboard-dataup-zxtb011-index',
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDataUpZxtb011IndexComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    private drawerService: NzDrawerService,
    private drawerRef: NzDrawerRef<string>,
  ) {}

  editCache: { [key: string]: any } = {};
  // listOfData: any[] = [];
  listOfData: any[] = [];
  value: any = {};

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

  ngOnInit(): void {
    // 获得数据表的 填写规则、校验规则、样例数据等 data/tables/search
    this.http.get('/api/data/tables/search/sjzxtb_xxjbqk_ldxx').subscribe((res: any[]) => {
      res.forEach(item => {
        item.id = item.id + '';
        // this.listOfData.push(item);
        // console.log(item);
        this.listOfData = [...this.listOfData, item];
      });
      console.log(this.listOfData);
      this.cdr.detectChanges();
    });
    // this.updateEditCache();

    // for (let i = 0; i < 100; i++) {
    //   this.listOfData.push({
    //     id: `${i}`,
    //     name: `Edrward ${i}`,
    //     age: 32,
    //     address: `London Park no. ${i}`,
    //   });
    // }

    this.updateEditCache();
  }
}
