import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { AuditstepAdProcessViewDataSynchComponent } from './view/datasynch.component';
import { AuditstepAdProcessZjpsSetupComponent } from './zjps/setup.component';

@Component({
  selector: 'app-auditstep-ad-process-step',
  templateUrl: './step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditstepAdProcessStepComponent implements OnInit {
  modalService: any;
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    private drawerRef: NzDrawerRef<string>,
  ) {}

  value: any = [];
  listOfAppStep: any = [];

  ngOnInit() {
    this.loadSteps();
    // console.log('value=');
    // console.log(this.value);
  }

  loadSteps(): void {
    this.http.get('/api/adapply/steps?appId=' + this.value.id).subscribe((res: any) => {
      this.listOfAppStep = res;
      this.cdr.detectChanges();
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
    console.log(astep);
    const data: any = {};
    // data.stepStartDate = astep.fromDate;
    // data.stepEndDate = astep.endDate;
    data.verIndex = this.value.verIndex;
    data.appId = this.value.id;
    data.stepId = astep.id;
    data.stepName = astep.stepName;
    console.log(data);
    this.http.post('/api/stepwbs/depttbrw', data).subscribe((res: any) => {
      this.msgSrv.success('数据填报任务发布成功');
      // this.close(res);
    });
  }

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
