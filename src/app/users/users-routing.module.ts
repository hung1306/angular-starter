import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavigationRoutes } from '@app/const';

import { CreateUserPageComponent, UserPageComponent, UsersPageComponent } from './containers';

const routes: Routes = [
  {
    path: NavigationRoutes.Empty,
    component: UsersPageComponent,
  },
  {
    path: NavigationRoutes.Create,
    component: CreateUserPageComponent,
  },
  {
    path: NavigationRoutes.Id,
    component: UserPageComponent,
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
export class UsersRoutingModule {
}
