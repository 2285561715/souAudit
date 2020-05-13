import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { format } from 'date-fns';

@Component({
  selector: 'app-dashboard-manual-videoplay',
  templateUrl: './videoplay.component.html',
  styleUrls: ['./videoplay.component.less'],
})
export class DashboardManualVideoPlayComponent implements OnInit {
  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private msg: NzMessageService,
  ) {}

  record: any;
  videoPlayUrl = '';

  ngOnInit(): void {
    this.videoPlayUrl = 'http://139.224.62.102/assets/video/' + this.record.fileUrl + '.mp4';
  }

  close() {
    this.modal.destroy();
  }
}
