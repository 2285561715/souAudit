import { NzDrawerRef, NzDrawerService, NzModalRef } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UploadFile, UploadFilter } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-dashboard-fileup-fxwzcl',
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
    private msg: NzMessageService,
  ) {}

  editCache: { [key: string]: any } = {};
  listOfData: any[] = [];
  value: any = [];
  fileList: any = [];

  listOfFileDesc: any = {};
  fileRemark = '';
  upFileUrl = '';

  // fileList: any[] = [];
  // filters: UploadFilter[] = [
  //   {
  //     name: 'type',
  //     fn: (fileList: UploadFile[]) => {
  //       const filterFiles = fileList.filter(w => ~['application/msword'].indexOf(w.type));
  //       if (filterFiles.length !== fileList.length) {
  //         this.msg.error(`包含文件格式不正确，只支持MS Office Word格式`);
  //         return filterFiles;
  //       }
  //       return fileList;
  //     },
  //   },
  //   {
  //     name: 'async',
  //     fn: (fileList: UploadFile[]) => {
  //       return new Observable((observer: Observer<UploadFile[]>) => {
  //         // doing
  //         observer.next(fileList);
  //         observer.complete();
  //       });
  //     },
  //   },
  // ];

  upedFileUrl = ''; // 已上传文件地址
  upedFileName = ''; // 已上传文件地址
  updedFile: any = [];

  ngOnInit(): void {
    // console.log(this.value);
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
