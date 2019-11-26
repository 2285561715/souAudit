import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-auditstep-ad-process-tbjczx-data-view',
  templateUrl: './dataview.component.html',
})
export class AuditstepAdProcessTbjcZxDataViewComponent implements OnInit {
  tableNo: string;
  constructor(
    public http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private router: Router,
  ) {
    const currentUrls = router.url.split('=');
    if (currentUrls[1]) {
      this.tableNo = currentUrls[1];
      localStorage.setItem('tableNo', this.tableNo);
    }
  }
  record: any = [];
  ngOnInit() {
    console.log(this.record);
    this.loadInfo();
  }

  loadInfo(): void {
    switch (this.record.dtNo) {
      case 'zxcj_fxjbxx':
        break;
      case 'zxcj_xzbxx':
        break;
      case 'zxcj_zypyjhxx':
        break;
    }
    // zxcj_kcjbxx
    // zxcj_xsjbxx
    // zxcj_zyjbxx
    // zxcj_xqkkxx
    // zxcj_fxxqkkxx
    // zxcj_xqjxbjxx
    // zxcj_xqjxbjxsxx
    // zxcj_byszb
    // zxcj_jhnkcxxb
    // zxcj_jsxxzb
    this.cdr.detectChanges();
  }
}
