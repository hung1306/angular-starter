import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { accountContainers } from './containers';

@NgModule({
  declarations: [
    accountContainers,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
  ]
})
export class AccountModule {
}
