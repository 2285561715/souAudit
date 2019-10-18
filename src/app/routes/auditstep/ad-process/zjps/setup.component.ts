import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { NzMessageService, NzModalService, NzModalRef, NzDrawerService } from 'ng-zorro-antd';

import { AuditstepAdProcessZjpsZjzPsfxComponent } from './zjzpsfx/zjzpsfx.component';
import { AuditstepAdProcessZjpsZjzPszbComponent } from './zjzpszb/zjzpszb.component';
import { AuditstepAdProcessZjpsZjzUserComponent } from './zjzuser/zjzuser.component';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { resolve } from 'q';

@Component({
  selector: 'app-auditstep-ad-process-zjps-setup',
  templateUrl: './setup.component.html',
})
export class AuditstepAdProcessZjpsSetupComponent implements OnInit {
  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private modalService: NzModalService,
    private drawerService: NzDrawerService,
  ) {}

  i: any;
  schema: SFSchema = {
    properties: {
      zjzName: { type: 'string', title: '新增专家组名称' },
    },
    required: ['zjzName'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 250,
      grid: { span: 16 },
    },
    $zjzName: {
      widget: 'string',
      grid: { span: 16 },
    },
  };

  listOfData: any[] = [];
  listOfselectChk: any[] = [];

  listOfUserList: any[] = [];

  data: any = [];

  ngOnInit() {
    this.i = 1;
    this.loadInfo();
  }

  loadInfo(): void {
    this.http.get('/api/stepwbs/zjz?appId=' + this.data.id + '&stepId=' + this.data.stepId).subscribe((res: any[]) => {
      this.listOfData = res;

      this.cdr.detectChanges();
    });
  }

  zjzSetUser(record: any): void {
    const drawerRef = this.drawerService.create<AuditstepAdProcessZjpsZjzUserComponent, { value: string }, string>({
      nzTitle: '【' + record.zjzName + '】专家组成员设置',
      nzWidth: 400,
      nzPlacement: 'left',
      nzMaskClosable: false,
      // nzClosable: false,
      nzContent: AuditstepAdProcessZjpsZjzUserComponent,
      nzContentParams: {
        // value: this.value,
        value: record.id,
      },
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      console.log('关闭=' + data);
      if (typeof data === 'string') {
        // this.value = data;
      }
    });
  }
  // --------------------------------------------------------------------------------------------
  zjzSetPszb(record: any): void {
    const drawerRef = this.drawerService.create<AuditstepAdProcessZjpsZjzPszbComponent, { value: string }, string>({
      nzTitle: '【' + record.zjzName + '】对应评审指标设置',
      nzWidth: 400,
      nzPlacement: 'left',
      nzMaskClosable: false,
      // nzClosable: false,
      nzContent: AuditstepAdProcessZjpsZjzPszbComponent,
      nzContentParams: {
        // value: this.value,
        value: record.id + '=' + this.data.verIndex,
      },
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      console.log('关闭=' + data);
      if (typeof data === 'string') {
        // this.value = data;
      }
    });
  }
  // --------------------------------------------------------------------------------------------
  zjzSetPsfx(record: any): void {
    const drawerRef = this.drawerService.create<AuditstepAdProcessZjpsZjzPsfxComponent, { value: string }, string>({
      nzTitle: '【' + record.zjzName + '】对应评审分校设置',
      nzWidth: 400,
      nzPlacement: 'left',
      nzMaskClosable: false,
      // nzClosable: false,
      nzContent: AuditstepAdProcessZjpsZjzPsfxComponent,
      nzContentParams: {
        // value: this.value,
        value: record.id,
      },
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      console.log('关闭=' + data);
      if (typeof data === 'string') {
        // this.value = data;
      }
    });
  }
  // --------------------------------------------------------------------------------------------
  deleteConfirm(id: number): void {
    this.modalService.confirm({
      nzTitle: '<i>是否要删除数据</i>',
      nzContent: '<b>删除数据后无法恢复，确认要删除？</b>',
      nzOnOk: () => this.deleteInfo(id),
    });
  }

  deleteInfo(id: number) {
    this.http.delete('/api/stepwbs/zjz/' + id).subscribe((res: any) => {
      this.msgSrv.success('删除专家组成功');
      this.cdr.detectChanges();
      this.loadInfo();
    });
  }

  save(value: any) {
    value.appId = this.data.id;
    value.stepId = this.data.stepId;
    value.stepName = this.data.stepName;

    this.http.post(`/api/stepwbs/zjz`, value).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.cdr.detectChanges();
      this.loadInfo();
    });
  }
}
