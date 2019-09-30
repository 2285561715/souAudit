import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { _HttpClient, ModalHelper, SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';

import { HeaderStorageComponent } from './storage.component';

@Component({
  selector: 'header-user',
  template: `
    <nz-dropdown nzPlacement="bottomRight">
      <div class="alain-default__nav-item d-flex align-items-center px-sm" nz-dropdown>
        <nz-avatar [nzSrc]="settings.user.avatar" nzSize="small" class="mr-sm"></nz-avatar>
        {{ settings.user.name }}
      </div>

      <div nz-menu class="width-sm">
        <div nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          退出登录
        </div>
      </div>
    </nz-dropdown>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderUserComponent {
  constructor(
    public settings: SettingsService,
    private router: Router,
    private modal: ModalHelper,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {}

  logout() {
    this.tokenService.clear();
    this.router.navigateByUrl(this.tokenService.login_url!);
  }

  logPwd() {
    // <div nz-menu class="width-sm">
    //     <div nz-menu-item (click)="logPwd()">
    //       <i nz-icon nzType="user" class="mr-sm"></i>
    //       修改密码
    //     </div>
    //   </div>
    this.modal.create(HeaderStorageComponent, { size: 'md' }).subscribe((res: any) => {
      console.log('success add user');
    });
  }
}
