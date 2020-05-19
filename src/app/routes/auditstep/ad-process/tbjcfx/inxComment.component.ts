import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { format } from 'date-fns';

@Component({
  selector: 'app-stepprocess-tbjcfx-file-inxcomment',
  templateUrl: './inxComment.component.html',
  styleUrls: ['./inxComment.component.less'],
})
export class StepProcessTbjcFxFileInxCommentComponent implements OnInit {
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
    // console.log(this.record);
  }

  close() {
    this.modal.destroy();
  }
}
