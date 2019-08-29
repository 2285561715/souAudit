import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-sysdata-zx-synchdatatable-view',
  templateUrl: './view.component.html',
})
export class SysdataZxSynchdatatableViewComponent implements OnInit {
  record: any = {};
  i: any;
  Catcha: SafeHtml;
  // Catcha: any;
  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    console.log('hello');
    console.log(this.record.tableHtml);

    this.Catcha = this.sanitizer.bypassSecurityTrustHtml(this.record.tableHtml);
    // this.http.get(`/user/${this.record.id}`).subscribe(res => this.i = res);
  }

  close() {
    this.modal.destroy();
  }
}
