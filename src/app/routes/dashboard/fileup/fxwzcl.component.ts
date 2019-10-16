import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';

@Component({
  selector: 'app-dashboard-fileup-zxwzcl',
  templateUrl: './fxwzcl.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardFileUpFxWzclComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    private drawerService: NzDrawerService,
    private drawerRef: NzDrawerRef<string>,
    public loadUser: SettingsService,
  ) {}

  editCache: { [key: string]: any } = {};
  listOfData: any[] = [];
  value: any = {};
  listOfFileDesc: any = {};
  fileRemark = '';
  upFileUrl = '';

  // fileList = [];
  fileList: any[] = [];

  ngOnInit(): void {
    console.log('fdsgsdfg=');
    // /api/uploadFile
    // this.upFileUrl =
    //   '/api/uploadFile?tableno=' + this.value.dtNo + '&appId=18&stepId=29&deptId=' + this.loadUser.user.bid;
    this.upFileUrl =
      '/api/uploadFile?tableno=' +
      this.value.dtNo +
      `&appId=` +
      this.value.id +
      `&stepId=` +
      this.value.stepId +
      `&deptId=` +
      this.loadUser.user.bid;

    console.log(this.upFileUrl);
    // 获得文字材料的要求等
    this.http.post('/api/wzfile/filename', { fileName: this.value.dtNo }).subscribe((res: any) => {
      this.fileRemark = res.remark;
    });
  }

  fupChange(event): void {
    event.fileList.forEach(item => {
      const fileUrl = item.response.fileDownloadUri;
      // 下面一行打印出来应该就是文件地址
      this.msgSrv.success('文件上传成功');
      console.log({ fileUrl });
    });
  }
}
