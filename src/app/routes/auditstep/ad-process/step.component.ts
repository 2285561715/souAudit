import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';

import { AuditstepAdProcessViewDataSynchComponent } from './view/datasynch.component';
import { AuditstepAdProcessZjpsSetupComponent } from './zjps/setup.component';
import { AuditstepAdProcessSetFxComponent } from './setfx/setfx.component';
import { AuditstepAdProcessTbjcZxIndexComponent } from './tbjczx/index.component';
import { AuditstepAdProcessTbjcFxIndexComponent } from './tbjcfx/index.component';

@Component({
  selector: 'app-auditstep-ad-process-step',
  templateUrl: './step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditstepAdProcessStepComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    private drawerService: NzDrawerService,
    private modalService: NzModalService,
  ) {}

  value: any = [];
  listOfAppStep: any = [];

  ngOnInit() {
    this.loadSteps();
  }

  loadSteps(): void {
    this.listOfAppStep = '';
    this.http.get('/api/adapply/steps?appId=' + this.value.id).subscribe((res: any) => {
      this.listOfAppStep = res;
      this.cdr.detectChanges();
    });
  }
  // 评估启动阶段，分校办学时评评估设置参与评审的分校，及分校参与评审的指标模块
  setBranchList(astep: any) {
    const drawerRef = this.drawerService.create<AuditstepAdProcessSetFxComponent, { value: any }, string>({
      nzTitle: '【' + this.value.appName + '】参评分校及其评估模块设置',
      nzWidth: 860,
      nzPlacement: 'left',
      nzMaskClosable: false,
      // nzClosable: false,
      nzContent: AuditstepAdProcessSetFxComponent,
      nzContentParams: {
        value: this.value,
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

  // 数据采集阶段查看同步的数据
  lookSjcjTable(astep: any) {
    const data = this.value;
    data.stepStartDate = astep.fromDate;
    data.stepEndDate = astep.endDate;
    data.stepId = astep.id;
    data.stepIsDone = astep.isDone;
    data.stepIsTaskOut = astep.isTaskOut;
    this.modal.create(AuditstepAdProcessViewDataSynchComponent, { data }, { size: 'xl' }).subscribe((res: any) => {});
  }

  // 数据表填报任务发布
  appSjtbConfirm(astep: any): void {
    this.modalService.confirm({
      nzTitle: '<i>数据表填报任务，时间周期：</i>',
      nzContent: '<b>' + astep.fromDate + '至' + astep.endDate + '</b>',
      nzOnOk: () => this.appSjtbTask(astep),
    });
  }
  appSjtbTask(astep: any) {
    const data: any = {};
    // data.stepStartDate = astep.fromDate;
    // data.stepEndDate = astep.endDate;
    data.verIndex = this.value.verIndex;
    data.appId = this.value.id;
    data.stepId = astep.id;
    data.stepName = astep.stepName;
    this.http.post('/api/stepwbs/depttbrw', data).subscribe((res: any) => {
      this.msgSrv.success('数据填报任务发布成功');
      this.loadSteps();
    });
  }

  // zx-查看总校数据填报进程
  zxSjtbProcess(record: any): void {
    const drawerRef = this.drawerService.create<AuditstepAdProcessTbjcZxIndexComponent, { value: any }, string>({
      nzTitle: '【' + record.stepName + '】 填报进程',
      nzWidth: document.body.clientWidth - 440,
      nzPlacement: 'left',
      nzContent: AuditstepAdProcessTbjcZxIndexComponent,
      nzContentParams: {
        value: record,
      },
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      if (typeof data === 'string') {
        this.value = data;
      }
    });
  }
  // fx-查看分校数据填报进程
  fxSjtbProcess(record: any): void {
    const drawerRef = this.drawerService.create<AuditstepAdProcessTbjcFxIndexComponent, { value: any }, string>({
      nzTitle: '【' + record.stepName + '】 填报进程',
      nzWidth: document.body.clientWidth - 440,
      nzPlacement: 'left',
      nzContent: AuditstepAdProcessTbjcFxIndexComponent,
      nzContentParams: {
        value: record,
      },
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      if (typeof data === 'string') {
        this.value = data;
      }
    });
  }
  // ----------------------------------------------------------------------------

  // 专家组设置、专家组设置
  zjzSet(astep: any) {
    const data = this.value;
    data.stepStartDate = astep.fromDate;
    data.stepEndDate = astep.endDate;
    data.stepId = astep.id;
    data.stepName = astep.stepName;
    data.stepIsTaskOut = astep.isTaskOut;
    this.modal.create(AuditstepAdProcessZjpsSetupComponent, { data }, { size: 'xl' }).subscribe((res: any) => {});
  }

  // close(res: any) {
  //   this.modal.close(res);
  // }
}
