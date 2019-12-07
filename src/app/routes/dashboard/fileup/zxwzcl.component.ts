import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';

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
  upedFileUrl = ''; // 已上传文件地址
  upedFileName = ''; // 已上传文件地址
  updedFile: any = [];

  ngOnInit(): void {
    // console.log(this.value);
    // /api/uploadFile
    this.upedFileUrl = this.value.fileupUrl;
    this.upedFileName = this.value.dtName + '.' + this.value.exName;

    this.upFileUrl =
      '/api/uploadFile?tableno=' +
      this.value.dtNo +
      `&appId=` +
      this.value.id +
      `&stepId=` +
      this.value.stepId +
      `&deptId=` +
      this.loadUser.user.bid;
    // 获得文字材料的要求等
    this.http.post('/api/wzfile/filename', { fileName: this.value.dtNo }).subscribe((res: any) => {
      this.fileRemark = res.remark;
    });
  }

  fupChange(event): void {
    event.fileList.forEach(item => {
      const fileUrl = item.response.fileDownloadUri;
      const fileName = item.response.fileName;
      // 下面一行打印出来应该就是文件地址
      // console.log(item);
      // console.log(fileUrl);
      this.upedFileUrl = fileUrl;
      this.upedFileName = fileName;
      this.msgSrv.success('文件上传成功，可在已上传文件链接查看');
    });
  }
}
