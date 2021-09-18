import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ProbaComponent } from '../list/proba.component';
import { ProbaDetailComponent } from '../detail/proba-detail.component';
import { ProbaUpdateComponent } from '../update/proba-update.component';
import { ProbaRoutingResolveService } from './proba-routing-resolve.service';

const probaRoute: Routes = [
  {
    path: '',
    component: ProbaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProbaDetailComponent,
    resolve: {
      proba: ProbaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProbaUpdateComponent,
    resolve: {
      proba: ProbaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProbaUpdateComponent,
    resolve: {
      proba: ProbaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(probaRoute)],
  exports: [RouterModule],
})
export class ProbaRoutingModule {}
