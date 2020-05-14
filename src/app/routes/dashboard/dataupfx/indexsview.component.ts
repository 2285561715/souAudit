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
import { DashboardDataUpFxInxCommentComponent } from './inxComment.component';
import { DashboardDataUpFxWzfileditEditComponent } from './wzfiledit/edit.component';

@Component({
  selector: 'app-dashboard-dataupfx-indexs-view',
  templateUrl: './indexsview.component.html',
  styleUrls: ['./indexsview.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDataUpFxIndexsViewComponent implements OnInit {
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

  isFirst = false;
  temppdept: string;
  parmOfSql: any = {};

  tempDCK: any[] = [];
  tempNode: any[] = [];

  ngOnInit() {
    this.loadInfo();
  }

  loadInfo(): void {
    this.listOfData = [];
    this.listOfDataFile = [];
    this.parmOfSql = {
      tableName: 'ad_apply_wbswz',
      fieldList: [
        'ver_index',
        'dept_id',
        'app_id',
        'index_id',
        'step_id',
        'index_comments',
        'other_attachments',
        'up_time',
      ],
      predication:
        " ver_index='" +
        this.value.verIndex +
        "' and dept_id='" +
        this.value.deptId +
        "' and app_id='" +
        this.value.appId +
        "' and step_id='" +
        this.value.stepId +
        "'",
      orderDirections: 'id ASC',
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
            // ----------------------------------------------
            item.isLeaf ? (item.isDuty = true) : (item.isDuty = false);
            this.listOfDataFile.forEach(itemf => {
              if (itemf.index_id === item.id) {
                item.pgfile = itemf.index_comments;
                item.atfile = itemf.other_attachments;
                item.uptime = itemf.up_time;
              }
            });

            item.id = item.id + '';
            this.listOfData.push({
              id: item.id,
              active: item.isDuty,
              name: item.title,
              level: item.level,
              isLeaf: item.isLeaf,
              isStar: item.isStar,
              idKind: item.idKind,
              remark: item.remark,
              dutydept: item.dutyDept,
              viewPoint: this.sanitizer.bypassSecurityTrustHtml(item.viewPoint),
              pgfile: item.pgfile,
              pf: this.sanitizer.bypassSecurityTrustHtml(item.pgfile),
              atfile: item.atfile,
              af: this.sanitizer.bypassSecurityTrustHtml(item.atfile),
              uptime: item.uptime,
            });
          });
          this.cdr.detectChanges();
          console.log(this.listOfData);
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

    this.modal.create(DashboardDataUpFxWzfileditEditComponent, { dataValue }, { size: 'xl' }).subscribe((res: any) => {
      this.loadInfo();
    });
  }

  // -------------------------------------------
  // 指标内涵说明
  openInxcoments(record: any) {
    this.modal.create(DashboardDataUpFxInxCommentComponent, { record }, { size: 'lg' }).subscribe((res: any) => {});
  }
  // -------------------------------------------
  // --------------------------------------------------------------
  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  close(): void {
    this.drawerRef.close(this.value);
  }
}
