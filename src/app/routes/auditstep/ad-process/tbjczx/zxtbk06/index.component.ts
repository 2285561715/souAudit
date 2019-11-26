import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';

@Component({
  selector: 'app-tbjczx-zxtbk06-index',
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepTbjcZxtbK06IndexComponent implements OnInit {
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
  record: any = {};
  @Input() dataStr: any;

  dataSet = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  salesPieData = [
    {
      x: '市区',
      y: 4544,
    },
    {
      x: '郊区',
      y: 3321,
    },
    {
      x: '行业',
      y: 3113,
    },
    {
      x: '非学历培训',
      y: 2341,
    },
    {
      x: '社区教育',
      y: 1231,
    },
    {
      x: '其他',
      y: 1231,
    },
  ];
  total: string;

  ngOnInit(): void {
    console.log('hellooo');
    console.log(this.record);
    // 获得数据表的数据
    this.http.get('/api/data/tables/search/zxtb/sjzxtb_k06_bxxt').subscribe((res: any[]) => {
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
          `&tableno=sjzxtb_k06_bxxt&appId=` +
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
