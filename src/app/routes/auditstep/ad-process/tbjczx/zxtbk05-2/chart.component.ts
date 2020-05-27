import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';
import { zip, config } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-stepprocess-tbjczx-zxtbk052-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepProcessTbjcZxtbK052ChartComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    public loadUser: SettingsService,
    private modalService: NzModalService,
  ) {}

  value: any = {};
  @Input() dataStr: any;

  parmOfSql: any = {};
  listOfData: any[] = [];

  chartOption: any = {};
  dataSource: any = [];

  ngOnInit(): void {
    const date = new Date();
    date.getFullYear();
    // 查询教师年龄比例
    this.parmOfSql = {
      tableName: 'tjzx_jsjbqk',
      fieldList: [
        'nd',
        'xq',
        'jsrs',
        'zzjsrs',
        'zzjsbl',
        'zzpjmc',
        'ssxbl',
        'jzjsrs',
        'jzjsbl',
        'jzpjmc',
        'shjzbl',
        'jz3xqbl',
        'ssxrs',
        'shjzrs',
        'jz3xqrs',
        'zzrkmc',
        'jzrkmc',
      ],
      predication: " nd='" + (date.getFullYear() - 1) + "'",
      orderDirections: ' xq ASC',
    };
    this.http.post('/api/dynamic/search', this.parmOfSql).subscribe((res: any[]) => {
      this.listOfData = res;
      const data = [];
      this.listOfData.forEach(item => {
        data.push({
          product: item.nd + '' + item.xq,
          教师总数: item.jsrs,
          专职教师人数: item.zzjsrs,
          双师型教师人数: item.ssxrs,
          兼职教师人数: item.jzjsrs,
          社会兼职教师人数: item.shjzrs,
          连续3学期兼职教师人数: item.jz3xqrs,
          // 专职教师平均任教课程门次: item.zzpjmc,
          // 兼职教师平均任教课程门次: item.jzpjmc,
        });
        this.dataSource = [...data];
      });
      console.log(this.dataSource);
      // ----------------------------------------------------------------
      this.chartOption = {
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: [
            'product',
            '教师总数',
            '专职教师人数',
            '双师型教师人数',
            '兼职教师人数',
            '社会兼职教师人数',
            '连续3学期兼职教师人数',
            // '专职教师平均任教课程门次',
            // '兼职教师平均任教课程门次',
          ],
          source: this.dataSource,
        },
        xAxis: { type: 'category' },
        yAxis: {},
        series: [
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' },
          // { type: 'bar' },
          // { type: 'bar' },
        ],
      };
      // ----------------------------------------------------------------
      this.cdr.detectChanges();
    });
  }

  format(val: number) {
    return ` ${val.toFixed(0)} 人`;
  }
}
