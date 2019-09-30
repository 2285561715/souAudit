import { Component, OnInit, Input, TemplateRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';
import {
  NzFormatEmitEvent,
  NzDrawerRef,
  NzDrawerService,
  NzMessageService,
  NzModalService,
  NzModalRef,
} from 'ng-zorro-antd';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sysdata-zpwd',
  templateUrl: './zpwd.component.html',
})
export class SysdataZpwdComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private modal: ModalHelper,
    private drawerService: NzDrawerService,
    private msgSrv: NzMessageService,
    private modalService: NzModalService,
    public loadUser: SettingsService,
    private fb: FormBuilder,
  ) {}

  validateForm: FormGroup;

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      currentPassword: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
    });
  }

  loadInfo(): void {
    console.log(this.loadUser.user);
  }

  submitForm(): void {
    // console.log(this.loadUser.user);

    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    const data = this.validateForm.value;
    data.modType = 'up';
    data.userId = this.loadUser.user.id;
    data.newPassword = data.password;

    console.log(data);

    this.http.post('/account/password', data).subscribe((res: any) => {
      this.msgSrv.success('修改密码成功，请记住新密码：' + data.password);
    });
  }

  // --------------------------------------------
}
