import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, SettingsService } from '@delon/theme';
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
    public loadUser: SettingsService,
  ) {
    const currentUrls = router.url.split('=');
    if (currentUrls[1]) {
      this.tableNo = currentUrls[1];
      localStorage.setItem('tableNo', this.tableNo);
    }
  }
  value: any = [];
  listOfData: any[] = [];
  parmOfSql: any = {};
  parmOfSqlData: any = {};
  columns: STColumn[] = [];

  outDataUrl = '';
  downExcelUrl = '';
  isVisible = false;

  ngOnInit() {
    // 导出数据接口地址
    this.outDataUrl =
      '/api/excel/export?tableName=' +
      this.value.dtNo +
      '&dtName=' +
      this.value.dtName +
      '&deptId=' +
      this.loadUser.user.bid +
      '&kind=fx'; // kind=fx, where xxdm='deptID'
  }

  // 数据导出功能
  exportToExcel(event: any): void {
    this.isVisible = true;
    this.http
      .get(
        '/api/data/export?tableNo=' +
          this.value.dtNo +
          '&tableName=' +
          this.value.dtName +
          '&tableLx=zx&deptId=' +
          this.loadUser.user.bid,
      )
      .subscribe(res => {
        this.downExcelUrl = res.data;
      });
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  loadInfo(): void {
    this.parmOfSql = {
      tableName: 'sj_datatables',
      fieldList: ['dt_no', 'dt_name', 'fields_num', 'zd_name_list', 'zd_zh_name_list', 'duty_dept', 'duty_dept_name'],
      predication: " dt_no='" + this.value.dtNo + "' ",
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
        tableName: this.value.dtNo,
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
