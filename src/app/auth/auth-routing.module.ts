import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavigationRoutes } from '@app/const';

import { ForgotPasswordPageComponent, LoginPageComponent, ResetPasswordComponent } from './containers';

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
    path: NavigationRoutes.ResetPassword,
    component: ResetPasswordComponent
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
