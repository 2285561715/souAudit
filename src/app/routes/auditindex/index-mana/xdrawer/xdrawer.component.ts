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
import { _HttpClient, ModalHelper } from '@delon/theme';

import { AuditindexIndexManaIdaddComponent } from './idadd/add.component';
import { AuditindexIndexManaIdeditComponent } from './idedit/edit.component';
import { AuditindexIndexManaXdrawerIdmoreComponent } from './idmore/idmore.component';
import { AuditindexIndexManaSetUpComponent } from './setlist/setup.component';

@Component({
  selector: 'app-auditindex-index-mana-xdrawer',
  templateUrl: './xdrawer.component.html',
  styleUrls: ['./xdrawer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditindexIndexManaXdrawerComponent implements OnInit {
  activedNode: NzTreeNode;
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    private modalService: NzModalService,
    private drawerRef: NzDrawerRef<string>,
    private nzContextMenuService: NzContextMenuService,
  ) {}

  searchValue = '';
  defaultExpandedKeys = ['0'];
  value: any;

  nodes: any = [];

  ngOnInit() {
    this.loadInfo();
  }

  loadInfo(): void {
    // this.http.get('/api/indexes/' + this.value).subscribe((res: any) => {
    this.http.get('/api/indexes/' + this.value.verIndex, { esName: this.value.esName }).subscribe((res: any) => {
      this.nodes = res.nodes;
      this.cdr.detectChanges();
    });
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

  // add indexes
  addInfo(activeNode: any): void {
    activeNode.verIndex = this.value.verIndex;
    this.modal.create(AuditindexIndexManaIdaddComponent, { activeNode }, { size: 'lg' }).subscribe((res: any) => {
      this.loadInfo();
    });
  }
  // 修改指标
  editInfo(activeNode: any) {
    // activeNode.verIndex = this.value;
    this.modal.create(AuditindexIndexManaIdeditComponent, { activeNode }, { size: 'lg' }).subscribe((res: any) => {
      this.loadInfo();
    });
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

  setContent(activeNode: any): void {
    // 设置属性类别：01对应部门，
    // 02对应总校数据同步采集表， 03对应总校数据填报表， 04对应总校上传文件资料；
    // 05对应分校数据采集表，06对应分校填报表，07对于应分校上传资料；
    // 08对应数据统计分析项，09对应设置的指标阀值，10对应数据统计图表种类；
    activeNode.verIndex = this.value.verIndex;
    this.modal.create(AuditindexIndexManaSetUpComponent, { activeNode }, { size: 'lg' }).subscribe((res: any) => {
      this.loadInfo();
    });
  }

  setMore(activeNode: any): void {
    activeNode.verIndex = this.value.verIndex;
    this.modal
      .create(AuditindexIndexManaXdrawerIdmoreComponent, { activeNode }, { size: 'xl' })
      .subscribe((res: any) => {
        this.loadInfo();
      });
  }

  nzEvent(event: NzFormatEmitEvent): void {
    // console.log(event);
  }

  close(): void {
    this.drawerRef.close(this.value);
  }
}
