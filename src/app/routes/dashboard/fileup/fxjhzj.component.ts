import { NzDrawerRef, NzDrawerService, NzModalRef } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UploadFile, UploadFilter } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-dashboard-fileup-fxjhzj',
  templateUrl: './fxjhzj.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardFileUpFxJhzjComponent implements OnInit {
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

  value: any = [];
  fileList: any = [];

  upNcjhFileUrl = '';
  upNzzjFileUrl = '';

  upedNcjhFileUrl = ''; // 已上传文件地址
  upedNcjhFileName = ''; // 已上传文件名称

  upedNzzjFileUrl = ''; // 已上传文件地址
  upedNzzjFileName = ''; // 已上传文件名称

  ngOnInit(): void {
    console.log(this.value);
    this.upedNcjhFileUrl = this.value.ncjhFile;
    this.upedNcjhFileName = this.value.nd + '年初计划.' + this.value.exNcName;

    this.upedNzzjFileUrl = this.value.nzzjFile;
    this.upedNzzjFileName = this.value.nd + '年初计划.' + this.value.exNzName;

    this.upNcjhFileUrl = '/api/uploadFile/fxjhzjup?id=' + this.value.jhzjid + '&zdType=ncjh';
    this.upNzzjFileUrl = '/api/uploadFile/fxjhzjup?id=' + this.value.jhzjid + '&zdType=nzzj';
  }

  fupNcChange(event): void {
    event.fileList.forEach(item => {
      const fileUrl = item.response.fileDownloadUri;
      const fileName = item.response.fileName;
      // 下面一行打印出来应该就是文件地址
      console.log(item);
      console.log(fileUrl);
      this.upedNcjhFileUrl = fileUrl;
      this.upedNcjhFileName = fileName;

      this.msgSrv.success('文件上传成功，可在已上传文件链接查看');
    });
  }

  fupNzChange(event): void {
    event.fileList.forEach(item => {
      const fileUrl = item.response.fileDownloadUri;
      const fileName = item.response.fileName;
      // 下面一行打印出来应该就是文件地址
      console.log(item);
      console.log(fileUrl);
      this.upedNzzjFileUrl = fileUrl;
      this.upedNzzjFileName = fileName;

      this.msgSrv.success('文件上传成功，可在已上传文件链接查看');
    });
  }
}
