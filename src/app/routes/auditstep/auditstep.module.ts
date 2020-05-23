import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { NgxEchartsModule } from 'ngx-echarts';

import { AuditstepRoutingModule } from './auditstep-routing.module';
import { AuditstepAdStartComponent } from './ad-start/ad-start.component';
import { AuditstepAdStartAddComponent } from './ad-start/add/add.component';
import { AuditstepAdStartEditComponent } from './ad-start/edit/edit.component';
import { AuditstepAdStartStepComponent } from './ad-start/step/step.component';
import { AuditstepAdStartStepAddComponent } from './ad-start/step/add/add.component';
import { AuditstepAdStartStepEditComponent } from './ad-start/step/edit/edit.component';
import { AuditstepDataSynchComponent } from './data-synch/data-synch.component';
import { AuditstepDataSynchEditComponent } from './data-synch/edit/edit.component';
import { AuditstepDataSynchViewComponent } from './data-synch/view/view.component';
import { AuditstepDataUploadComponent } from './data-upload/data-upload.component';
import { AuditstepDataUploadEditComponent } from './data-upload/edit/edit.component';
import { AuditstepDataUploadViewComponent } from './data-upload/view/view.component';
import { AuditstepDataCheckupComponent } from './data-checkup/data-checkup.component';
import { AuditstepDataCheckupEditComponent } from './data-checkup/edit/edit.component';
import { AuditstepDataCheckupViewComponent } from './data-checkup/view/view.component';
import { AuditstepPPreviewComponent } from './p-preview/p-preview.component';
import { AuditstepAdProcessComponent } from './ad-process/ad-process.component';

import { AuditstepAdProcessStepComponent } from './ad-process/step.component';
import { AuditstepAdProcessViewDataSynchComponent } from './ad-process/view/datasynch.component';
// import { AuditstepAdProcessViewDataSynchShowComponent } from './ad-process/view/datasynchshow.component';
import { AuditstepAdProcessZjpsSetupComponent } from './ad-process/zjps/setup.component';
import { AuditstepAdProcessZjpsZjzUserComponent } from './ad-process/zjps/zjzuser/zjzuser.component';
import { AuditstepAdProcessZjpsZjzPszbComponent } from './ad-process/zjps/zjzpszb/zjzpszb.component';
import { AuditstepAdProcessZjpsZjzPsfxComponent } from './ad-process/zjps/zjzpsfx/zjzpsfx.component';
// 总校数据填报进程查询---------------------------------------------------------------------------------------------
import { AuditstepAdProcessTbjcZxIndexSjtbComponent } from './ad-process/tbjczx/indexsjtb.component';
import { AuditstepAdProcessTbjcZxDataViewComponent } from './ad-process/tbjczx/dataview.component';

