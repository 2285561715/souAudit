import { NzMessageService, NzModalService, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { AuditstepAdProcessTbjcFxIndexFileComponent } from './indexfile.component';

@Component({
  selector: 'app-auditstep-adprocess-tbjcfx-file-dept',
  templateUrl: './filedept.component.html',
})
export class AuditstepAdProcessTbjcFxFileDeptIndexComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    private drawerService: NzDrawerService,
    private modalService: NzModalService,
    private drawerRef: NzDrawerRef<string>,
  ) {}

  value: any = {};
  listOfData: any[] = [];

  ngOnInit() {
    this.http.get('/api/branches').subscribe((ress: any[]) => {
      this.listOfData = ress;
      this.cdr.detectChanges();
    });
  }

  fxFileProcess(record: any): void {
    const datavalue = this.value;
    datavalue.deptId = record.bno;
    datavalue.deptName = record.bname;
    const drawerRef = this.drawerService.create<AuditstepAdProcessTbjcFxIndexFileComponent, { value: any }, string>({
      nzTitle: '分校【<b>' + record.bname + '</b>】 文字材料上传情况',
      nzWidth: document.body.clientWidth - 500,
      nzPlacement: 'left',
      nzContent: AuditstepAdProcessTbjcFxIndexFileComponent,
      nzContentParams: {
        value: datavalue,
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

  close(res: any): void {
    this.drawerRef.close(res);
  }
}
