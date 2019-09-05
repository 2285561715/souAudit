import { NzMessageService, NzDrawerRef, NzDrawerService, NzModalRef } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';

@Component({
  selector: 'app-dashboard-dataup',
  templateUrl: './dataup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDataUpComponent implements OnInit {
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
    // 可以传 conType='sjtb' or 'file'
    this.http.get('/api/deptrwcx?appId=' + this.value.id + '&deptId=' + this.value.deptId).subscribe((res: any) => {
      this.listOfAppStep = res;
      console.log(this.listOfAppStep);
      this.cdr.detectChanges();
    });
  }

  // 专家组设置、专家组设置
  dataUpFun(dt: any) {
    const data = this.value;
    data.dtNo = dt.dtNo;
    console.log(data);
    // this.modal.create(AuditstepAdProcessZjpsSetupComponent, { data }, { size: 'xl' }).subscribe((res: any) => {});
  }

  // close(res: any) {
  //   this.modal.close(res);
  // }
}