import { StepProcessTbjcZxtbK01IndexComponent } from './ad-process/tbjczx/zxtbk01/index.component';
import { StepProcessTbjcZxtbK021IndexComponent } from './ad-process/tbjczx/zxtbk02-1/index.component';
import { StepProcessTbjcZxtbK022IndexComponent } from './ad-process/tbjczx/zxtbk02-2/index.component';
import { StepProcessTbjcZxtbK023IndexComponent } from './ad-process/tbjczx/zxtbk02-3/index.component';
import { StepProcessTbjcZxtbK024IndexComponent } from './ad-process/tbjczx/zxtbk02-4/index.component';
import { StepProcessTbjcZxtbK032IndexComponent } from './ad-process/tbjczx/zxtbk03-2/index.component';
import { StepProcessTbjcZxtbK033IndexComponent } from './ad-process/tbjczx/zxtbk03-3/index.component';
import { StepProcessTbjcZxtbK034IndexComponent } from './ad-process/tbjczx/zxtbk03-4/index.component';
import { StepProcessTbjcZxtbK051IndexComponent } from './ad-process/tbjczx/zxtbk05-1/index.component';
import { StepProcessTbjcZxtbK052IndexComponent } from './ad-process/tbjczx/zxtbk05-2/index.component';
import { StepProcessTbjcZxtbK053IndexComponent } from './ad-process/tbjczx/zxtbk05-3/index.component';
import { StepProcessTbjcZxtbK061IndexComponent } from './ad-process/tbjczx/zxtbk06-1/index.component';
import { StepProcessTbjcZxtbK062IndexComponent } from './ad-process/tbjczx/zxtbk06-2/index.component';
import { StepProcessTbjcZxtbK07IndexComponent } from './ad-process/tbjczx/zxtbk07/index.component';
import { StepProcessTbjcZxtbK081IndexComponent } from './ad-process/tbjczx/zxtbk08-1/index.component';
import { StepProcessTbjcZxtbK082IndexComponent } from './ad-process/tbjczx/zxtbk08-2/index.component';
import { StepProcessTbjcZxtbK091IndexComponent } from './ad-process/tbjczx/zxtbk09-1/index.component';
import { StepProcessTbjcZxtbK092IndexComponent } from './ad-process/tbjczx/zxtbk09-2/index.component';
import { StepProcessTbjcZxtbK093IndexComponent } from './ad-process/tbjczx/zxtbk09-3/index.component';
import { StepProcessTbjcZxtbK10IndexComponent } from './ad-process/tbjczx/zxtbk10/index.component';
import { StepProcessTbjcZxtbK111IndexComponent } from './ad-process/tbjczx/zxtbk11-1/index.component';
import { StepProcessTbjcZxtbK112IndexComponent } from './ad-process/tbjczx/zxtbk11-2/index.component';
import { StepProcessTbjcZxtbK113IndexComponent } from './ad-process/tbjczx/zxtbk11-3/index.component';
import { StepProcessTbjcZxtbK114IndexComponent } from './ad-process/tbjczx/zxtbk11-4/index.component';
import { StepProcessTbjcZxtbK12IndexComponent } from './ad-process/tbjczx/zxtbk12/index.component';
import { StepProcessTbjcZxtbK131IndexComponent } from './ad-process/tbjczx/zxtbk13-1/index.component';
import { StepProcessTbjcZxtbK132IndexComponent } from './ad-process/tbjczx/zxtbk13-2/index.component';
import { StepProcessTbjcZxtbK133IndexComponent } from './ad-process/tbjczx/zxtbk13-3/index.component';
import { StepProcessTbjcZxtbK134IndexComponent } from './ad-process/tbjczx/zxtbk13-4/index.component';
import { StepProcessTbjcZxtbK14IndexComponent } from './ad-process/tbjczx/zxtbk14/index.component';
import { StepProcessTbjcZxtbK15IndexComponent } from './ad-process/tbjczx/zxtbk15/index.component';
import { StepProcessTbjcZxtbK16IndexComponent } from './ad-process/tbjczx/zxtbk16/index.component';
import { StepProcessTbjcZxtbK17IndexComponent } from './ad-process/tbjczx/zxtbk17/index.component';
import { StepProcessTbjcZxtbK18IndexComponent } from './ad-process/tbjczx/zxtbk18/index.component';
import { StepProcessTbjcZxtbK21IndexComponent } from './ad-process/tbjczx/zxtbk21/index.component';
import { StepProcessTbjcZxtbK221IndexComponent } from './ad-process/tbjczx/zxtbk22-1/index.component';
import { StepProcessTbjcZxtbK222IndexComponent } from './ad-process/tbjczx/zxtbk22-2/index.component';
import { StepProcessTbjcZxtbK223IndexComponent } from './ad-process/tbjczx/zxtbk22-3/index.component';
import { StepProcessTbjcZxtbK231IndexComponent } from './ad-process/tbjczx/zxtbk23-1/index.component';
import { StepProcessTbjcZxtbK232IndexComponent } from './ad-process/tbjczx/zxtbk23-2/index.component';
import { StepProcessTbjcZxtbK051ChartComponent } from './ad-process/tbjczx/zxtbk05-1/chart.component';

// import { DashboardDataUpZxtbK052IndexComponent } from '../dashboard/dataupzx/zxtbk05-2/index.component';
// 总校文字材料填报进程
import { AuditstepAdProcessTbjcZxIndexFileComponent } from './ad-process/tbjczx/indexfile.component';
import { StepProcessTbjcZxFileInxCommentComponent } from './ad-process/tbjczx/inxComment.component';
import { StepProcessTbjcZxWzfileditEditComponent } from './ad-process/tbjczx/wzfiledit/edit.component';
// -----------------------------------------------------------------------------------------------------------------
// 分析数据填报进程查询
import { AuditstepAdProcessTbjcFxSjtbIndexComponent } from './ad-process/tbjcfx/indexsjtb.component';
import { AuditstepAdProcessTbjcFxDataViewComponent } from './ad-process/tbjcfx/dataview.component';

