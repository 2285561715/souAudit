import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardDataUpZxComponent } from './dashboard/dataupzx.component';
import { DashboardDataUpFxComponent } from './dashboard/dataupfx.component';
import { DashboardJhzjFxComponent } from './dashboard/jhzjfx.component';
import { DashboardZjpsZxComponent } from './dashboard/zjpszx.component';
import { DashboardZjpsFxComponent } from './dashboard/zjpsfx.component';
import { DashboardZjpsdfZxpsComponent } from './dashboard/zjpsdf/zxps.component';
import { DashboardZjpsdfFxpsComponent } from './dashboard/zjpsdf/fxps.component';
import { DashboardZjpsdfDataBoardComponent } from './dashboard/zjpsdf/databoard.component';
import { DashboardManualVideoPlayComponent } from './dashboard/manual/videoplay.component';
// --总校数据填报
import { DashboardDataUpZxIndexsViewComponent } from './dashboard/dataupzx/indexsview.component';
import { DashboardDataUpZxSjtbComponent } from './dashboard/dataupzx/zxsjtb.component';
import { DashboardDataUpZxInxCommentComponent } from './dashboard/dataupzx/inxComment.component';
import { DashboardDataUpZxWzfileditEditComponent } from './dashboard/dataupzx/wzfiledit/edit.component';
import { DashboardDataUpZxtbK01IndexComponent } from './dashboard/dataupzx/zxtbk01/index.component';
import { DashboardDataUpZxtbK021IndexComponent } from './dashboard/dataupzx/zxtbk02-1/index.component';
import { DashboardDataUpZxtbK022IndexComponent } from './dashboard/dataupzx/zxtbk02-2/index.component';
import { DashboardDataUpZxtbK023IndexComponent } from './dashboard/dataupzx/zxtbk02-3/index.component';
import { DashboardDataUpZxtbK024IndexComponent } from './dashboard/dataupzx/zxtbk02-4/index.component';
import { DashboardDataUpZxtbK032IndexComponent } from './dashboard/dataupzx/zxtbk03-2/index.component';
import { DashboardDataUpZxtbK033IndexComponent } from './dashboard/dataupzx/zxtbk03-3/index.component';
import { DashboardDataUpZxtbK034IndexComponent } from './dashboard/dataupzx/zxtbk03-4/index.component';
import { DashboardDataUpZxtbK051IndexComponent } from './dashboard/dataupzx/zxtbk05-1/index.component';
import { DashboardDataUpZxtbK052IndexComponent } from './dashboard/dataupzx/zxtbk05-2/index.component';
import { DashboardDataUpZxtbK053IndexComponent } from './dashboard/dataupzx/zxtbk05-3/index.component';
import { DashboardDataUpZxtbK061IndexComponent } from './dashboard/dataupzx/zxtbk06-1/index.component';
import { DashboardDataUpZxtbK062IndexComponent } from './dashboard/dataupzx/zxtbk06-2/index.component';
import { DashboardDataUpZxtbK07IndexComponent } from './dashboard/dataupzx/zxtbk07/index.component';
import { DashboardDataUpZxtbK081IndexComponent } from './dashboard/dataupzx/zxtbk08-1/index.component';
import { DashboardDataUpZxtbK082IndexComponent } from './dashboard/dataupzx/zxtbk08-2/index.component';
import { DashboardDataUpZxtbK091IndexComponent } from './dashboard/dataupzx/zxtbk09-1/index.component';
import { DashboardDataUpZxtbK092IndexComponent } from './dashboard/dataupzx/zxtbk09-2/index.component';
import { DashboardDataUpZxtbK093IndexComponent } from './dashboard/dataupzx/zxtbk09-3/index.component';
import { DashboardDataUpZxtbK10IndexComponent } from './dashboard/dataupzx/zxtbk10/index.component';
import { DashboardDataUpZxtbK111IndexComponent } from './dashboard/dataupzx/zxtbk11-1/index.component';
import { DashboardDataUpZxtbK112IndexComponent } from './dashboard/dataupzx/zxtbk11-2/index.component';
import { DashboardDataUpZxtbK113IndexComponent } from './dashboard/dataupzx/zxtbk11-3/index.component';
import { DashboardDataUpZxtbK114IndexComponent } from './dashboard/dataupzx/zxtbk11-4/index.component';
import { DashboardDataUpZxtbK12IndexComponent } from './dashboard/dataupzx/zxtbk12/index.component';
import { DashboardDataUpZxtbK131IndexComponent } from './dashboard/dataupzx/zxtbk13-1/index.component';
import { DashboardDataUpZxtbK132IndexComponent } from './dashboard/dataupzx/zxtbk13-2/index.component';
import { DashboardDataUpZxtbK133IndexComponent } from './dashboard/dataupzx/zxtbk13-3/index.component';
import { DashboardDataUpZxtbK134IndexComponent } from './dashboard/dataupzx/zxtbk13-4/index.component';
import { DashboardDataUpZxtbK14IndexComponent } from './dashboard/dataupzx/zxtbk14/index.component';
import { DashboardDataUpZxtbK15IndexComponent } from './dashboard/dataupzx/zxtbk15/index.component';
import { DashboardDataUpZxtbK16IndexComponent } from './dashboard/dataupzx/zxtbk16/index.component';
import { DashboardDataUpZxtbK17IndexComponent } from './dashboard/dataupzx/zxtbk17/index.component';
import { DashboardDataUpZxtbK18IndexComponent } from './dashboard/dataupzx/zxtbk18/index.component';
import { DashboardDataUpZxtbK21IndexComponent } from './dashboard/dataupzx/zxtbk21/index.component';
import { DashboardDataUpZxtbK221IndexComponent } from './dashboard/dataupzx/zxtbk22-1/index.component';
import { DashboardDataUpZxtbK222IndexComponent } from './dashboard/dataupzx/zxtbk22-2/index.component';
import { DashboardDataUpZxtbK223IndexComponent } from './dashboard/dataupzx/zxtbk22-3/index.component';
import { DashboardDataUpZxtbK231IndexComponent } from './dashboard/dataupzx/zxtbk23-1/index.component';
import { DashboardDataUpZxtbK232IndexComponent } from './dashboard/dataupzx/zxtbk23-2/index.component';
// 分校数据填报
import { DashboardDataUpFxIndexsViewComponent } from './dashboard/dataupfx/indexsview.component';
import { DashboardDataUpFxSjtbComponent } from './dashboard/dataupfx/fxsjtb.component';
import { DashboardDataUpFxInxCommentComponent } from './dashboard/dataupfx/inxComment.component';
import { DashboardDataUpFxWzfileditEditComponent } from './dashboard/dataupfx/wzfiledit/edit.component';
import { DashboardDataUpFxtbB021IndexComponent } from './dashboard/dataupfx/fxtbb02-1/index.component';
import { DashboardDataUpFxtbB022IndexComponent } from './dashboard/dataupfx/fxtbb02-2/index.component';
import { DashboardDataUpFxtbB031IndexComponent } from './dashboard/dataupfx/fxtbb03-1/index.component';
import { DashboardDataUpFxtbB04IndexComponent } from './dashboard/dataupfx/fxtbb04/index.component';
import { DashboardDataUpFxtbB051IndexComponent } from './dashboard/dataupfx/fxtbb05-1/index.component';
import { DashboardDataUpFxtbB052IndexComponent } from './dashboard/dataupfx/fxtbb05-2/index.component';
import { DashboardDataUpFxtbB053IndexComponent } from './dashboard/dataupfx/fxtbb05-3/index.component';
import { DashboardDataUpFxtbB054IndexComponent } from './dashboard/dataupfx/fxtbb05-4/index.component';
import { DashboardDataUpFxtbB055IndexComponent } from './dashboard/dataupfx/fxtbb05-5/index.component';
import { DashboardDataUpFxtbB056IndexComponent } from './dashboard/dataupfx/fxtbb05-6/index.component';
import { DashboardDataUpFxtbB06IndexComponent } from './dashboard/dataupfx/fxtbb06/index.component';
import { DashboardDataUpFxtbB07IndexComponent } from './dashboard/dataupfx/fxtbb07/index.component';
import { DashboardDataUpFxtbB081IndexComponent } from './dashboard/dataupfx/fxtbb08-1/index.component';
import { DashboardDataUpFxtbB082IndexComponent } from './dashboard/dataupfx/fxtbb08-2/index.component';
import { DashboardDataUpFxtbB101IndexComponent } from './dashboard/dataupfx/fxtbb10-1/index.component';
import { DashboardDataUpFxtbB102IndexComponent } from './dashboard/dataupfx/fxtbb10-2/index.component';
import { DashboardDataUpFxtbB11IndexComponent } from './dashboard/dataupfx/fxtbb11/index.component';
import { DashboardDataUpFxtbB131IndexComponent } from './dashboard/dataupfx/fxtbb13-1/index.component';
import { DashboardDataUpFxtbB132IndexComponent } from './dashboard/dataupfx/fxtbb13-2/index.component';
import { DashboardDataUpFxtbB133IndexComponent } from './dashboard/dataupfx/fxtbb13-3/index.component';
import { DashboardDataUpFxtbB141IndexComponent } from './dashboard/dataupfx/fxtbb14-1/index.component';
import { DashboardDataUpFxtbB142IndexComponent } from './dashboard/dataupfx/fxtbb14-2/index.component';
import { DashboardDataUpFxtbB151IndexComponent } from './dashboard/dataupfx/fxtbb15-1/index.component';
import { DashboardDataUpFxtbB152IndexComponent } from './dashboard/dataupfx/fxtbb15-2/index.component';
import { DashboardDataUpFxtbB161IndexComponent } from './dashboard/dataupfx/fxtbb16-1/index.component';
import { DashboardDataUpFxtbB162IndexComponent } from './dashboard/dataupfx/fxtbb16-2/index.component';
import { DashboardDataUpFxtbB171IndexComponent } from './dashboard/dataupfx/fxtbb17-1/index.component';
import { DashboardDataUpFxtbB172IndexComponent } from './dashboard/dataupfx/fxtbb17-2/index.component';
import { DashboardDataUpFxtbB181IndexComponent } from './dashboard/dataupfx/fxtbb18-1/index.component';
import { DashboardDataUpFxtbB182IndexComponent } from './dashboard/dataupfx/fxtbb18-2/index.component';
import { DashboardDataUpFxtbB191IndexComponent } from './dashboard/dataupfx/fxtbb19-1/index.component';
import { DashboardDataUpFxtbB192IndexComponent } from './dashboard/dataupfx/fxtbb19-2/index.component';
// -- 文字资料上传
import { DashboardFileUpFxJhzjComponent } from './dashboard/fileup/fxjhzj.component';

