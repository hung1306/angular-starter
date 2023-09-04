import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IsLoggedInGuard, IsNotLoggedInGuard } from '@app/auth';
import { LayoutComponent } from '@app/layout';
import { NavigationRoutes } from '@app/const';

const routes: Routes = [
  {
    path: NavigationRoutes.Auth,
    canActivate: [IsNotLoggedInGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: NavigationRoutes.Empty,
    canActivate: [IsLoggedInGuard],
    component: LayoutComponent,
    children: [
      {
        path: NavigationRoutes.Account,
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
      },
      {
        path: NavigationRoutes.Users,
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
      },
      {
        path: NavigationRoutes.Empty,
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
