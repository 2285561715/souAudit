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
import { DashboardZjpsZxComponent } from './dashboard/zjpszx.component';
import { DashboardZjpsFxComponent } from './dashboard/zjpsfx.component';
import { DashboardZjpsdfZxpsComponent } from './dashboard/zjpsdf/zxps.component';
import { DashboardZjpsdfFxpsComponent } from './dashboard/zjpsdf/fxps.component';
import { DashboardZjpsdfDataBoardComponent } from './dashboard/zjpsdf/databoard.component';
// --总校数据填报
import { DashboardDataUpZxSjtbComponent } from './dashboard/dataup/zxsjtb.component';
import { DashboardDataUpZxtbK01IndexComponent } from './dashboard/dataup/zxtbk01/index.component';
import { DashboardDataUpZxtbK04IndexComponent } from './dashboard/dataup/zxtbk04/index.component';
import { DashboardDataUpZxtbK05IndexComponent } from './dashboard/dataup/zxtbk05/index.component';
import { DashboardDataUpZxtbK06IndexComponent } from './dashboard/dataup/zxtbk06/index.component';
import { DashboardDataUpZxtbK07IndexComponent } from './dashboard/dataup/zxtbk07/index.component';
import { DashboardDataUpZxtbK08IndexComponent } from './dashboard/dataup/zxtbk08/index.component';
import { DashboardDataUpZxtbK09IndexComponent } from './dashboard/dataup/zxtbk09/index.component';
import { DashboardDataUpZxtbK10IndexComponent } from './dashboard/dataup/zxtbk10/index.component';
import { DashboardDataUpZxtbK102IndexComponent } from './dashboard/dataup/zxtbk10-2/index.component';
import { DashboardDataUpZxtbK11IndexComponent } from './dashboard/dataup/zxtbk11/index.component';
import { DashboardDataUpZxtbK121IndexComponent } from './dashboard/dataup/zxtbk12-1/index.component';
import { DashboardDataUpZxtbK122IndexComponent } from './dashboard/dataup/zxtbk12-2/index.component';
import { DashboardDataUpZxtbK13IndexComponent } from './dashboard/dataup/zxtbk13/index.component';
import { DashboardDataUpZxtbK141IndexComponent } from './dashboard/dataup/zxtbk14-1/index.component';
import { DashboardDataUpZxtbK142IndexComponent } from './dashboard/dataup/zxtbk14-2/index.component';
import { DashboardDataUpZxtbK15IndexComponent } from './dashboard/dataup/zxtbk15/index.component';
import { DashboardDataUpZxtbK152IndexComponent } from './dashboard/dataup/zxtbk15-2/index.component';
import { DashboardDataUpZxtbK153IndexComponent } from './dashboard/dataup/zxtbk15-3/index.component';
import { DashboardDataUpZxtbK16IndexComponent } from './dashboard/dataup/zxtbk16/index.component';
import { DashboardDataUpZxtbK17IndexComponent } from './dashboard/dataup/zxtbk17/index.component';
import { DashboardDataUpZxtbK18IndexComponent } from './dashboard/dataup/zxtbk18/index.component';
import { DashboardDataUpZxtbK19IndexComponent } from './dashboard/dataup/zxtbk19/index.component';
import { DashboardDataUpZxtbK20IndexComponent } from './dashboard/dataup/zxtbk20/index.component';
import { DashboardDataUpZxtbK21IndexComponent } from './dashboard/dataup/zxtbk21/index.component';
import { DashboardDataUpZxtbK22IndexComponent } from './dashboard/dataup/zxtbk22/index.component';
import { DashboardDataUpZxtbK23IndexComponent } from './dashboard/dataup/zxtbk23/index.component';
import { DashboardDataUpZxtbK24IndexComponent } from './dashboard/dataup/zxtbk24/index.component';
import { DashboardDataUpZxtbK25IndexComponent } from './dashboard/dataup/zxtbk25/index.component';
import { DashboardDataUpZxtbK26IndexComponent } from './dashboard/dataup/zxtbk26/index.component';
import { DashboardDataUpZxtbK27IndexComponent } from './dashboard/dataup/zxtbk27/index.component';
import { DashboardDataUpZxtbK28IndexComponent } from './dashboard/dataup/zxtbk28/index.component';
import { DashboardDataUpZxtbK30IndexComponent } from './dashboard/dataup/zxtbk30/index.component';
import { DashboardDataUpZxtbK31IndexComponent } from './dashboard/dataup/zxtbk31/index.component';
import { DashboardDataUpZxtbK32IndexComponent } from './dashboard/dataup/zxtbk32/index.component';
import { DashboardDataUpZxtbK33IndexComponent } from './dashboard/dataup/zxtbk33/index.component';
// 分校数据填报
import { DashboardDataUpFxSjtbComponent } from './dashboard/dataupfx/fxsjtb.component';
import { DashboardDataUpFxtbB01IndexComponent } from './dashboard/dataupfx/fxtbb01/index.component';
import { DashboardDataUpFxtbB012IndexComponent } from './dashboard/dataupfx/fxtbb01-2/index.component';
import { DashboardDataUpFxtbB02IndexComponent } from './dashboard/dataupfx/fxtbb02/index.component';
import { DashboardDataUpFxtbB09IndexComponent } from './dashboard/dataupfx/fxtbb09/index.component';
import { DashboardDataUpFxtbB10IndexComponent } from './dashboard/dataupfx/fxtbb10/index.component';
import { DashboardDataUpFxtbB102IndexComponent } from './dashboard/dataupfx/fxtbb10-2/index.component';
import { DashboardDataUpFxtbB121IndexComponent } from './dashboard/dataupfx/fxtbb12-1/index.component';
import { DashboardDataUpFxtbB122IndexComponent } from './dashboard/dataupfx/fxtbb12-2/index.component';
import { DashboardDataUpFxtbB13IndexComponent } from './dashboard/dataupfx/fxtbb13/index.component';
import { DashboardDataUpFxtbB141IndexComponent } from './dashboard/dataupfx/fxtbb14-1/index.component';
import { DashboardDataUpFxtbB142IndexComponent } from './dashboard/dataupfx/fxtbb14-2/index.component';
import { DashboardDataUpFxtbB15IndexComponent } from './dashboard/dataupfx/fxtbb15/index.component';
import { DashboardDataUpFxtbB152IndexComponent } from './dashboard/dataupfx/fxtbb15-2/index.component';
import { DashboardDataUpFxtbB153IndexComponent } from './dashboard/dataupfx/fxtbb15-3/index.component';
import { DashboardDataUpFxtbB16IndexComponent } from './dashboard/dataupfx/fxtbb16/index.component';
import { DashboardDataUpFxtbB17IndexComponent } from './dashboard/dataupfx/fxtbb17/index.component';
import { DashboardDataUpFxtbB18IndexComponent } from './dashboard/dataupfx/fxtbb18/index.component';
import { DashboardDataUpFxtbB21IndexComponent } from './dashboard/dataupfx/fxtbb21/index.component';
import { DashboardDataUpFxtbB22IndexComponent } from './dashboard/dataupfx/fxtbb22/index.component';
import { DashboardDataUpFxtbB23IndexComponent } from './dashboard/dataupfx/fxtbb23/index.component';
import { DashboardDataUpFxtbB25IndexComponent } from './dashboard/dataupfx/fxtbb25/index.component';
// 分校非学历数据填报
import { DashboardDataUpFxtbC01IndexComponent } from './dashboard/dataupfx/fxtbc01/index.component';
import { DashboardDataUpFxtbC02IndexComponent } from './dashboard/dataupfx/fxtbc02/index.component';
import { DashboardDataUpFxtbC03IndexComponent } from './dashboard/dataupfx/fxtbc03/index.component';
import { DashboardDataUpFxtbC04IndexComponent } from './dashboard/dataupfx/fxtbc04/index.component';
// 社区教育数据填报
import { DashboardDataUpFxtbD01IndexComponent } from './dashboard/dataupfx/fxtbd01/index.component';
import { DashboardDataUpFxtbD02IndexComponent } from './dashboard/dataupfx/fxtbd02/index.component';
import { DashboardDataUpFxtbD03IndexComponent } from './dashboard/dataupfx/fxtbd03/index.component';
import { DashboardDataUpFxtbD032IndexComponent } from './dashboard/dataupfx/fxtbd03-2/index.component';
import { DashboardDataUpFxtbD04IndexComponent } from './dashboard/dataupfx/fxtbd04/index.component';
import { DashboardDataUpFxtbD05IndexComponent } from './dashboard/dataupfx/fxtbd05/index.component';
import { DashboardDataUpFxtbD052IndexComponent } from './dashboard/dataupfx/fxtbd05-2/index.component';
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
  DashboardZjpsZxComponent,
  DashboardZjpsFxComponent,
  DashboardZjpsdfZxpsComponent,
  DashboardZjpsdfFxpsComponent,
  DashboardZjpsdfDataBoardComponent,
  // --总校数据填报
  DashboardDataUpZxSjtbComponent,
  DashboardDataUpZxtbK01IndexComponent,
  DashboardDataUpZxtbK04IndexComponent,
  DashboardDataUpZxtbK05IndexComponent,
  DashboardDataUpZxtbK06IndexComponent,
  DashboardDataUpZxtbK07IndexComponent,
  DashboardDataUpZxtbK08IndexComponent,
  DashboardDataUpZxtbK09IndexComponent,
  DashboardDataUpZxtbK10IndexComponent,
  DashboardDataUpZxtbK102IndexComponent,
  DashboardDataUpZxtbK11IndexComponent,
  DashboardDataUpZxtbK121IndexComponent,
  DashboardDataUpZxtbK122IndexComponent,
  DashboardDataUpZxtbK13IndexComponent,
  DashboardDataUpZxtbK141IndexComponent,
  DashboardDataUpZxtbK142IndexComponent,
  DashboardDataUpZxtbK15IndexComponent,
  DashboardDataUpZxtbK152IndexComponent,
  DashboardDataUpZxtbK153IndexComponent,
  DashboardDataUpZxtbK16IndexComponent,
  DashboardDataUpZxtbK17IndexComponent,
  DashboardDataUpZxtbK18IndexComponent,
  DashboardDataUpZxtbK19IndexComponent,
  DashboardDataUpZxtbK20IndexComponent,
  DashboardDataUpZxtbK21IndexComponent,
  DashboardDataUpZxtbK22IndexComponent,
  DashboardDataUpZxtbK23IndexComponent,
  DashboardDataUpZxtbK24IndexComponent,
  DashboardDataUpZxtbK25IndexComponent,
  DashboardDataUpZxtbK26IndexComponent,
  DashboardDataUpZxtbK27IndexComponent,
  DashboardDataUpZxtbK28IndexComponent,
  DashboardDataUpZxtbK30IndexComponent,
  DashboardDataUpZxtbK31IndexComponent,
  DashboardDataUpZxtbK32IndexComponent,
  DashboardDataUpZxtbK33IndexComponent,
  // --分校数据填报
  DashboardDataUpFxSjtbComponent,
  DashboardDataUpFxtbB01IndexComponent,
  DashboardDataUpFxtbB012IndexComponent,
  DashboardDataUpFxtbB02IndexComponent,
  DashboardDataUpFxtbB09IndexComponent,
  DashboardDataUpFxtbB10IndexComponent,
  DashboardDataUpFxtbB102IndexComponent,
  DashboardDataUpFxtbB121IndexComponent,
  DashboardDataUpFxtbB122IndexComponent,
  DashboardDataUpFxtbB13IndexComponent,
  DashboardDataUpFxtbB141IndexComponent,
  DashboardDataUpFxtbB142IndexComponent,
  DashboardDataUpFxtbB15IndexComponent,
  DashboardDataUpFxtbB152IndexComponent,
  DashboardDataUpFxtbB153IndexComponent,
  DashboardDataUpFxtbB16IndexComponent,
  DashboardDataUpFxtbB17IndexComponent,
  DashboardDataUpFxtbB18IndexComponent,
  DashboardDataUpFxtbB21IndexComponent,
  DashboardDataUpFxtbB22IndexComponent,
  DashboardDataUpFxtbB23IndexComponent,
  DashboardDataUpFxtbB25IndexComponent,
  // 非学历教育模块
  DashboardDataUpFxtbC01IndexComponent,
  DashboardDataUpFxtbC02IndexComponent,
  DashboardDataUpFxtbC03IndexComponent,
  DashboardDataUpFxtbC04IndexComponent,
  // 非学历教育模块
  DashboardDataUpFxtbD01IndexComponent,
  DashboardDataUpFxtbD02IndexComponent,
  DashboardDataUpFxtbD03IndexComponent,
  DashboardDataUpFxtbD032IndexComponent,
  DashboardDataUpFxtbD04IndexComponent,
  DashboardDataUpFxtbD05IndexComponent,
  DashboardDataUpFxtbD052IndexComponent,
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
