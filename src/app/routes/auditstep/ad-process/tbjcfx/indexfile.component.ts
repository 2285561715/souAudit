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
import { StepProcessTbjcFxFileInxCommentComponent } from './inxComment.component';
import { StepProcessTbjcFxWzfileditEditComponent } from './wzfiledit/edit.component';

@Component({
  selector: 'app-auditstep-adprocess-tbjcfx-index-file',
  templateUrl: './indexfile.component.html',
  styleUrls: ['./indexfile.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditstepAdProcessTbjcFxIndexFileComponent implements OnInit {
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

  deptId = '31001';
  listOfDept = [
    { deptId: '31001', deptName: '虹口分校' },
    { deptId: '31002', deptName: '闵行二分校' },
    { deptId: '31003', deptName: '宝山分校' },
    { deptId: '31004', deptName: '浦东东校' },
    { deptId: '31005', deptName: '闵行一分校' },
    { deptId: '31006', deptName: '金山分校' },
    { deptId: '31007', deptName: '松江分校' },
    { deptId: '31008', deptName: '浦东南校' },
    { deptId: '31009', deptName: '奉贤分校' },
    { deptId: '31010', deptName: '青浦分校' },
    { deptId: '31011', deptName: '崇明分校' },
    { deptId: '31012', deptName: '嘉定分校' },
    { deptId: '31020', deptName: '百联集团分校' },
    { deptId: '31025', deptName: '新世界集团分校' },
    { deptId: '31026', deptName: '航空运输学院' },
    { deptId: '31028', deptName: '企业家联合会' },
    { deptId: '31030', deptName: '杨浦分校 ' },
    { deptId: '31031', deptName: '黄浦分校' },
    { deptId: '31032', deptName: '普陀分校' },
    { deptId: '31034', deptName: '西南进修学院分校' },
    { deptId: '31036', deptName: '浦东西校' },
    { deptId: '31039', deptName: '商业分校' },
    { deptId: '31043', deptName: '时尚学院' },
    { deptId: '31045', deptName: '工程大分校' },
    { deptId: '31058', deptName: '贸易学校教学点' },
    { deptId: '31065', deptName: '邮电分校' },
    { deptId: '31069', deptName: '新知教学点' },
    { deptId: '31070', deptName: '旅游局教学点' },
    { deptId: '31074', deptName: '泽达进修学院' },
    { deptId: '31075', deptName: '交大昂立分校' },
    { deptId: '31086', deptName: '外经贸分校' },
    { deptId: '31087', deptName: '慧承文化进修学院' },
    { deptId: '31088', deptName: '徐汇财贸分校' },
    { deptId: '31089', deptName: '建设分校' },
    { deptId: '31092', deptName: '静安分校' },
    { deptId: '31093', deptName: '徐汇分校' },
    { deptId: '31097', deptName: '石化工业学校培训中心教学点' },
    { deptId: '31057', deptName: '沪东中华进修学院教学点 ' },
  ];

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
        this.deptId +
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
          // console.log(this.listOfData);
        },
      );
  }

  filter(event: any): void {
    console.log(event);
    this.deptId = event;
    this.loadInfo();
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

    this.modal.create(StepProcessTbjcFxWzfileditEditComponent, { dataValue }, { size: 'xl' }).subscribe((res: any) => {
      this.loadInfo();
    });
  }

  // -------------------------------------------
  // 指标内涵说明
  openInxcoments(record: any) {
    this.modal.create(StepProcessTbjcFxFileInxCommentComponent, { record }, { size: 'lg' }).subscribe((res: any) => {});
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
