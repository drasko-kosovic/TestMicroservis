import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ProbaComponent } from './list/proba.component';
import { ProbaDetailComponent } from './detail/proba-detail.component';
import { ProbaUpdateComponent } from './update/proba-update.component';
import { ProbaDeleteDialogComponent } from './delete/proba-delete-dialog.component';
import { ProbaRoutingModule } from './route/proba-routing.module';

@NgModule({
  imports: [SharedModule, ProbaRoutingModule],
  declarations: [ProbaComponent, ProbaDetailComponent, ProbaUpdateComponent, ProbaDeleteDialogComponent],
  entryComponents: [ProbaDeleteDialogComponent],
})
export class TestmicroProbaModule {}
