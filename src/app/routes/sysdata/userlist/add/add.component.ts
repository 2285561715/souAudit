import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sysdata-userlist-add',
  templateUrl: './add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SysdataUserlistAddComponent implements OnInit {
  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
  ) {}

  validateForm: FormGroup;

  listOfDept: any[] = [];
  listOfBranch: any[] = [];
  listOfDB: any[] = [];
  listOfUnit: any[] = [];

  checkOptions = [{ label: '总校', value: 'zx' }, { label: '分校', value: 'fx' }];
  selectedUserFrom = 'zx';
  selectedDB = '';

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      unitNo: [null],
      // userFrom: [null],
      // bno: [null],
      bname: [null],
      mob: [null],
      offPhone: [null],
      email: [null, [Validators.email, Validators.required]],
      userNo: [null, [Validators.required]],
      status: [true],
    });
    this.loadInfo();
    // this.listOfDB = this.listOfDept;
  }

  loadInfo(): void {
    this.http.get('/api/departments').subscribe((res: any) => {
      this.listOfDept = res;
      this.listOfDB = this.listOfDept;
    });

    this.http.get('/api/units').subscribe((res: any) => {
      this.listOfUnit = res;
    });

    this.http.get('/api/branches').subscribe((res: any) => {
      this.listOfBranch = res;
    });
  }

  userFromChange(value: string): void {
    // this.selectedCity = this.cityData[value][0];
    this.listOfDB = value === 'fx' ? this.listOfBranch : this.listOfDept;
    this.selectedDB = this.listOfDB[0].value;
    this.selectedUserFrom = value;
  }

  deptFromChange(value: string): void {
    this.selectedDB = value;
  }

  submitForm(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    const data = this.validateForm.value;
    data.userFrom = this.selectedUserFrom;
    data.bno = this.selectedDB;

    this.listOfDB.forEach(element => {
      if (element.id === this.selectedDB) {
        data.bname = element.bname;
      }
    });

    this.listOfUnit.forEach(element => {
      if (element.unitNo === data.unitNo) {
        data.unitName = element.unitName;
      }
    });

    // this.userName.markAsDirty();
    //   this.userName.updateValueAndValidity();
    //   this.password.markAsDirty();
    //   this.password.updateValueAndValidity();
    //   if (this.userName.invalid || this.password.invalid) {
    //     return;
    //   }

    this.http.post('/api/users', data).subscribe((res: any) => {
      this.msgSrv.success('添加用户成功');
      this.close(res);
    });
  }

  close(res: any) {
    this.modal.close(res);
  }
}
