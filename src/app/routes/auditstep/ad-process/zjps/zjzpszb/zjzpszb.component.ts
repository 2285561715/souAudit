import {
  NzFormatEmitEvent,
  NzTreeComponent,
  NzTreeNodeOptions,
  NzMessageService,
  NzModalService,
  NzDrawerRef,
  NzDrawerService,
} from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { resolve } from 'q';

@Component({
  selector: 'app-auditstep-ad-process-zjzpszb',
  templateUrl: './zjzpszb.component.html',
  styleUrls: ['./zjzpszb.component.less'],
})
export class AuditstepAdProcessZjpsZjzPszbComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    private modalService: NzModalService,
    private drawerRef: NzDrawerRef<string>,
  ) {}

  treeCheckList: any[] = [];
  defaultCheckedKeys = [];
  defaultExpandedKeys = [];
  defaultSelectedKeys = [];

  nodes: any[] = [];
  value: string;
  zjzId: string;

  tempDCK: any[] = [];
  tempDCKeys: any[] = [];
  tempNode: any[] = [];

  ngOnInit() {
    // const valuestr = this.value.split('=');
    // this.zjzId = valuestr[0];
    // this.http.get('/api/stepwbs/zjz?id=' + valuestr[0]).subscribe((res: any) => {
    //   console.log('heelo');
    //   this.defaultCheckedKeys = res[0].indexIdList; // 默认checked
    //   console.log(this.defaultCheckedKeys);
    // });

    // this.http.get('/api/indexes/' + valuestr[1]).subscribe((res: any) => {
    //   this.nodes = res.nodes[0].children;
    //   console.log(this.nodes);
    //   this.cdr.detectChanges();
    // });
    this.loadInfo();
  }

  loadInfo(): void {
    const valuestr = this.value.split('=');
    this.zjzId = valuestr[0];
    zip(
      this.http.get('/api/stepwbs/zjz?id=' + valuestr[0]),
      this.http.get('/api/indexes/pszb/' + valuestr[1]),
    )
      .pipe(
        catchError(([zjzDusers, mTree]) => {
          resolve(null);
          return [zjzDusers, mTree];
        }),
      )
      .subscribe(
        ([zjzDusers, mTree]) => {
          this.tempDCK = zjzDusers[0].indexIdList;
          this.tempNode = mTree.nodes;
        },
        () => {},
        () => {
          this.defaultCheckedKeys = this.tempDCK;
          this.nodes = this.tempNode;
          console.log(this.nodes);
          this.cdr.detectChanges();
        },
      );
  }

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
    this.treeCheckList = event.keys;
    this.cdr.detectChanges();
    console.log(this.treeCheckList);
  }

  submitTree(): void {
    const zbdata: any = {};
    zbdata.id = this.zjzId;
    zbdata.indexIdList = this.treeCheckList;

    console.log(zbdata);

    this.http.put('/api/stepwbs/zjz', zbdata).subscribe((res: any) => {
      this.msgSrv.success('修改信息成功');
      this.cdr.detectChanges();
      this.close();
    });
  }

  close(): void {
    this.drawerRef.close();
  }
}
