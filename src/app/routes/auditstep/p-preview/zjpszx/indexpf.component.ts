import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NzMessageService, NzModalService, NzDrawerService } from 'ng-zorro-antd';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';
import { ArrayService } from '@delon/util';

import { DomSanitizer } from '@angular/platform-browser';
import { zip, config } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuditstepPreviewZjpsZxReviewComponent } from './review.component';

@Component({
  selector: 'app-auditstep-ad-process-tbjczx-index-pf',
  templateUrl: './indexpf.component.html',
})
export class AuditstepAdProcessTbjcZxIndexPfComponent implements OnInit {
  constructor(
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private modalService: NzModalService,
    private trToArry: ArrayService,
    private drawerService: NzDrawerService,
    private sanitizer: DomSanitizer,
    public loadUser: SettingsService,
  ) {}

  listOfData: any[] = [];
  salesPieData: any[] = [];
  value: any = [];
  total: string;

  // ----------------------------
  nodes: any = [];
  aNum = 0;
  bNum = 0;
  cNum = 0;
  dNum = 0;
  listOfTreeData: any[] = [];
  listOfDataPoint: any[] = [];
  parmOfSqlPoint: any = {};
  tempNode: any[] = [];
  tempPoint: any[] = [];

  ngOnInit() {
    this.loadInfo();
    // console.log(this.value);
    // console.log(this.listData);
  }

  loadInfo(): void {
    this.aNum = 0;
    this.bNum = 0;
    this.cNum = 0;
    this.dNum = 0;
    this.listOfData = [];

    // 查询专家已评分情况
    this.parmOfSqlPoint = {
      tableName: 'ad_apply_wbszjps',
      fieldList: ['id', 'index_id', 'zj_id', 'ps_point', 'ps_text', 'pp_mark', 'up_time', 'mod_time', 'is_done'],
      predication:
        " app_id='" +
        this.value.appId +
        "' and step_id='" +
        this.value.stepId +
        "' and zj_id='" +
        this.loadUser.user.id +
        "'",
      orderDirections: ' index_id ASC, up_time ASC',
    };

    zip(
      this.http.get('/api/indexes/' + this.value.verIndex, { esName: this.value.esName }),
      this.http.post('/api/dynamic/search', this.parmOfSqlPoint),
    )
      .pipe(
        catchError(([cxIndexs, cxPoints]) => {
          return [cxIndexs, cxPoints];
        }),
      )
      .subscribe(
        ([cxIndexs, cxPoints]) => {
          this.tempNode = cxIndexs.nodes[0].children;
          this.tempPoint = cxPoints;
        },
        () => {},
        () => {
          this.listOfDataPoint = this.tempPoint;
          this.nodes = this.tempNode;
          this.nodes.deep = 5;
          this.listOfTreeData = this.trToArry.treeToArr(this.nodes);
          // console.log(this.listOfTreeData);
          this.listOfDataPoint.forEach(itemt => {
            if (itemt.ps_point === 'A') {
              this.aNum = this.aNum + 1;
            }
            if (itemt.ps_point === 'B') {
              this.bNum = this.bNum + 1;
            }
            if (itemt.ps_point === 'C') {
              this.cNum = this.cNum + 1;
            }
            if (itemt.ps_point === 'D') {
              this.dNum = this.dNum + 1;
            }
          });
          const data = [];
          this.listOfTreeData.forEach(item => {
            // 已打分反馈的意见
            this.listOfDataPoint.forEach(itemp => {
              if (itemp.index_id === item.id + '') {
                item.pid = itemp.id;
                item.point = itemp.ps_point;
                item.ppmark = itemp.pp_mark;
                item.psremark = itemp.ps_text;
                item.psmodtime = itemp.mod_time;
              }
            });
            // -----------------------------------------------------------------
            item.id = item.id + '';
            data.push({
              id: item.id,
              active: item.isLeaf,
              name: item.title,
              level: item.level,
              isLeaf: item.isLeaf,
              isStar: item.isStar,
              idKind: item.idKind,
              remark: item.remark,
              // ---评审意见
              pid: item.pid,
              pspoint: item.point,
              ppmark: item.ppmark,
              psremark: item.psremark,
              pm: this.sanitizer.bypassSecurityTrustHtml(item.psremark),
              psmodtime: item.psmodtime,
            });
            this.listOfData = [...data];
            // ------------------------------------------------------------------
          });
          const data2 = [];
          data2.push(
            { x: 'A', y: this.aNum },
            { x: 'B', y: this.bNum },
            { x: 'C', y: this.cNum },
            { x: 'D', y: this.dNum },
          );
          this.salesPieData = [...data2];
          this.total = `${this.salesPieData.reduce((pre, now) => now.y + pre, 0).toFixed(0)} 个`;
          // -------------------------------------------------------------------
          this.cdr.detectChanges();
        },
      );
  }

  openEdit(record: any) {
    const dataValue = record;
    this.modal.create(AuditstepPreviewZjpsZxReviewComponent, { dataValue }, { size: 'xl' }).subscribe((res: any) => {
      this.loadInfo();
    });
  }

  format(val: number) {
    return `${val.toFixed(0)} 个`;
  }
}