import { StepProcessTbjcFxtbB021IndexComponent } from './ad-process/tbjcfx/fxtbb02-1/index.component';
import { StepProcessTbjcFxtbB022IndexComponent } from './ad-process/tbjcfx/fxtbb02-2/index.component';
import { StepProcessTbjcFxtbB031IndexComponent } from './ad-process/tbjcfx/fxtbb03-1/index.component';
import { StepProcessTbjcFxtbB04IndexComponent } from './ad-process/tbjcfx/fxtbb04/index.component';
import { StepProcessTbjcFxtbB051IndexComponent } from './ad-process/tbjcfx/fxtbb05-1/index.component';
import { StepProcessTbjcFxtbB052IndexComponent } from './ad-process/tbjcfx/fxtbb05-2/index.component';
import { StepProcessTbjcFxtbB053IndexComponent } from './ad-process/tbjcfx/fxtbb05-3/index.component';
import { StepProcessTbjcFxtbB054IndexComponent } from './ad-process/tbjcfx/fxtbb05-4/index.component';
import { StepProcessTbjcFxtbB055IndexComponent } from './ad-process/tbjcfx/fxtbb05-5/index.component';
import { StepProcessTbjcFxtbB056IndexComponent } from './ad-process/tbjcfx/fxtbb05-6/index.component';
import { StepProcessTbjcFxtbB06IndexComponent } from './ad-process/tbjcfx/fxtbb06/index.component';
import { StepProcessTbjcFxtbB07IndexComponent } from './ad-process/tbjcfx/fxtbb07/index.component';
import { StepProcessTbjcFxtbB081IndexComponent } from './ad-process/tbjcfx/fxtbb08-1/index.component';
import { StepProcessTbjcFxtbB082IndexComponent } from './ad-process/tbjcfx/fxtbb08-2/index.component';
import { StepProcessTbjcFxtbB101IndexComponent } from './ad-process/tbjcfx/fxtbb10-1/index.component';
import { StepProcessTbjcFxtbB102IndexComponent } from './ad-process/tbjcfx/fxtbb10-2/index.component';
import { StepProcessTbjcFxtbB11IndexComponent } from './ad-process/tbjcfx/fxtbb11/index.component';
import { StepProcessTbjcFxtbB131IndexComponent } from './ad-process/tbjcfx/fxtbb13-1/index.component';
import { StepProcessTbjcFxtbB132IndexComponent } from './ad-process/tbjcfx/fxtbb13-2/index.component';
import { StepProcessTbjcFxtbB133IndexComponent } from './ad-process/tbjcfx/fxtbb13-3/index.component';
import { StepProcessTbjcFxtbB141IndexComponent } from './ad-process/tbjcfx/fxtbb14-1/index.component';
import { StepProcessTbjcFxtbB142IndexComponent } from './ad-process/tbjcfx/fxtbb14-2/index.component';
import { StepProcessTbjcFxtbB151IndexComponent } from './ad-process/tbjcfx/fxtbb15-1/index.component';
import { StepProcessTbjcFxtbB152IndexComponent } from './ad-process/tbjcfx/fxtbb15-2/index.component';
import { StepProcessTbjcFxtbB161IndexComponent } from './ad-process/tbjcfx/fxtbb16-1/index.component';
import { StepProcessTbjcFxtbB162IndexComponent } from './ad-process/tbjcfx/fxtbb16-2/index.component';
import { StepProcessTbjcFxtbB171IndexComponent } from './ad-process/tbjcfx/fxtbb17-1/index.component';
import { StepProcessTbjcFxtbB172IndexComponent } from './ad-process/tbjcfx/fxtbb17-2/index.component';
import { StepProcessTbjcFxtbB181IndexComponent } from './ad-process/tbjcfx/fxtbb18-1/index.component';
import { StepProcessTbjcFxtbB182IndexComponent } from './ad-process/tbjcfx/fxtbb18-2/index.component';
import { StepProcessTbjcFxtbB191IndexComponent } from './ad-process/tbjcfx/fxtbb19-1/index.component';
import { StepProcessTbjcFxtbB192IndexComponent } from './ad-process/tbjcfx/fxtbb19-2/index.component';

import { AuditstepAdProcessTbjcFxFileDeptIndexComponent } from './ad-process/tbjcfx/filedept.component';
import { AuditstepAdProcessTbjcFxIndexFileComponent } from './ad-process/tbjcfx/indexfile.component';
import { StepProcessTbjcFxFileInxCommentComponent } from './ad-process/tbjcfx/inxComment.component';
import { StepProcessTbjcFxWzfileditEditComponent } from './ad-process/tbjcfx/wzfiledit/edit.component';

