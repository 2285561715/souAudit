import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { _HttpClient, SettingsService } from '@delon/theme';

@Component({
  selector: 'app-stepprocess-tbjcfx-fxtbb022-index',
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepProcessTbjcFxtbB022IndexComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    public loadUser: SettingsService,
  ) {}

  editCache: { [key: string]: any } = {};
  listOfData: any[] = [];
  value: any = {};

  @Input() dataStr: any;

  ngOnInit(): void {
    // 获得数据表的数据
    this.http.get('/api/data/tables/search/fxtb/' + this.dataStr.dtNo).subscribe((res: any[]) => {
      res.forEach(item => {
        if (item.xxdm === this.dataStr.deptId ) {
          item.id = item.id + '';
          this.listOfData = [...this.listOfData, item];
          this.editCache[item.id] = {
            edit: false,
            data: { ...item },
          };
        }
      });
      this.cdr.detectChanges();
    });
    // this.updateEditCache();
  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false,
    };
  }
  // 保存数据
  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    const data = this.editCache[id].data;

    // 登录用户部门id
    this.http
      .put(
        `/api/data/tables/entry?id=` +
          id +
          `&tableno=` +
          this.dataStr.dtNo +
          `&appId=` +
          this.dataStr.appId +
          `&stepId=` +
          this.dataStr.stepId +
          `&deptId=` +
          this.dataStr.deptId ,
        data,
      )
      .subscribe(res => {
        this.msgSrv.success('保存成功');
      });

    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }
}
