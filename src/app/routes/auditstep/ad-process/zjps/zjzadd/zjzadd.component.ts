import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-auditstep-ad-process-zjzadd',
  templateUrl: './zjzadd.component.html',
})
export class AuditstepAdProcessZjpsZjzAddComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    private modalService: NzModalService,
  ) {}
  listOfData: any[] = [];
  data: any[] = [];
  appId = 17;
  stepId = 23;
  stepName = '校内预评估';

  loadInfo(): void {
    this.http
      .get('http://139.224.62.102:8080/api/stepwbs/stepwbs/zjz?appId=' + this.appId + '&stepId=' + this.stepId)
      .subscribe((res: any[]) => {
        this.listOfData = res;
        console.log(this.listOfData);
        this.cdr.detectChanges();
      });
  }

  ngOnInit() {
    // console.log(this.data);
    this.loadInfo();
  }

  deleteConfirm(id: number): void {
    this.modalService.confirm({
      nzTitle: '<i>是否要删除数据</i>',
      nzContent: '<b>删除数据后无法恢复，确认要删除？</b>',
      nzOnOk: () => this.deleteInfo(id),
    });
  }

  deleteInfo(id: number) {
    // this.http.delete('http://139.224.62.102:8080/api/departments/' + id).subscribe((res: any) => {
    //   this.msgSrv.success('删除用户成功');
    //   this.cdr.detectChanges();
    //   this.loadInfo();
    // });
  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }
}
