import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '@app/layout';
import { NavigationRoutes } from '@app/const';
import { Role } from '@app/models';
import { HasRoleGuard, IsLoggedInGuard, IsNotLoggedInGuard } from '@app/guards';

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
        canActivate: [HasRoleGuard],
        data: { role: Role.Administrator },
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
