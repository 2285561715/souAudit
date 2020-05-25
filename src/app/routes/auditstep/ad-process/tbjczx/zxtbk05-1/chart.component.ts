import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';
import { zip, config } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-stepprocess-tbjczx-zxtbk051-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepProcessTbjcZxtbK051ChartComponent implements OnInit {
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

  data: any = [];

  // chartOption = {
  //   title: {
  //     text: '某站点用户访问来源',
  //     subtext: '纯属虚构',
  //     left: 'center',
  //   },
  //   tooltip: {
  //     trigger: 'item',
  //     formatter: '{a} <br/>{b} : {c} ({d}%)',
  //   },
  //   legend: {
  //     orient: 'vertical',
  //     left: 'left',
  //     data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
  //   },
  //   series: [
  //     {
  //       name: '访问来源',
  //       type: 'pie',
  //       radius: '55%',
  //       center: ['50%', '60%'],
  //       data: [
  //         { value: 335, name: '直接访问' },
  //         { value: 310, name: '邮件营销' },
  //         { value: 234, name: '联盟广告' },
  //         { value: 135, name: '视频广告' },
  //         { value: 1548, name: '搜索引擎' },
  //       ],
  //       emphasis: {
  //         itemStyle: {
  //           shadowBlur: 10,
  //           shadowOffsetX: 0,
  //           shadowColor: 'rgba(0, 0, 0, 0.5)',
  //         },
  //       },
  //     },
  //   ],
  // };

  parmOfsql_nlbl: any = {};
  parmOfsql_zyjszw: any = {};
  parmOfsql_xl: any = {};

  listOfData_nlbl: any[] = [];
  listOfData_zyjszw: any[] = [];
  listOfData_xl: any[] = [];

  tempnlbl: any[] = [];
  tempzyjszw: any[] = [];
  tempxl: any[] = [];

  pieData_nlbl: any[] = [];
  pieData_nlbl_zz: any[] = [];
  pieData_nlbl_jz: any[] = [];
  pieData_zyjszw: any[] = [];
  pieData_xl: any[] = [];

  total_nlbl: string;
  total_nlbl_zz: string;
  total_nlbl_jz: string;
  total_zyjszw: string;
  total_xl: string;

  numup40 = 0;
  numunder40 = 0;

  ngOnInit(): void {
    const date = new Date();
    date.getFullYear();
    // 查询教师年龄比例
    this.parmOfsql_nlbl = {
      tableName: 'tjzx_jsjbxx_nl_bl',
      fieldList: ['xxdm', 'xxmc', 'nd', 'xz', 'under40', 'up40', 'allnum'],
      predication: " nd='" + (date.getFullYear() - 1) + "'",
      orderDirections: ' allnum DESC',
    };
    // 查询教师学历
    this.parmOfsql_xl = {
      tableName: 'tjzx_jsjbxx_xl_bl',
      fieldList: ['xxdm', 'xxmc', 'nd', 'rs', 'xl'],
      predication: " nd='" + (date.getFullYear() - 1) + "'",
      orderDirections: ' xl ASC',
    };
    // 查询教师专业技术职务
    this.parmOfsql_zyjszw = {
      tableName: 'tjzx_jsjbxx_zyjw_bl',
      fieldList: ['xxdm', 'xxmc', 'nd', 'rs', 'dzzw'],
      predication: " nd='" + (date.getFullYear() - 1) + "'",
      orderDirections: ' dzzw ASC',
    };
    zip(
      this.http.post('/api/dynamic/search', this.parmOfsql_nlbl),
      this.http.post('/api/dynamic/search', this.parmOfsql_xl),
      this.http.post('/api/dynamic/search', this.parmOfsql_zyjszw),
    )
      .pipe(
        catchError(([cxNlbl, cxXl, cxZyjszw]) => {
          return [cxNlbl, cxXl, cxZyjszw];
        }),
      )
      .subscribe(
        ([cxNlbl, cxXl, cxZyjszw]) => {
          this.tempnlbl = cxNlbl;
          this.tempxl = cxXl;
          this.tempzyjszw = cxZyjszw;
        },
        () => {},
        () => {
          this.listOfData_nlbl = this.tempnlbl;
          this.listOfData_zyjszw = this.tempzyjszw;
          this.listOfData_xl = this.tempxl;
          // 生成专业技术职务饼图数组
          const data = [];
          this.listOfData_zyjszw.forEach(itemz => {
            data.push({
              x: itemz.dzzw,
              y: itemz.rs,
            });
            this.pieData_zyjszw = [...data];
          });
          this.total_zyjszw = `${this.pieData_zyjszw.reduce((pre, now) => now.y + pre, 0).toFixed(0)} 人`;
          // ------------------------------------------------------------------
          // 生成学历饼图数组
          const data1 = [];
          this.listOfData_xl.forEach(itemx => {
            data1.push({
              x: itemx.xl,
              y: itemx.rs,
            });
            this.pieData_xl = [...data1];
          });
          this.total_xl = `${this.pieData_xl.reduce((pre, now) => now.y + pre, 0).toFixed(0)} 人`;
          // ------------------------------------------------------------------
          // 生成年龄比例饼图数组
          const data2 = [];
          this.listOfData_nlbl.forEach(itemn => {
            this.numup40 = this.numup40 + itemn.up40;
            this.numunder40 = this.numunder40 + itemn.under40;

            if (itemn.xz === '专职') {
              this.pieData_nlbl_zz = [
                { x: '40岁以上', y: itemn.up40 },
                { x: '40岁及以下', y: itemn.under40 },
              ];
            }
            if (itemn.xz === '兼职') {
              this.pieData_nlbl_jz = [
                { x: '40岁以上', y: itemn.up40 },
                { x: '40岁及以下', y: itemn.under40 },
              ];
            }
          });
          this.total_nlbl_zz = `${this.pieData_nlbl_zz.reduce((pre, now) => now.y + pre, 0).toFixed(0)} 人`;
          this.total_nlbl_jz = `${this.pieData_nlbl_jz.reduce((pre, now) => now.y + pre, 0).toFixed(0)} 人`;
          this.pieData_nlbl = [
            { x: '40岁以上', y: this.numup40 },
            { x: '40岁及以下', y: this.numunder40 },
          ];
          this.total_nlbl = `${this.pieData_nlbl.reduce((pre, now) => now.y + pre, 0).toFixed(0)} 人`;
          // -------------------------------------------------------------------
          this.cdr.detectChanges();
        },
      );
  }

  format(val: number) {
    return ` ${val.toFixed(0)} 人`;
  }
}
