import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardDataUpZxComponent } from './dashboard/dataupzx.component';
import { DashboardDataUpFxComponent } from './dashboard/dataupfx.component';
import { DashboardFileUpZxComponent } from './dashboard/fileupzx.component';
import { DashboardFileUpFxComponent } from './dashboard/fileupfx.component';
// --总校数据填报
import { DashboardDataUpZxSjtbComponent } from './dashboard/dataup/zxsjtb.component';
import { DashboardDataUpZxtbK01IndexComponent } from './dashboard/dataup/zxtbk01/index.component';
import { DashboardDataUpZxtbK04IndexComponent } from './dashboard/dataup/zxtbk04/index.component';
import { DashboardDataUpZxtbK06IndexComponent } from './dashboard/dataup/zxtbk06/index.component';
import { DashboardDataUpZxtbK07IndexComponent } from './dashboard/dataup/zxtbk07/index.component';
import { DashboardDataUpZxtbK08IndexComponent } from './dashboard/dataup/zxtbk08/index.component';
import { DashboardDataUpZxtbK09IndexComponent } from './dashboard/dataup/zxtbk09/index.component';
import { DashboardDataUpZxtbK10IndexComponent } from './dashboard/dataup/zxtbk10/index.component';
import { DashboardDataUpZxtbK11IndexComponent } from './dashboard/dataup/zxtbk11/index.component';
import { DashboardDataUpZxtbK121IndexComponent } from './dashboard/dataup/zxtbk12-1/index.component';
import { DashboardDataUpZxtbK122IndexComponent } from './dashboard/dataup/zxtbk12-2/index.component';
import { DashboardDataUpZxtbK13IndexComponent } from './dashboard/dataup/zxtbk13/index.component';
import { DashboardDataUpZxtbK141IndexComponent } from './dashboard/dataup/zxtbk14-1/index.component';
import { DashboardDataUpZxtbK142IndexComponent } from './dashboard/dataup/zxtbk14-2/index.component';
import { DashboardDataUpZxtbK15IndexComponent } from './dashboard/dataup/zxtbk15/index.component';
import { DashboardDataUpZxtbK16IndexComponent } from './dashboard/dataup/zxtbk16/index.component';
import { DashboardDataUpZxtbK17IndexComponent } from './dashboard/dataup/zxtbk17/index.component';
import { DashboardDataUpZxtbK20IndexComponent } from './dashboard/dataup/zxtbk20/index.component';
import { DashboardDataUpZxtbK21IndexComponent } from './dashboard/dataup/zxtbk21/index.component';
import { DashboardDataUpZxtbK23IndexComponent } from './dashboard/dataup/zxtbk23/index.component';
import { DashboardDataUpZxtbK27IndexComponent } from './dashboard/dataup/zxtbk27/index.component';
import { DashboardDataUpZxtbK28IndexComponent } from './dashboard/dataup/zxtbk28/index.component';
import { DashboardDataUpZxtbK30IndexComponent } from './dashboard/dataup/zxtbk30/index.component';
import { DashboardDataUpZxtbK31IndexComponent } from './dashboard/dataup/zxtbk31/index.component';
// 分校数据填报
import { DashboardDataUpFxSjtbComponent } from './dashboard/dataupfx/fxsjtb.component';
import { DashboardDataUpFxtbK01IndexComponent } from './dashboard/dataupfx/fxtbk01/index.component';
import { DashboardDataUpFxtbK04IndexComponent } from './dashboard/dataupfx/fxtbk04/index.component';
import { DashboardDataUpFxtbK09IndexComponent } from './dashboard/dataupfx/fxtbk09/index.component';
import { DashboardDataUpFxtbK10IndexComponent } from './dashboard/dataupfx/fxtbk10/index.component';
import { DashboardDataUpFxtbK21IndexComponent } from './dashboard/dataupfx/fxtbk21/index.component';
import { DashboardDataUpFxtbK23IndexComponent } from './dashboard/dataupfx/fxtbk23/index.component';
// -- 文字资料上传
import { DashboardFileUpZxWzclComponent } from './dashboard/fileup/zxwzcl.component';
import { DashboardFileUpFxWzclComponent } from './dashboard/fileup/fxwzcl.component';
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
  DashboardFileUpZxComponent,
  DashboardFileUpFxComponent,
  // --总校数据填报
  DashboardDataUpZxSjtbComponent,
  DashboardDataUpZxtbK01IndexComponent,
  DashboardDataUpZxtbK04IndexComponent,
  DashboardDataUpZxtbK06IndexComponent,
  DashboardDataUpZxtbK07IndexComponent,
  DashboardDataUpZxtbK08IndexComponent,
  DashboardDataUpZxtbK09IndexComponent,
  DashboardDataUpZxtbK10IndexComponent,
  DashboardDataUpZxtbK11IndexComponent,
  DashboardDataUpZxtbK121IndexComponent,
  DashboardDataUpZxtbK122IndexComponent,
  DashboardDataUpZxtbK13IndexComponent,
  DashboardDataUpZxtbK141IndexComponent,
  DashboardDataUpZxtbK142IndexComponent,
  DashboardDataUpZxtbK15IndexComponent,
  DashboardDataUpZxtbK16IndexComponent,
  DashboardDataUpZxtbK17IndexComponent,
  DashboardDataUpZxtbK20IndexComponent,
  DashboardDataUpZxtbK21IndexComponent,
  DashboardDataUpZxtbK23IndexComponent,
  DashboardDataUpZxtbK27IndexComponent,
  DashboardDataUpZxtbK28IndexComponent,
  DashboardDataUpZxtbK30IndexComponent,
  DashboardDataUpZxtbK31IndexComponent,
  // --分校数据填报
  DashboardDataUpFxSjtbComponent,
  DashboardDataUpFxtbK01IndexComponent,
  DashboardDataUpFxtbK04IndexComponent,
  DashboardDataUpFxtbK09IndexComponent,
  DashboardDataUpFxtbK10IndexComponent,
  DashboardDataUpFxtbK21IndexComponent,
  DashboardDataUpFxtbK23IndexComponent,
  // --文字材料上传
  DashboardFileUpZxWzclComponent,
  DashboardFileUpFxWzclComponent,
];

@NgModule({
  imports: [SharedModule, RouteRoutingModule, NzIconModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class RoutesModule {}
