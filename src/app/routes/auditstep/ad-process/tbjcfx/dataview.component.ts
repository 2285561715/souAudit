import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auditstep-ad-process-tbjcfx-data-view',
  templateUrl: './dataview.component.html',
})
export class AuditstepAdProcessTbjcFxDataViewComponent implements OnInit {
  tableNo: string;
  constructor(public http: _HttpClient, private cdr: ChangeDetectorRef, private router: Router) {
    const currentUrls = router.url.split('=');
    if (currentUrls[1]) {
      this.tableNo = currentUrls[1];
      localStorage.setItem('tableNo', this.tableNo);
    }
  }
  record: any = [];
  dataSet = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  salesPieData = [
    {
      x: '市区',
      y: 4544,
    },
    {
      x: '郊区',
      y: 3321,
    },
    {
      x: '行业',
      y: 3113,
    },
    {
      x: '非学历培训',
      y: 2341,
    },
    {
      x: '社区教育',
      y: 1231,
    },
    {
      x: '其他',
      y: 1231,
    },
  ];
  total: string;
  ngOnInit() {
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
