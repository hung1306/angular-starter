import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavigationRoutes } from '@app/const';

import { DashboardPageComponent } from './containers';

const routes: Routes = [
  {
    path: NavigationRoutes.Empty,
    component: DashboardPageComponent,
  },
  {
    path: NavigationRoutes.Other,
    redirectTo: NavigationRoutes.Empty,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
