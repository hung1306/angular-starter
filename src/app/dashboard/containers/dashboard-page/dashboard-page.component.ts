import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { select, Store } from '@ngrx/store';

import { tap } from 'rxjs';

import { accountSelectors, AppState } from '@app/store';
import { Account } from '@app/models';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {

  account?: Account;
  isHiddenBadge = false;

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

  onToggleBadgeVisibility() {
    this.isHiddenBadge = !this.isHiddenBadge;
  }
}
