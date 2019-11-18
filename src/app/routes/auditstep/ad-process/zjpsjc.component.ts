import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { NzMessageService, NzModalService, NzModalRef, NzDrawerService } from 'ng-zorro-antd';

import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { resolve } from 'q';

@Component({
  selector: 'app-auditstep-ad-process-zjpsjc',
  templateUrl: './zjpsjc.component.html',
})
export class AuditstepAdProcessZjpsjcComponent implements OnInit {
  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private modalService: NzModalService,
    private drawerService: NzDrawerService,
  ) {}

  listOfData: any[] = [];
  listOfselectChk: any[] = [];
  listOfUserList: any[] = [];
  data: any = [];

  ngOnInit() {
    this.loadInfo();
  }

  loadInfo(): void {
    this.http.get('/api/stepwbs/zjz?appId=' + this.data.id + '&stepId=' + this.data.stepId).subscribe((res: any[]) => {
      this.listOfData = res;

      this.cdr.detectChanges();
    });
  }
}