// 专家评审总校
import { AuditstepPreviewZjpsZxIndexsViewComponent } from './p-preview/zjpszx/indexsview.component';
import { AuditstepPreviewZjpsZxSjtbComponent } from './p-preview/zjpszx/zxsjtb.component';
import { AuditstepPreviewZjpsZxInxCommentComponent } from './p-preview/zjpszx/inxComment.component';
import { AuditstepPreviewZjpsZxReviewComponent } from './p-preview/zjpszx/review.component';
import { AuditstepAdProcessTbjcZxIndexPfComponent } from './p-preview/zjpszx/indexpf.component';

// 专家评审进程查询
import { AuditstepAdProcessZjpsjcComponent } from './ad-process/zjpsjc.component';
import { AuditstepAdProcessPsjcZxIndexComponent } from './ad-process/psjczx/index.component';
import { AuditstepAdProcessPsjcZxDataViewComponent } from './ad-process/psjczx/dataview.component';
import { AuditstepAdProcessPsjcFxIndexComponent } from './ad-process/psjcfx/index.component';
import { AuditstepAdProcessPsjcFxDataViewComponent } from './ad-process/psjcfx/dataview.component';

import { AuditstepAdProcessSetFxComponent } from './ad-process/setfx/setfx.component';
import { UEditorModule } from 'ngx-ueditor';

