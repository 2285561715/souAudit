import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-sysdata-fx-synchdatatable-view',
  templateUrl: './view.component.html',
})
export class SysdataFxSynchdatatableViewComponent implements OnInit {
  record: any = {};

  checkRules: SafeHtml;
  descRules: SafeHtml;
  tableHtml: SafeHtml;

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.checkRules = this.sanitizer.bypassSecurityTrustHtml(this.record.checkRules);
    this.descRules = this.sanitizer.bypassSecurityTrustHtml(this.record.descRules);
    this.tableHtml = this.sanitizer.bypassSecurityTrustHtml(this.record.tableHtml);
  }

  close() {
    this.modal.destroy();
  }
}
