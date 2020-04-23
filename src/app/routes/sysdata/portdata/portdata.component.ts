import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { DomSanitizer } from '@angular/platform-browser';

// import { HttpClient } from '@delon/theme';
import { NzMessageService, NzModalService, NzDrawerService } from 'ng-zorro-antd';
import { SysdataPortDataAddComponent } from './add/add.component';
import { SysdataPortDataEditComponent } from './edit/edit.component';
import { HttpResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-sysdata-portdata',
  templateUrl: './portdata.component.html',
})
export class SysdataPortDataComponent implements OnInit {
  dtType: string;
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    private modalService: NzModalService,
    private sanitizer: DomSanitizer,
    private drawerService: NzDrawerService, // private activatedRoute: ActivatedRoute, // private routeInfo: ActivatedRoute,
  ) {}

  mapOfExpandData: { [key: string]: boolean } = {};
  listOfData: any[] = [];
  parmOfSql: any = {};

  delData: any = {};

  visible = false;
  value: string;

  ngOnInit() {
    this.loadInfo();
  }

  loadInfo(): void {
    // this.description = this.sanitizer.bypassSecurityTrustHtml(this.listOfTableDesc.descRules);

    this.parmOfSql = {
      tableName: 'sj_dataports',
      fieldList: ['id', 'es_type', 'port_type', 'port_no', 'port_name', 'remark', 'mod_time'],
      predication: " es_type='整体办学水平评估' ",
      orderFieldList: ['id'],
      orderDirection: 'DESC',
    };
    this.http.post('/api/dynamic/search', this.parmOfSql).subscribe((res: any[]) => {
      this.listOfData = res;
      this.cdr.detectChanges();
    });
  }

  addInfo() {
    this.modal.create(SysdataPortDataAddComponent, { size: 'md' }).subscribe((res: any) => {
      console.log('success add user');
      this.loadInfo();
    });
  }

  editInfo(record: any[]) {
    this.modal.create(SysdataPortDataEditComponent, { record }, { size: 'lg' }).subscribe((res: any) => {
      this.loadInfo();
    });
  }

  deleteConfirm(id: number): void {
    this.modalService.confirm({
      nzTitle: '<i>是否要删除数据</i>',
      nzContent: '<b>删除数据后无法恢复，确认要删除？</b>',
      nzOnOk: () => this.deleteInfo(id),
    });
  }

  deleteInfo(id: number): void {
    const subData = {
      tableName: 'sj_dataports',
      predication: 'id=' + id,
    };
    this.http.request('delete', '/api/dynamic/delete', { body: subData }).subscribe((res: any) => {
      this.msgSrv.success('删除数据成功');
      this.loadInfo();
    });
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
