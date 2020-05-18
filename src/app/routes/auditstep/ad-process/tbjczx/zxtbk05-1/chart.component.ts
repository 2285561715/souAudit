import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';

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

  listOfData: any[] = [];
  value: any = {};

  @Input() dataStr: any;

  chartOption = {
    // backgroundColor: '#2c343c',
    // theme: 'dark',
    title: {
      text: '教师职称结构',
      left: 'center',
      top: 20,
      textStyle: {
        color: '#333',
      },
    },

    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
        colorLightness: [0, 1],
      },
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: [
          { value: 335, name: '正高级' },
          { value: 310, name: '副高级' },
          { value: 274, name: '中级' },
          { value: 235, name: '初级' },
          { value: 400, name: '其它' },
        ].sort(function(a, b) {
          return a.value - b.value;
        }),
        roseType: 'radius',
        label: {
          normal: {
            textStyle: {
              color: 'rgba(20, 20, 20, 0.6)',
            },
          },
        },
        labelLine: {
          normal: {
            lineStyle: {
              color: 'rgba(60, 60, 60, 0.3)',
            },
            smooth: 0.2,
            length: 10,
            length2: 20,
          },
        },
        itemStyle: {
          normal: {
            color: '#c23531',
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
          },
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay(idx) {
          return Math.random() * 200;
        },
      },
    ],
  };

  ngOnInit(): void {}

  format(val: number) {
    return `&yen ${val.toFixed(2)}`;
  }
}
