import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService, NzModalService, NzDrawerService } from 'ng-zorro-antd';

import { SysdataZxSynchdatatableEditComponent } from './edit/edit.component';
import { SysdataZxSynchdatatableViewComponent } from './view/view.component';

@Component({
  selector: 'app-sysdata-zx-synchdatatable',
  templateUrl: './zx-synchdatatable.component.html',
})
export class SysdataZxSynchdatatableComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    private modalService: NzModalService,
    private drawerService: NzDrawerService, // private activatedRoute: ActivatedRoute, // private routeInfo: ActivatedRoute,
  ) {}

  mapOfExpandData: { [key: string]: boolean } = {};
  listOfData: any[] = [];
  visible = false;
  value: string;

  ngOnInit() {
    // this.dtType = this.routeInfo.snapshot.params.dtType;
    this.loadInfo();
  }
  loadInfo(): void {
    this.http.get('/api/data/tables?dtType=zxcj').subscribe((res: any[]) => {
      this.listOfData = res;
      this.cdr.detectChanges();
    });
  }

  editInfo(record: any[]) {
    this.modal.create(SysdataZxSynchdatatableEditComponent, { record }, { size: 'xl' }).subscribe((res: any) => {
      this.loadInfo();
    });
  }

  viewInfo(record: any[]) {
    this.modal.create(SysdataZxSynchdatatableViewComponent, { record }, { size: 'xl' }).subscribe((res: any) => {
      this.loadInfo();
    });
  }

  // deleteConfirm(id: number): void {
  //   this.modalService.confirm({
  //     nzTitle: '<i>是否要删除数据</i>',
  //     nzContent: '<b>删除数据后无法恢复，确认要删除？</b>',
  //     nzOnOk: () => this.deleteInfo(id),
  //   });
  // }

  // deleteInfo(id: number) {
  //   this.http.delete('/api/users/' + id).subscribe((res: any) => {
  //     this.msgSrv.success('删除用户成功');
  //     this.cdr.detectChanges();
  //     this.loadInfo();
  //   });
  // }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
