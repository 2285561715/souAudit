import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { AuditindexRoutingModule } from './auditindex-routing.module';
import { AuditindexIndexManaComponent } from './index-mana/index-mana.component';
import { AuditindexIndexManaViewComponent } from './index-mana/view/view.component';
import { AuditindexIndexManaXdrawerComponent } from './index-mana/xdrawer/xdrawer.component';
import { AuditindexIndexManaIdaddComponent } from './index-mana/xdrawer/idadd/add.component';
import { AuditindexIndexManaIdeditComponent } from './index-mana/xdrawer/idedit/edit.component';
import { AuditindexIndexManaSetUpComponent } from './index-mana/xdrawer/setlist/setup.component';
import { AuditindexIndexManaXdrawerIdmoreComponent } from './index-mana/xdrawer/idmore/idmore.component';
import { AuditindexIndexFileComponent } from './index-file/index-file.component';
import { AuditindexIndexFileAddComponent } from './index-file/add/add.component';
import { AuditindexIndexFileEditComponent } from './index-file/edit/edit.component';

const COMPONENTS = [AuditindexIndexManaComponent, AuditindexIndexFileComponent];
const COMPONENTS_NOROUNT = [
  AuditindexIndexManaViewComponent,
  AuditindexIndexManaXdrawerComponent,
  AuditindexIndexManaIdaddComponent,
  AuditindexIndexManaIdeditComponent,
  AuditindexIndexManaSetUpComponent,
  AuditindexIndexManaXdrawerIdmoreComponent,
  AuditindexIndexFileAddComponent,
  AuditindexIndexFileEditComponent,
];

@NgModule({
  imports: [SharedModule, AuditindexRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class AuditindexModule {}
