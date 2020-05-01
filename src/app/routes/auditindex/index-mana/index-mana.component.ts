import { Component, OnInit, Input, TemplateRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzFormatEmitEvent, NzDrawerRef, NzDrawerService, NzMessageService, NzModalService } from 'ng-zorro-antd';

import { AuditindexIndexManaProfileViewComponent } from './profile/view.component';
import { AuditindexIndexManaXdrawerComponent } from './xdrawer/xdrawer.component';

@Component({
  selector: 'app-auditindex-index-mana',
  templateUrl: './index-mana.component.html',
  styleUrls: ['./index-mana.component.less'],
})
export class AuditindexIndexManaComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private modal: ModalHelper,
    private drawerService: NzDrawerService,
    private msgSrv: NzMessageService,
    private modalService: NzModalService,
  ) {}

  mapOfExpandData: { [key: string]: boolean } = {};
  listOfData: any[] = [];
  value: string;

  ngOnInit() {
    this.loadInfo();
  }

  loadInfo(): void {
    this.http.get('/api/main/infos').subscribe((res: any[]) => {
      this.listOfData = res;
      this.cdr.detectChanges();
    });
  }

  deleteConfirm(id: number): void {
    this.modalService.confirm({
      nzTitle: '<i>是否要删除数据</i>',
      nzContent: '<b>删除数据后无法恢复，确认要删除？</b>',
      nzOnOk: () => this.deleteInfo(id),
    });
  }

  deleteInfo(id: number) {
    this.http.delete('/api/main/infos/' + id).subscribe((res: any) => {
      this.msgSrv.success('删除用户成功');
      this.cdr.detectChanges();
      this.loadInfo();
    });
  }

  // 打开指标的抽屉
  openComponent(record: any): void {
    const subData = {
      verIndex: record.verIndex,
      esName: record.esName,
    };
    const drawerRef = this.drawerService.create<AuditindexIndexManaXdrawerComponent, { value: any }, string>({
      nzTitle: record.esName,
      nzWidth: 520,
      nzPlacement: 'left',
      nzMaskClosable: false,
      // nzClosable: false,
      nzContent: AuditindexIndexManaXdrawerComponent,
      nzContentParams: {
        // value: this.value,
        // value: record.verIndex,
        value: subData,
      },
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      console.log('关闭=' + data);
      if (typeof data === 'string') {
        this.value = data;
      }
    });
  }

  // 打开内涵观测点预览抽屉
  openProfile(record: any): void {
    const subData = {
      verIndex: record.verIndex,
      esName: record.esName,
    };

    const drawerRef = this.drawerService.create<AuditindexIndexManaProfileViewComponent, { value: any }, string>({
      nzTitle: '【' + record.esName + '】 指标内涵及观测点',
      nzWidth: 1280,
      nzPlacement: 'left',
      nzMaskClosable: false,
      nzContent: AuditindexIndexManaProfileViewComponent,
      nzContentParams: {
        value: subData,
      },
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      console.log('关闭=' + data);
      if (typeof data === 'string') {
        this.value = data;
      }
    });
  }

  nzEvent(event: NzFormatEmitEvent): void {}
}
