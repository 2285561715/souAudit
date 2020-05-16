import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { STColumn } from '@delon/abc';
import { SFSchema } from '@delon/form';

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
  listOfData: any[] = [];

  selectedFields: any = [];
  searchSchema: SFSchema = {
    properties: {
      no: {
        type: 'string',
        title: '学校代码',
      },
    },
  };

  parmOfSql: any = {};
  parmOfSqlData: any = {};

  columns: STColumn[] = [];

  ngOnInit() {
    // console.log(this.record);
    this.loadInfo();
  }

  loadInfo(): void {
    this.parmOfSql = {
      tableName: 'sj_datatables',
      fieldList: ['dt_no', 'dt_name', 'fields_num', 'zd_name_list', 'zd_zh_name_list', 'duty_dept', 'duty_dept_name'],
      predication: " dt_no='" + this.record.dtNo + "' ",
      orderDirections: 'id DESC',
    };
    let i = 0;
    this.http.post('/api/dynamic/search', this.parmOfSql).subscribe((res: any[]) => {
      const dataFields = res[0].zd_name_list.split(',');
      const dataFieldsName = res[0].zd_zh_name_list.split(',');

      dataFieldsName.forEach(item => {
        i = i + 1;
        if (!(item === 'id' || item === '数据锁')) {
          this.columns.push({
            title: item,
            index: dataFields[i - 1],
          });
        }
      });
      // --------------------------------------------------------
      this.parmOfSqlData = {
        tableName: this.record.dtNo,
        fieldList: dataFields,
        predication: ' id>0 ',
        orderDirections: 'id DESC',
      };
      this.http.post('/api/dynamic/search', this.parmOfSqlData).subscribe((resData: any[]) => {
        this.listOfData = resData;
        console.log(this.listOfData);
        console.log(this.columns);
        // this.cdr.detectChanges();
      });
      // --------------------------------------------------------
      this.cdr.detectChanges();
    });
  }
}
