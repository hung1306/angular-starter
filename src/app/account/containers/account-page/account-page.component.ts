import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { select, Store } from '@ngrx/store';

import { tap } from 'rxjs';

import { Account } from '@app/models';
import { accountSelectors, AppState } from '@app/store';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent {

  account?: Account;

  constructor(private readonly _store: Store<AppState>) {
    this.selectData();
  }

  selectData() {
    this._store.pipe(
      select(accountSelectors.selectAccount),
      takeUntilDestroyed(),
      tap(account => {
        this.account = account;
      }),
    ).subscribe();
  }
}
