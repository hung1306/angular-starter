import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavigationRoutes } from '@app/const';

import { ForgotPasswordPageComponent, LoginPageComponent } from './containers';

const routes: Routes = [
  {
    path: NavigationRoutes.Login,
    component: LoginPageComponent,
  },
  {
    path: NavigationRoutes.ForgotPassword,
    component: ForgotPasswordPageComponent,
  },
  {
    path: NavigationRoutes.Other,
    redirectTo: NavigationRoutes.Login,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
