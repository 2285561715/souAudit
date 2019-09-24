import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';

@Component({
  selector: 'app-dashboard-dataup-zxtb012-index',
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDataUpZxtb012IndexComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    private drawerService: NzDrawerService,
    private drawerRef: NzDrawerRef<string>,
  ) {}

  editCache: { [key: string]: any } = {};
  listOfData: any[] = [];
  value: any = {};
  listOfTableDesc: any = {};
  descRules = '';
  checkRules = '';
  tableHtml = '';

  listOfFields: any = [];
  listOfFieldsZH: any = [];

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
    console.log(this.value);
    // 获得数据表的 填写规则、校验规则、样例数据等
    this.http.get('/api/data/tables/' + this.value.dtNo).subscribe((res: any[]) => {
      this.listOfTableDesc = res;
      console.log(this.listOfTableDesc);
      this.cdr.detectChanges();
      this.descRules = this.listOfTableDesc.descRules;
      this.checkRules = this.listOfTableDesc.checkRules;
      this.tableHtml = this.listOfTableDesc.tableHtml;
      this.listOfFields = this.listOfTableDesc.zdNameList.split(',');
      console.log(this.listOfFields);
      this.listOfFieldsZH = this.listOfTableDesc.zdZhNameList.split(',');
      console.log(this.listOfFieldsZH);
    });

    for (let i = 0; i < 9; i++) {
      this.listOfData.push({
        id: `${i}`,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
      });
    }
    this.updateEditCache();
  }
}
