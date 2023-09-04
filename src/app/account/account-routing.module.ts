import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavigationRoutes } from '@app/const';

import { AccountPageComponent } from './containers';

const routes: Routes = [
  {
    path: NavigationRoutes.Empty,
    component: AccountPageComponent,
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
export class AccountRoutingModule {
}
