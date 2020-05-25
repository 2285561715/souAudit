import {
  NzFormatEmitEvent,
  NzMessageService,
  NzModalService,
  NzDrawerRef,
  NzDrawerService,
  NzTreeNode,
  NzContextMenuService,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';
import { ArrayService } from '@delon/util';

import { DomSanitizer } from '@angular/platform-browser';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuditstepPreviewZjpsZxInxCommentComponent } from './inxComment.component';
import { AuditstepPreviewZjpsZxReviewComponent } from './review.component';
import { AuditstepPreviewZjpsZxSjtbComponent } from './zxsjtb.component';
import { AuditstepAdProcessTbjcZxIndexPfComponent } from './indexpf.component';

@Component({
  selector: 'app-auditstep-preview-zjpszx-indexs-view',
  templateUrl: './indexsview.component.html',
  styleUrls: ['./indexsview.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditstepPreviewZjpsZxIndexsViewComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    private modalService: NzModalService,
    private drawerRef: NzDrawerRef<string>,
    private nzContextMenuService: NzContextMenuService,
    private trToArry: ArrayService,
    private drawerService: NzDrawerService,
    private sanitizer: DomSanitizer,
    public loadUser: SettingsService,
  ) {}
  activedNode: NzTreeNode;

  searchValue = '';
  value: any;
  nodes: any = [];
  editCache: { [key: string]: any } = {};

  listOfData: any[] = [];
  listOfTreeData: any[] = [];
  listOfDataFile: any[] = [];
  listOfDataPoint: any[] = [];
  listOfDataTable: any[] = [];

  aNum = 0;
  bNum = 0;
  cNum = 0;
  dNum = 0;

  listOfDept = [
    { bno: '7', bname: '质量监控与评价中心' },
    { bno: '37', bname: '党政办' },
    { bno: '40', bname: '人事处' },
    { bno: '42', bname: '发展研究部/科研处' },
    { bno: '43', bname: '学历教育部' },
    { bno: '44', bname: '学习资源中心' },
    { bno: '45', bname: '信网中心' },
    { bno: '46', bname: '财务部/招标办' },
    { bno: '47', bname: '国际交流学院' },
    { bno: '48', bname: '社区教育部' },
    { bno: '49', bname: '宣传部' },
    { bno: '50', bname: '非学历教育部' },
    { bno: '52', bname: '校内专家组' },
    { bno: '53', bname: '校外专家组' },
    { bno: '55', bname: '合作办' },
    { bno: '57', bname: '后保处' },
    { bno: '58', bname: '图书馆' },
    { bno: '60', bname: '纪监室' },
    { bno: '61', bname: '组织部/统战部' },
    { bno: '62', bname: '群团部' },
    { bno: '63', bname: '审计室' },
    { bno: '64', bname: '中专部' },
    { bno: '65', bname: '公共管理学院' },
    { bno: '66', bname: '经济管理学院' },
    { bno: '67', bname: '理工学院' },
    { bno: '68', bname: '人文学院' },
    { bno: '69', bname: '学分银行' },
    { bno: '70', bname: '网研中心' },
  ];
  deptparmOfSql: any = {};

  isFirst = false;
  parmOfSql: any = {};
  parmOfSqlPoint: any = {};
  parmOfSqlTable: any = {};

  tempDCK: any[] = [];
  tempNode: any[] = [];
  tempPoint: any[] = [];
  tempDt: any[] = [];
  templistdt: any[] = [];

  temppgfile = '';
  tempatfile = '';
  temppdept = '';
  string;

  ngOnInit() {
    this.loadInfo();
  }

  loadInfo(): void {
    this.aNum = 0;
    this.bNum = 0;
    this.cNum = 0;
    this.dNum = 0;
    this.listOfData = [];
    this.listOfDataFile = [];
    this.listOfDataTable = [];
    // 查询总校已填报文字材料
    this.parmOfSql = {
      tableName: 'ad_apply_wbswz',
      fieldList: [
        'id',
        'ver_index',
        'dept_id',
        'app_id',
        'index_id',
        'step_id',
        'index_comments',
        'other_attachments',
        'up_time',
      ],
      predication: " app_id='" + this.value.appId + "'",
      orderDirections: ' index_id ASC, up_time ASC',
    };
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
    // 查询verindex 有哪些数据表
    this.parmOfSqlTable = {
      tableName: 'ad_indexes_sets',
      fieldList: ['index_id', 'type_no', 'type_name'],
      predication: " ver_index='" + this.value.verIndex + "' and con_type='sjtb' ",
      orderDirections: ' index_id ASC, type_no ASC',
    };

    zip(
      this.http.get('/api/indexes/' + this.value.verIndex, { esName: this.value.esName }),
      this.http.post('/api/dynamic/search', this.parmOfSql),
      this.http.post('/api/dynamic/search', this.parmOfSqlPoint),
      this.http.post('/api/dynamic/search', this.parmOfSqlTable),
    )
      .pipe(
        catchError(([cxIndexs, cxFiles, cxPoints, cxTables]) => {
          return [cxIndexs, cxFiles, cxPoints, cxTables];
        }),
      )
      .subscribe(
        ([cxIndexs, cxFiles, cxPoints, cxTables]) => {
          this.tempDCK = cxFiles;
          this.tempNode = cxIndexs.nodes[0].children;
          this.tempPoint = cxPoints;
          this.tempDt = cxTables;
        },
        () => {},
        () => {
          this.listOfDataFile = this.tempDCK;
          this.listOfDataPoint = this.tempPoint;
          this.listOfDataTable = this.tempDt;
          this.nodes = this.tempNode;
          this.nodes.deep = 5;
          this.listOfTreeData = this.trToArry.treeToArr(this.nodes);
          // console.log(this.listOfTreeData);
          // console.log(this.listOfDataTable);
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

          this.listOfTreeData.forEach(item => {
            // 遍历责任部门
            // this.listOfDept.forEach(itemd => {
            //   if (item.dutyDept.includes(itemd.bno + ',')) {
            //     this.temppdept = this.temppdept + ',' + itemd.bname;
            //   }
            // });
            // 已填报的文字材料遍历
            this.temppgfile = '';
            this.tempatfile = '';
            this.temppdept = '';
            this.templistdt = [];
            this.listOfDataFile.forEach(itemf => {
              if (itemf.index_id === item.id) {
                item.wzid = itemf.id;
                if (itemf.index_comments !== null) {
                  this.temppgfile = this.temppgfile + '<br>' + itemf.index_comments;
                }
                if (itemf.other_attachments !== null) {
                  this.tempatfile = this.tempatfile + '<br>' + itemf.other_attachments;
                }
                item.uptime = itemf.up_time;
              }
            });
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
            // 遍历对应的数据表
            if (item.isLeaf) {
              this.listOfDataTable.forEach(itemD => {
                if (itemD.index_id === item.id + '') {
                  this.templistdt.push({
                    dtNo: itemD.type_no,
                    dtName: itemD.type_name,
                  });
                }
              });
            }
            // -----------------------------------------------------------------
            item.id = item.id + '';
            this.listOfData.push({
              id: item.id,
              wzid: item.wzid,
              active: item.isLeaf,
              name: item.title,
              level: item.level,
              isLeaf: item.isLeaf,
              isStar: item.isStar,
              idKind: item.idKind,
              remark: item.remark,
              // 指标下数据表
              datatable: this.templistdt,
              // dutydept: this.temppdept,
              // 文字材料
              viewPoint: this.sanitizer.bypassSecurityTrustHtml(item.viewPoint),
              pgfile: this.temppgfile,
              pf: this.sanitizer.bypassSecurityTrustHtml(this.temppgfile),
              atfile: this.tempatfile,
              af: this.sanitizer.bypassSecurityTrustHtml(this.tempatfile),
              uptime: item.uptime,
              // ---评审意见
              pid: item.pid,
              pspoint: item.point,
              ppmark: item.ppmark,
              psremark: item.psremark,
              pm: this.sanitizer.bypassSecurityTrustHtml(item.psremark),
              psmodtime: item.psmodtime,
            });
            // ------------------------------------------------------------------
          });
          // -------------------------------------------------------------------
          this.cdr.detectChanges();
          // console.log(this.listOfData);
        },
      );
  }

  openFolder(data: NzTreeNode | Required<NzFormatEmitEvent>): void {
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
  }

  activeNode(data: NzFormatEmitEvent): void {
    this.activedNode = data.node!;
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  deleteConfirm(activedNode: any): void {
    this.modalService.confirm({
      nzTitle: '<i>是否要删除数据</i>',
      nzContent: '<b>连同该指标下全部指标将删除，确认要删除吗？</b>',
      nzOnOk: () => this.deleteInfo(activedNode.origin.id),
    });
  }

  deleteInfo(key: number) {
    this.http.delete('/api/indexes/' + key).subscribe((res: any) => {
      this.msgSrv.success('删除指标成功');
      this.loadInfo();
    });
  }

  openEdit(record: any) {
    const dataValue = record;
    dataValue.appId = this.value.appId;
    dataValue.deptId = this.value.deptId;
    dataValue.stepId = this.value.stepId;
    dataValue.verIndex = this.value.verIndex;

    this.modal.create(AuditstepPreviewZjpsZxReviewComponent, { dataValue }, { size: 'xl' }).subscribe((res: any) => {
      this.loadInfo();
    });
  }
  // 指标内涵说明
  openInxcoments(record: any) {
    this.modal
      .create(AuditstepPreviewZjpsZxInxCommentComponent, { record }, { size: 'lg' })
      .subscribe((res: any) => {});
  }
  // --------------------------------------------------------------
  // 专家查看已填报数据，并可修改
  dataBarShow(record: any): void {
    const drawerRef = this.drawerService.create<AuditstepPreviewZjpsZxSjtbComponent, { value: any }, string>({
      nzTitle: '<b>【' + record.dtName + '】数据填报</b>',
      nzWidth: document.body.clientWidth - 180,
      nzPlacement: 'right',
      // nzMaskClosable: false,
      nzContent: AuditstepPreviewZjpsZxSjtbComponent,
      nzContentParams: {
        value: record,
      },
    });

    drawerRef.afterOpen.subscribe(() => {
      // console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      // this.loadSteps();
      if (typeof data === 'string') {
        this.value = data;
      }
    });
  }
  // 专家查看已评分数据
  dataPFShow(): void {
    const drawerRef = this.drawerService.create<AuditstepAdProcessTbjcZxIndexPfComponent, { value: any }>({
      nzTitle: '<b>【' + this.loadUser.user.name + '】评分情况</b>',
      nzWidth: document.body.clientWidth - 1440,
      nzPlacement: 'right',
      nzContent: AuditstepAdProcessTbjcZxIndexPfComponent,
      nzContentParams: {
        value: this.value,
      },
    });

    drawerRef.afterOpen.subscribe(() => {
      // console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      this.loadInfo();
      if (typeof data === 'string') {
        this.value = data;
      }
    });
  }
  // --------------------------------------------------------------
  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }
  format(val: number) {
    return `${val.toFixed(2)}`;
  }
  close(): void {
    this.drawerRef.close(this.value);
  }
}
