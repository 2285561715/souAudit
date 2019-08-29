import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-auditindex-index-mana-xdrawer-idmore',
  templateUrl: './idmore.component.html',
  styleUrls: ['./idmore.component.less'],
})
export class AuditindexIndexManaXdrawerIdmoreComponent implements OnInit {
  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
  ) {}

  current = 0;
  validateForm: FormGroup;
  activeNode: any = {};
  // indexesTempValue: Observable<any>;
  indexesTempValue = [];
  // listOfDept = [];
  listOfDept = [];
  listOfSelectedDept = []; // dutyDept数据库查询初始值
  formatterPercent = (value: number) => `${value} %`;
  parserPercent = (value: string) => value.replace(' %', '');

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      remark: [null, [Validators.required]],
      dutyDept: [null, [Validators.required]],
      auditDesc: [null, [Validators.required]],
      indexRatio: [null, [Validators.required]],
      reportModel: [null],
    });
    this.loadRemark();
  }

  loadInfo(): void {
    // console.group('print indexesTempValue');
    // console.log(this.indexesTempValue.dutyDept);
    // console.groupEnd();
    // ---------------------------------
    const children: Array<{ id: number; status: boolean; bno: string; bname: string }> = [];
    if (this.activeNode.verIndex.substring(4, 6) === 'zx') {
      // 第一步：总校的加载总校部门
      this.http.get('/api/departments').subscribe((res: any) => {
        this.listOfDept = res;
        this.listOfDept.push({ id: 1, status: true, bno: 'fx', bname: '分校' });
      });
      // 加载 end------------------------------------------
    } else {
      // 分校的不加载部门，只显示一个分校
      children.push({ id: 1, status: true, bno: 'fx', bname: '分校评估无需选择部门' });
      this.listOfDept = children;
      // 加载 end------------------------------------------
    }
    this.cdr.detectChanges();
  }

  loadRemark(): void {
    this.http.get('/api/indexes/remark/' + this.activeNode.key).subscribe((res: any) => {
      // 组件初始化赋值
      this.validateForm.controls.remark.setValue(res.remark);
      this.validateForm.controls.auditDesc.setValue(res.auditDesc);
      this.validateForm.controls.indexRatio.setValue(res.indexRatio);
      this.validateForm.controls.reportModel.setValue(res.reportModel);
      this.indexesTempValue = res;
      // console.log(res.dutyDept);
      res.dutyDept.forEach(dept => {
        this.listOfSelectedDept.push(parseInt(dept, 10));
      });
      this.loadInfo();
    });
    this.cdr.detectChanges();
  }

  esFromChange(value: any): void {
    // console.log(value);
    this.listOfSelectedDept = value;
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        document.getElementById('stepAct1').style.display = 'block';
        document.getElementById('stepAct2').style.display = 'none';
        document.getElementById('stepAct3').style.display = 'none';

        break;
      }
      case 1: {
        document.getElementById('stepAct1').style.display = 'none';
        document.getElementById('stepAct2').style.display = 'block';
        document.getElementById('stepAct3').style.display = 'none';
        break;
      }
      case 2: {
        document.getElementById('stepAct1').style.display = 'none';
        document.getElementById('stepAct2').style.display = 'none';
        document.getElementById('stepAct3').style.display = 'block';
        break;
      }
      default: {
        // do nothing;
      }
    }
  }

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  stepClick(cIndex: number) {
    this.current = cIndex;
    this.changeContent();
  }

  done(): void {
    console.log(this.validateForm.value);
    console.log('done');
  }

  submitForm(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    const data = this.validateForm.value;
    data.id = this.activeNode.key;
    data.dutyDept = this.listOfSelectedDept;
    console.log(data);

    this.http.put(`/api/indexes`, data).subscribe((res: any) => {
      this.msgSrv.success('修改信息成功');
      this.close(res);
    });
  }

  close(res: any) {
    this.modal.close(res);
  }
}
