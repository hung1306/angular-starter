import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of, switchMap } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AccountService } from '@app/services';

import { accountActions } from '../actions';

@Injectable()
export class AccountEffect {

  getAccount$ = createEffect(() => this._actions$.pipe(
      ofType(accountActions.getAccount),
      switchMap(() => this._accountService.get()
        .pipe(
          map(account => accountActions.getAccountSucceeded({ account })),
          catchError(() => of(accountActions.getAccountFailed())),
        ))
    )
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _accountService: AccountService,
  ) {
  }
}
