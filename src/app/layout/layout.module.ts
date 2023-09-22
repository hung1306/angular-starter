import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatLineModule } from '@angular/material/core';

import { AngularSvgIconModule } from 'angular-svg-icon';

import { HasRoleDirective } from '@app/directives';

import { layoutContainers } from './containers';

@NgModule({
  declarations: [
    layoutContainers,
    HasRoleDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatLineModule,
    AngularSvgIconModule,
  ]
})
export class LayoutModule {
}
