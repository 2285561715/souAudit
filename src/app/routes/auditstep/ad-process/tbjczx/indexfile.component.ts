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

import { StepProcessTbjcZxFileInxCommentComponent } from './inxComment.component';
import { StepProcessTbjcZxWzfileditEditComponent } from './wzfiledit/edit.component';

@Component({
  selector: 'app-auditstep-ad-process-tbjczx-index-file',
  templateUrl: './indexfile.component.html',
  styleUrls: ['./indexfile.component.less'],
})
export class AuditstepAdProcessTbjcZxIndexFileComponent implements OnInit {
  activedNode: NzTreeNode;
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

  searchValue = '';
  value: any;
  nodes: any = [];
  editCache: { [key: string]: any } = {};

  listOfData: any[] = [];
  listOfTreeData: any[] = [];
  listOfDataFile: any[] = [];

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

  tempDCK: any[] = [];
  tempNode: any[] = [];

  temppgfile = '';
  tempatfile = '';
  temppdept = '';

  ngOnInit() {
    // console.log(this.value);
    this.loadInfo();
  }

  loadInfo(): void {
    this.listOfData = [];
    this.listOfDataFile = [];
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
      predication: " app_id='" + this.value.appId + "' and step_id='" + this.value.id + "'",
      orderDirections: ' index_id ASC, up_time ASC',
    };

    zip(
      this.http.get('/api/indexes/' + this.value.verIndex, { esName: this.value.esName }),
      this.http.post('/api/dynamic/search', this.parmOfSql),
    )
      .pipe(
        catchError(([cxIndexs, cxFiles]) => {
          return [cxIndexs, cxFiles];
        }),
      )
      .subscribe(
        ([cxIndexs, cxFiles]) => {
          this.tempDCK = cxFiles;
          this.tempNode = cxIndexs.nodes[0].children;
        },
        () => {},
        () => {
          this.listOfDataFile = this.tempDCK;
          this.nodes = this.tempNode;
          this.nodes.deep = 5;
          this.listOfTreeData = this.trToArry.treeToArr(this.nodes);
          this.listOfTreeData.forEach(item => {
            // 已填报的文字材料遍历
            this.temppgfile = '';
            this.tempatfile = '';
            this.temppdept = '';

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
            // 遍历责任部门
            this.listOfDept.forEach(itemd => {
              if (item.dutyDept.includes(itemd.bno + ',')) {
                this.temppdept = this.temppdept + ',' + itemd.bname;
              }
            });

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
              dutydept: this.temppdept,
              viewPoint: this.sanitizer.bypassSecurityTrustHtml(item.viewPoint),
              pgfile: this.temppgfile,
              pf: this.sanitizer.bypassSecurityTrustHtml(this.temppgfile),
              atfile: this.tempatfile,
              af: this.sanitizer.bypassSecurityTrustHtml(this.tempatfile),
              uptime: item.uptime,
            });
          });
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

    this.modal.create(StepProcessTbjcZxWzfileditEditComponent, { dataValue }, { size: 'xl' }).subscribe((res: any) => {
      this.loadInfo();
    });
  }
  // 指标内涵说明
  openInxcoments(record: any) {
    this.modal.create(StepProcessTbjcZxFileInxCommentComponent, { record }, { size: 'lg' }).subscribe((res: any) => {});
  }
  // --------------------------------------------------------------
  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  close(): void {
    this.drawerRef.close(this.value);
  }
}
