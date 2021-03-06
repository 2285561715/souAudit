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
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { resolve } from 'q';

@Component({
  selector: 'app-sysdata-authlist-udrawer',
  templateUrl: './udrawer.component.html',
  styleUrls: ['./udrawer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SysdataAuthlistUdrawerComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    // private settingService: SettingsService,
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

  tempDCK: any[] = [];
  tempNode: any[] = [];

  ngOnInit() {
    this.loadInfo();
    // console.log(this.settingService.user);
  }

  loadInfo(): void {
    zip(this.http.get('/api/units/' + this.value), this.http.get('/api/menus/tree'))
      .pipe(
        catchError(([sysUnits, mTree]) => {
          resolve(null);
          return [sysUnits, mTree];
        }),
      )
      .subscribe(
        ([sysUnits, mTree]) => {
          this.tempDCK = sysUnits;
          this.tempNode = mTree.menu;
        },
        () => {},
        () => {
          this.defaultCheckedKeys = this.tempDCK;
          // console.log(this.defaultCheckedKeys);
          this.nodes = this.tempNode;
          // console.log(this.nodes);
          this.cdr.detectChanges();
        },
      );
  }

  nzEvent(event: NzFormatEmitEvent): void {
    this.treeCheckList = event.keys;
    this.cdr.detectChanges();
  }

  submitTree(): void {
    const unitdata: any = {};
    unitdata.unitNo = this.value;
    unitdata.menuKeys = this.treeCheckList;

    this.http.post('/api/units/grant', unitdata).subscribe((res: any) => {
      this.msgSrv.success('权限设置成功！');
      this.close();
    });
  }

  close(): void {
    this.drawerRef.close(this.value);
  }
}
