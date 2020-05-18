import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

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
import { AuditstepPPreviewEditComponent } from './p-preview/edit/edit.component';
import { AuditstepPPreviewViewComponent } from './p-preview/view/view.component';
import { AuditstepAdProcessComponent } from './ad-process/ad-process.component';
import { AuditstepAdProcessStepComponent } from './ad-process/step.component';
import { AuditstepAdProcessViewDataSynchComponent } from './ad-process/view/datasynch.component';
// import { AuditstepAdProcessViewDataSynchShowComponent } from './ad-process/view/datasynchshow.component';
import { AuditstepAdProcessZjpsSetupComponent } from './ad-process/zjps/setup.component';
import { AuditstepAdProcessZjpsZjzUserComponent } from './ad-process/zjps/zjzuser/zjzuser.component';
import { AuditstepAdProcessZjpsZjzPszbComponent } from './ad-process/zjps/zjzpszb/zjzpszb.component';
import { AuditstepAdProcessZjpsZjzPsfxComponent } from './ad-process/zjps/zjzpsfx/zjzpsfx.component';
// 数据填报进程查询
import { AuditstepAdProcessTbjcZxIndexSjtbComponent } from './ad-process/tbjczx/indexsjtb.component';
import { AuditstepAdProcessTbjcZxIndexFileComponent } from './ad-process/tbjczx/indexfile.component';
import { StepProcessTbjcZxFileInxCommentComponent } from './ad-process/tbjczx/inxComment.component';
import { StepProcessTbjcZxWzfileditEditComponent } from './ad-process/tbjczx/wzfiledit/edit.component';

import { AuditstepAdProcessTbjcZxDataViewComponent } from './ad-process/tbjczx/dataview.component';

import { StepProcessTbjcZxtbK051IndexComponent } from './ad-process/tbjczx/zxtbk05-1/index.component';
import { StepProcessTbjcZxtbK051ChartComponent } from './ad-process/tbjczx/zxtbk05-1/chart.component';

import { AuditstepAdProcessTbjcFxIndexComponent } from './ad-process/tbjcfx/index.component';
import { AuditstepAdProcessTbjcFxDataViewComponent } from './ad-process/tbjcfx/dataview.component';
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
  AuditstepPPreviewEditComponent,
  AuditstepPPreviewViewComponent,
  AuditstepAdProcessStepComponent,
  AuditstepAdProcessViewDataSynchComponent,
  // AuditstepAdProcessViewDataSynchShowComponent,
  AuditstepAdProcessZjpsSetupComponent,
  AuditstepAdProcessZjpsZjzUserComponent,
  AuditstepAdProcessZjpsZjzPszbComponent,
  AuditstepAdProcessZjpsZjzPsfxComponent,
  AuditstepAdProcessTbjcZxIndexSjtbComponent,
  AuditstepAdProcessTbjcZxIndexFileComponent,
  StepProcessTbjcZxWzfileditEditComponent,
  StepProcessTbjcZxFileInxCommentComponent,
  AuditstepAdProcessTbjcZxDataViewComponent,
  StepProcessTbjcZxtbK051IndexComponent,
  StepProcessTbjcZxtbK051ChartComponent,

  AuditstepAdProcessTbjcFxIndexComponent,
  AuditstepAdProcessTbjcFxDataViewComponent,
  // 专家评审进程
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
