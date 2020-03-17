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

import { AuditindexIndexManaProfileEditComponent } from './edit/edit.component';

@Component({
  selector: 'app-auditindex-index-mana-profile-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditindexIndexManaProfileViewComponent implements OnInit {
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
  value: string;

  nodes: any = [];
  panels: any = [];
  editCache: { [key: string]: any } = {};
  listOfData: any[] = [];

  levTempOne: any[] = [];
  levTempTwo: any[] = [];
  levTempThr: any[] = [];
  levTempFou: any[] = [];
  levTempFiv: any[] = [];

  ngOnInit() {
    this.loadInfo();
  }

  loadInfo(): void {
    this.listOfData = [];
    this.http.get('/api/indexes/' + this.value).subscribe((res: any) => {
      this.nodes = res.nodes;
      console.log(this.nodes);
      // console.log(this.nodes[0].children);
      this.levTempOne = this.nodes[0].children;
      let i = 0;
      // 第一层
      this.levTempOne.forEach(item => {
        item.id = item.id + '';
        this.listOfData.push({
          id: item.id,
          active: true,
          name: item.title,
          level: item.level,
          isLeaf: item.isLeaf,
          isStar: item.isStar,
          idKind: item.idKind,
        });
        // this.listOfData = [...this.listOfData, item];

        // 第二层
        if (this.levTempOne[i].children && this.levTempOne[i].children.length > 0) {
          this.levTempTwo = [];
          this.levTempTwo = this.levTempOne[i].children;
          let j = 0;
          this.levTempTwo.forEach(itemtwo => {
            itemtwo.id = itemtwo.id + '';
            this.listOfData.push({
              id: itemtwo.id,
              active: true,
              name: itemtwo.title,
              level: itemtwo.level,
              isLeaf: itemtwo.isLeaf,
              isStar: itemtwo.isStar,
              idKind: itemtwo.idKind,
            });

            // 第三层
            if (this.levTempTwo[j].children && this.levTempTwo[j].children.length > 0) {
              this.levTempThr = [];
              this.levTempThr = this.levTempTwo[j].children;
              let k = 0;
              this.levTempThr.forEach(itemthr => {
                itemthr.id = itemthr.id + '';
                this.listOfData.push({
                  id: itemthr.id,
                  active: true,
                  name: itemthr.title,
                  level: itemthr.level,
                  isLeaf: itemthr.isLeaf,
                  isStar: itemthr.isStar,
                  idKind: itemthr.idKind,
                });

                // 第四层
                if (this.levTempThr[k].children && this.levTempThr[k].children.length > 0) {
                  this.levTempFou = [];
                  this.levTempFou = this.levTempThr[k].children;
                  let l = 0;
                  this.levTempFou.forEach(itemfou => {
                    itemfou.id = itemfou.id + '';
                    this.listOfData.push({
                      id: itemfou.id,
                      active: true,
                      name: itemfou.title,
                      level: itemfou.level,
                      isLeaf: itemfou.isLeaf,
                      isStar: itemfou.isStar,
                      idKind: itemfou.idKind,
                    });

                    // 第五层
                    if (this.levTempFou[l].children && this.levTempFou[l].children.length > 0) {
                      this.levTempFiv = [];
                      this.levTempFiv = this.levTempFou[l].children;
                      //
                      this.levTempFiv.forEach(itemfiv => {
                        itemfiv.id = itemfiv.id + '';
                        this.listOfData.push({
                          id: itemfiv.id,
                          active: true,
                          name: itemfiv.title,
                          level: itemfiv.level,
                          isLeaf: itemfiv.isLeaf,
                          isStar: itemfiv.isStar,
                          idKind: itemfiv.idKind,
                        });

                        // 第六层
                        // if (this.levTempFou[l].children && this.levTempFou[l].children.length > 0) {
                        // }
                        l = l + 1;
                      });
                    }
                    l = l + 1;
                  });
                }
                k = k + 1;
              });
            }
            j = j + 1;
          });
        }
        i = i + 1;
      });
      this.cdr.detectChanges();
    });
    console.log(this.listOfData);
    // customStyle: {
    //   background: '#f7f7f7',
    //   'border-radius': '4px',
    //   'margin-bottom': '12px',
    //   border: '1px',
    // },
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

  openEdit(record: any[]) {
    this.modal.create(AuditindexIndexManaProfileEditComponent, { record }, { size: 'lg' }).subscribe((res: any) => {
      this.loadInfo();
    });
  }

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  close(): void {
    this.drawerRef.close(this.value);
  }
}
