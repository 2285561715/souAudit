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
import { DashboardDataUpFxWzfileditEditComponent } from './wzfiledit/edit.component';
import { DomSanitizer } from '@angular/platform-browser';

import { DashboardDataUpFxSjtbComponent } from './fxsjtb.component';

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
  isFirst = false;

  ngOnInit() {
    console.log(this.loadUser);
    this.loadInfo();
  }

  loadInfo(): void {
    // 查询指标体系
    this.listOfData = [];
    this.http.get('/api/indexes/' + this.value).subscribe((res: any) => {
      this.nodes = res.nodes;

      console.log(this.nodes);
      // res.nodes.deep = 5;
      // this.listOfData = this.trToArry.treeToArr(res.nodes);
      // console.log(this.listOfData);

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
          remark: item.remark,
          vp: item.viewPoint,
          viewPoint: this.sanitizer.bypassSecurityTrustHtml(item.viewPoint),
          dtNo: 'sjfxtb_b08_hzbx',
          dtName: '合作办学',
          stepId: 29,
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
              remark: itemtwo.remark,
              vp: itemtwo.viewPoint,
              viewPoint: this.sanitizer.bypassSecurityTrustHtml(itemtwo.viewPoint),
              dtNo: 'sjfxtb_b08_hzbx',
              dtName: '合作办学',
              stepId: 29,
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
                  remark: itemthr.remark,
                  vp: itemthr.viewPoint,
                  viewPoint: this.sanitizer.bypassSecurityTrustHtml(itemthr.viewPoint),
                  dtNo: 'sjfxtb_b08_hzbx',
                  dtName: '合作办学',
                  stepId: 29,
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
                      remark: itemfou.remark,
                      vp: itemfou.viewPoint,
                      viewPoint: this.sanitizer.bypassSecurityTrustHtml(itemfou.viewPoint),
                      dtNo: 'sjfxtb_b08_hzbx',
                      dtName: '合作办学',
                      stepId: 29,
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
                          remark: itemfiv.remark,
                          vp: itemfiv.viewPoint,
                          viewPoint: this.sanitizer.bypassSecurityTrustHtml(itemfiv.viewPoint),
                          dtNo: 'sjfxtb_b08_hzbx',
                          dtName: '合作办学',
                          stepId: 29,
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
    this.modal.create(DashboardDataUpFxWzfileditEditComponent, { record }, { size: 'xl' }).subscribe((res: any) => {
      this.loadInfo();
    });
  }
  // -------------------------------------------------------------
  // 分校数据填报，弹出框
  dataUpFun(panel: any): void {
    console.log(panel);
    const tdata = this.value;
    // tdata.dtNo = 'sjfxtb_b08_hzbx';
    // tdata.dtName = '合作办学';
    // tdata.stepId = 29;

    const drawerRef = this.drawerService.create<DashboardDataUpFxSjtbComponent, { value: any }, string>({
      nzTitle: '【' + panel.dtName + '】数据填报',
      nzWidth: document.body.clientWidth - 100,
      nzPlacement: 'right',
      // nzMaskClosable: false,
      nzContent: DashboardDataUpFxSjtbComponent,
      nzContentParams: {
        value: panel,
      },
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });
  }
  // --------------------------------------------------------------
  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  close(): void {
    this.drawerRef.close(this.value);
  }
}
