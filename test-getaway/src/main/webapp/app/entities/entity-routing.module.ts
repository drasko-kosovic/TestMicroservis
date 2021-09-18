import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'proba',
        data: { pageTitle: 'Probas' },
        loadChildren: () => import('./testmicro/proba/proba.module').then(m => m.TestmicroProbaModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
