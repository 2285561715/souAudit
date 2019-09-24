import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';

@Component({
  selector: 'app-dashboard-fileup-zxwzcl',
  templateUrl: './zxwzcl.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardFileUpZxWzclComponent implements OnInit {
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
  listOfFileDesc: any = {};
  fileRemark = '';

  fileList = [
    // {
    //   uid: 1,
    //   name: 'xxx.png',
    //   status: 'done',
    //   response: 'Server Error 500', // custom error message to show
    //   url: 'http://www.baidu.com/xxx.png',
    // },
  ];

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
    // 获得文字材料的要求等
    this.http.post('/api/wzfile/filename', { fileName: this.value.dtNo }).subscribe((res: any) => {
      console.log(res);
      this.fileRemark = res.remark;
      // this.close(res);
    });

    // this.http.post('/api/wzfile/filename', this.value.dtNo).subscribe((res: any[]) => {
    //   this.listOfFileDesc = res;
    //   this.cdr.detectChanges();
    //   this.fileRemark = this.listOfFileDesc.remark;
    // });

    for (let i = 0; i < 30; i++) {
      this.listOfData.push({
        id: `${i}`,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
      });
    }
    this.updateEditCache();
  }

  fupChange(event): void {
    console.log(event);
  }
  // close(res: any) {
  //   this.modal.close(res);
  // }
}