// 专家评审-总校评估
import { DashboardZjpsZxIndexsViewComponent } from './dashboard/zjpszx/indexsview.component';
import { DashboardZjpsZxSjtbComponent } from './dashboard/zjpszx/zxsjtb.component';
import { DashboardZjpsZxInxCommentComponent } from './dashboard/zjpszx/inxComment.component';
import { DashboardZjpsZxReviewComponent } from './dashboard/zjpszx/review.component';

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

import { UEditorModule } from 'ngx-ueditor';

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
  DashboardJhzjFxComponent,
  DashboardZjpsZxComponent,
  DashboardZjpsFxComponent,
  DashboardZjpsdfZxpsComponent,
  DashboardZjpsdfFxpsComponent,
  DashboardZjpsdfDataBoardComponent,
  DashboardManualVideoPlayComponent,
  // --总校数据填报
  DashboardDataUpZxIndexsViewComponent,
  DashboardDataUpZxInxCommentComponent,
  DashboardDataUpZxSjtbComponent,
  DashboardDataUpZxWzfileditEditComponent,
  DashboardDataUpZxtbK01IndexComponent,
  DashboardDataUpZxtbK021IndexComponent,
  DashboardDataUpZxtbK022IndexComponent,
  DashboardDataUpZxtbK023IndexComponent,
  DashboardDataUpZxtbK024IndexComponent,
  DashboardDataUpZxtbK032IndexComponent,
  DashboardDataUpZxtbK033IndexComponent,
  DashboardDataUpZxtbK034IndexComponent,
  DashboardDataUpZxtbK051IndexComponent,
  DashboardDataUpZxtbK052IndexComponent,
  DashboardDataUpZxtbK053IndexComponent,
  DashboardDataUpZxtbK061IndexComponent,
  DashboardDataUpZxtbK062IndexComponent,
  DashboardDataUpZxtbK07IndexComponent,
  DashboardDataUpZxtbK081IndexComponent,
  DashboardDataUpZxtbK082IndexComponent,
  DashboardDataUpZxtbK091IndexComponent,
  DashboardDataUpZxtbK092IndexComponent,
  DashboardDataUpZxtbK093IndexComponent,
  DashboardDataUpZxtbK10IndexComponent,
  DashboardDataUpZxtbK111IndexComponent,
  DashboardDataUpZxtbK112IndexComponent,
  DashboardDataUpZxtbK113IndexComponent,
  DashboardDataUpZxtbK114IndexComponent,
  DashboardDataUpZxtbK12IndexComponent,
  DashboardDataUpZxtbK131IndexComponent,
  DashboardDataUpZxtbK132IndexComponent,
  DashboardDataUpZxtbK133IndexComponent,
  DashboardDataUpZxtbK134IndexComponent,
  DashboardDataUpZxtbK14IndexComponent,
  DashboardDataUpZxtbK15IndexComponent,
  DashboardDataUpZxtbK16IndexComponent,
  DashboardDataUpZxtbK17IndexComponent,
  DashboardDataUpZxtbK18IndexComponent,
  DashboardDataUpZxtbK21IndexComponent,
  DashboardDataUpZxtbK221IndexComponent,
  DashboardDataUpZxtbK222IndexComponent,
  DashboardDataUpZxtbK223IndexComponent,
  DashboardDataUpZxtbK231IndexComponent,
  DashboardDataUpZxtbK232IndexComponent,
  // --分校数据填报
  DashboardDataUpFxIndexsViewComponent,
  DashboardDataUpFxInxCommentComponent,
  DashboardDataUpFxSjtbComponent,
  DashboardDataUpFxWzfileditEditComponent,
  DashboardDataUpFxtbB021IndexComponent,
  DashboardDataUpFxtbB022IndexComponent,
  DashboardDataUpFxtbB031IndexComponent,
  DashboardDataUpFxtbB04IndexComponent,
  DashboardDataUpFxtbB051IndexComponent,
  DashboardDataUpFxtbB052IndexComponent,
  DashboardDataUpFxtbB053IndexComponent,
  DashboardDataUpFxtbB054IndexComponent,
  DashboardDataUpFxtbB055IndexComponent,
  DashboardDataUpFxtbB056IndexComponent,
  DashboardDataUpFxtbB06IndexComponent,
  DashboardDataUpFxtbB07IndexComponent,
  DashboardDataUpFxtbB081IndexComponent,
  DashboardDataUpFxtbB082IndexComponent,
  DashboardDataUpFxtbB101IndexComponent,
  DashboardDataUpFxtbB102IndexComponent,
  DashboardDataUpFxtbB11IndexComponent,
  DashboardDataUpFxtbB131IndexComponent,
  DashboardDataUpFxtbB132IndexComponent,
  DashboardDataUpFxtbB133IndexComponent,
  DashboardDataUpFxtbB141IndexComponent,
  DashboardDataUpFxtbB142IndexComponent,
  DashboardDataUpFxtbB151IndexComponent,
  DashboardDataUpFxtbB152IndexComponent,
  DashboardDataUpFxtbB161IndexComponent,
  DashboardDataUpFxtbB162IndexComponent,
  DashboardDataUpFxtbB171IndexComponent,
  DashboardDataUpFxtbB172IndexComponent,
  DashboardDataUpFxtbB181IndexComponent,
  DashboardDataUpFxtbB182IndexComponent,
  DashboardDataUpFxtbB191IndexComponent,
  DashboardDataUpFxtbB192IndexComponent,
  // --文字材料上传
  DashboardFileUpFxJhzjComponent,
  // 专家评审 总校
  DashboardZjpsZxIndexsViewComponent,
  DashboardZjpsZxInxCommentComponent,
  DashboardZjpsZxSjtbComponent,
  DashboardZjpsZxReviewComponent,
];

@NgModule({
  imports: [
    SharedModule,
    RouteRoutingModule,
    NzIconModule,
    UEditorModule.forRoot({
      js: [`./assets/ueditor/ueditor.config.js`, `./assets/ueditor/ueditor.all.js`],
      // 默认前端配置项
      options: {
        UEDITOR_HOME_URL: './assets/ueditor/',
      },
    }),
  ],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class RoutesModule {}
