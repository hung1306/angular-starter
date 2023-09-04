import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { dashboardContainers } from './containers';

@NgModule({
  declarations: [
    dashboardContainers,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatBadgeModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
  ]
})
export class DashboardModule {
}