const COMPONENTS = [
  AuditstepAdStartComponent,
  AuditstepDataSynchComponent,
  AuditstepDataUploadComponent,
  AuditstepDataCheckupComponent,
  AuditstepPPreviewComponent,
  AuditstepAdProcessComponent,
];
const COMPONENTS_NOROUNT = [
  AuditstepAdStartAddComponent,
  AuditstepAdStartEditComponent,
  AuditstepAdStartStepComponent,
  AuditstepAdStartStepAddComponent,
  AuditstepAdStartStepEditComponent,
  AuditstepDataSynchEditComponent,
  AuditstepDataSynchViewComponent,
  AuditstepDataUploadEditComponent,
  AuditstepDataUploadViewComponent,
  AuditstepDataCheckupEditComponent,
  AuditstepDataCheckupViewComponent,
  AuditstepAdProcessStepComponent,
  AuditstepAdProcessViewDataSynchComponent,
  AuditstepAdProcessZjpsSetupComponent,
  AuditstepAdProcessZjpsZjzUserComponent,
  AuditstepAdProcessZjpsZjzPszbComponent,
  AuditstepAdProcessZjpsZjzPsfxComponent,
  // -------------------------------------------------------------
  AuditstepAdProcessTbjcZxIndexSjtbComponent,
  AuditstepAdProcessTbjcZxIndexFileComponent,
  StepProcessTbjcZxWzfileditEditComponent,
  StepProcessTbjcZxFileInxCommentComponent,
  AuditstepAdProcessTbjcZxDataViewComponent,
  StepProcessTbjcZxtbK01IndexComponent,
  StepProcessTbjcZxtbK021IndexComponent,
  StepProcessTbjcZxtbK022IndexComponent,
  StepProcessTbjcZxtbK023IndexComponent,
  StepProcessTbjcZxtbK024IndexComponent,
  StepProcessTbjcZxtbK032IndexComponent,
  StepProcessTbjcZxtbK033IndexComponent,
  StepProcessTbjcZxtbK034IndexComponent,
  StepProcessTbjcZxtbK051IndexComponent,
  StepProcessTbjcZxtbK052IndexComponent,
  StepProcessTbjcZxtbK053IndexComponent,
  StepProcessTbjcZxtbK061IndexComponent,
  StepProcessTbjcZxtbK062IndexComponent,
  StepProcessTbjcZxtbK07IndexComponent,
  StepProcessTbjcZxtbK081IndexComponent,
  StepProcessTbjcZxtbK082IndexComponent,
  StepProcessTbjcZxtbK091IndexComponent,
  StepProcessTbjcZxtbK092IndexComponent,
  StepProcessTbjcZxtbK093IndexComponent,
  StepProcessTbjcZxtbK10IndexComponent,
  StepProcessTbjcZxtbK111IndexComponent,
  StepProcessTbjcZxtbK112IndexComponent,
  StepProcessTbjcZxtbK113IndexComponent,
  StepProcessTbjcZxtbK114IndexComponent,
  StepProcessTbjcZxtbK12IndexComponent,
  StepProcessTbjcZxtbK131IndexComponent,
  StepProcessTbjcZxtbK132IndexComponent,
  StepProcessTbjcZxtbK133IndexComponent,
  StepProcessTbjcZxtbK134IndexComponent,
  StepProcessTbjcZxtbK14IndexComponent,
  StepProcessTbjcZxtbK15IndexComponent,
  StepProcessTbjcZxtbK16IndexComponent,
  StepProcessTbjcZxtbK17IndexComponent,
  StepProcessTbjcZxtbK18IndexComponent,
  StepProcessTbjcZxtbK21IndexComponent,
  StepProcessTbjcZxtbK221IndexComponent,
  StepProcessTbjcZxtbK222IndexComponent,
  StepProcessTbjcZxtbK223IndexComponent,
  StepProcessTbjcZxtbK231IndexComponent,
  StepProcessTbjcZxtbK232IndexComponent,
  StepProcessTbjcZxtbK051ChartComponent,

  // 分校填报进程查询----------------------------------------------
  AuditstepAdProcessTbjcFxSjtbIndexComponent,
  AuditstepAdProcessTbjcFxDataViewComponent,
  StepProcessTbjcFxtbB021IndexComponent,
  StepProcessTbjcFxtbB022IndexComponent,
  StepProcessTbjcFxtbB031IndexComponent,
  StepProcessTbjcFxtbB04IndexComponent,
  StepProcessTbjcFxtbB051IndexComponent,
  StepProcessTbjcFxtbB052IndexComponent,
  StepProcessTbjcFxtbB053IndexComponent,
  StepProcessTbjcFxtbB054IndexComponent,
  StepProcessTbjcFxtbB055IndexComponent,
  StepProcessTbjcFxtbB056IndexComponent,
  StepProcessTbjcFxtbB06IndexComponent,
  StepProcessTbjcFxtbB07IndexComponent,
  StepProcessTbjcFxtbB081IndexComponent,
  StepProcessTbjcFxtbB082IndexComponent,
  StepProcessTbjcFxtbB101IndexComponent,
  StepProcessTbjcFxtbB102IndexComponent,
  StepProcessTbjcFxtbB11IndexComponent,
  StepProcessTbjcFxtbB131IndexComponent,
  StepProcessTbjcFxtbB132IndexComponent,
  StepProcessTbjcFxtbB133IndexComponent,
  StepProcessTbjcFxtbB141IndexComponent,
  StepProcessTbjcFxtbB142IndexComponent,
  StepProcessTbjcFxtbB151IndexComponent,
  StepProcessTbjcFxtbB152IndexComponent,
  StepProcessTbjcFxtbB161IndexComponent,
  StepProcessTbjcFxtbB162IndexComponent,
  StepProcessTbjcFxtbB171IndexComponent,
  StepProcessTbjcFxtbB172IndexComponent,
  StepProcessTbjcFxtbB181IndexComponent,
  StepProcessTbjcFxtbB182IndexComponent,
  StepProcessTbjcFxtbB191IndexComponent,
  StepProcessTbjcFxtbB192IndexComponent,
  AuditstepAdProcessTbjcFxFileDeptIndexComponent,
  AuditstepAdProcessTbjcFxIndexFileComponent,
  StepProcessTbjcFxFileInxCommentComponent,
  StepProcessTbjcFxWzfileditEditComponent,
  // 专家评审总校
  AuditstepPreviewZjpsZxIndexsViewComponent,
  AuditstepPreviewZjpsZxSjtbComponent,
  AuditstepPreviewZjpsZxInxCommentComponent,
  AuditstepPreviewZjpsZxReviewComponent,
  AuditstepAdProcessTbjcZxIndexPfComponent,
  // 专家评审进程--------------------------------------------------
  AuditstepAdProcessZjpsjcComponent,
  AuditstepAdProcessPsjcZxIndexComponent,
  AuditstepAdProcessPsjcZxDataViewComponent,
  AuditstepAdProcessPsjcFxIndexComponent,
  AuditstepAdProcessPsjcFxDataViewComponent,

  AuditstepAdProcessSetFxComponent,
];

@NgModule({
  imports: [
    SharedModule,
    AuditstepRoutingModule,
    NgxEchartsModule,
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
export class AuditstepModule {}
