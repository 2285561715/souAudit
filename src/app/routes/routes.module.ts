import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardDataUpZxComponent } from './dashboard/dataupzx.component';
import { DashboardDataUpFxComponent } from './dashboard/dataupfx.component';
import { DashboardFileUpComponent } from './dashboard/fileup.component';
// --数据填报
import { DashboardDataUpZxSjtbComponent } from './dashboard/dataup/zxsjtb.component';
import { DashboardDataUpZxtb011IndexComponent } from './dashboard/dataup/zxtb01-1/index.component';
import { DashboardDataUpZxtb012IndexComponent } from './dashboard/dataup/zxtb01-2/index.component';
import { DashboardDataUpZxtb013IndexComponent } from './dashboard/dataup/zxtb01-3/index.component';
import { DashboardDataUpZxtbK07IndexComponent } from './dashboard/dataup/zxtbk07/index.component';
import { DashboardDataUpZxtbK08IndexComponent } from './dashboard/dataup/zxtbk08/index.component';
import { DashboardDataUpZxtbK10IndexComponent } from './dashboard/dataup/zxtbk10/index.component';
import { DashboardDataUpZxtbK11IndexComponent } from './dashboard/dataup/zxtbk11/index.component';
import { DashboardDataUpZxtbK141IndexComponent } from './dashboard/dataup/zxtbk14-1/index.component';
import { DashboardDataUpZxtbK142IndexComponent } from './dashboard/dataup/zxtbk14-2/index.component';
// -- 文字资料上传
import { DashboardFileUpZxWzclComponent } from './dashboard/fileup/zxwzcl.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
// auditstep datasynchshow
// import { AuditstepAdProcessViewDataSynchComponent } from './auditstep/ad-process/view/datasynch.component';
import { AuditstepAdProcessViewDataSynchShowComponent } from './auditstep/ad-process/view/datasynchshow.component';

const COMPONENTS = [
  DashboardComponent,
  // passport pages
  UserLoginComponent,
  UserRegisterComponent,
  UserRegisterResultComponent,
  // auditstep datasynchshow
  AuditstepAdProcessViewDataSynchShowComponent,

  // single pages
  CallbackComponent,
  UserLockComponent,
];
const COMPONENTS_NOROUNT = [
  DashboardDataUpZxComponent,
  DashboardDataUpFxComponent,
  DashboardFileUpComponent,
  // --数据填报
  DashboardDataUpZxSjtbComponent,
  DashboardDataUpZxtb011IndexComponent,
  DashboardDataUpZxtb012IndexComponent,
  DashboardDataUpZxtb013IndexComponent,
  DashboardDataUpZxtbK07IndexComponent,
  DashboardDataUpZxtbK08IndexComponent,
  DashboardDataUpZxtbK10IndexComponent,
  DashboardDataUpZxtbK11IndexComponent,
  DashboardDataUpZxtbK141IndexComponent,
  DashboardDataUpZxtbK142IndexComponent,
  // --文字材料上传
  DashboardFileUpZxWzclComponent,
];

@NgModule({
  imports: [SharedModule, RouteRoutingModule, NzIconModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class RoutesModule {}
