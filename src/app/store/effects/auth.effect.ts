import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';

import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AppConfig, LocalStorageKeys, NavigationRoutes } from '@app/const';
import { AuthService, ResetPasswordService } from '@app/services';
import { HttpUtils } from '@app/utils';

import { authActions } from '../actions';
import { routerSelectors } from '../selectors';
import { AppState } from '../reducers';

@Injectable()
export class AuthEffect {

  login$ = createEffect(() => this._actions$.pipe(
      ofType(authActions.login),
      switchMap((action) => this._authService.login(action.request)
        .pipe(
          map(response => authActions.loginSucceeded({ token: response.token })),
          catchError((error: HttpErrorResponse) => {
            this._snackBar.open(HttpUtils.getErrorMessage(error), undefined, { duration: AppConfig.SnackBarDuration });

            return of(authActions.loginFailed());
          })
        ))
    )
  );

  loginSucceeded$ = createEffect(() => this._actions$.pipe(
      ofType(authActions.loginSucceeded),
      withLatestFrom(this._store.pipe(select(routerSelectors.selectQueryParams))),
      tap(([action, queryParams]) => {
        this._store.dispatch(authActions.setToken({ token: action.token }));

        localStorage.setItem(LocalStorageKeys.Token, action.token);

        this._router.navigateByUrl(queryParams?.['redirectUrl'] || '');
      })
    )
    , { dispatch: false });

  logout$ = createEffect(() => this._actions$.pipe(
      ofType(authActions.logout),
      withLatestFrom(this._store.pipe(select(routerSelectors.selectUrl))),
      tap(([_, url]) => {
        localStorage.removeItem(LocalStorageKeys.Token);

        this._router.navigate([NavigationRoutes.Auth, NavigationRoutes.Login], {
          queryParams: {
            redirectUrl: url,
          },
        });
      })
    )
    , { dispatch: false });
  sendResetEmail$ = createEffect(() =>
    this._actions$.pipe(
      ofType(authActions.sendResetEmail),
      switchMap((action) =>
        this._resetPasswordService.sendResetPasswordEmail(action.email).pipe(
          map((response) => {
            return authActions.sendResetEmailSuccess();
          }),
          catchError((error) => {
            return of(authActions.sendResetEmailFailure({ error }));
          })
        )
      )
    )
  );

  confirmResetPassword$ = createEffect(() =>
    this._actions$.pipe(
      ofType(authActions.confirmResetPassword),
      switchMap((action) =>
        this._resetPasswordService.confirmResetPassword(action.userName, action.newPassword, action.code).pipe(
          map((response) => {

            return authActions.confirmResetPasswordSuccess();
          }),
          catchError((error) => {

            return of(authActions.confirmResetPasswordFailure({ error }));
          })
        )
      )
    )
  );

  constructor(
    private readonly _router: Router,
    private readonly _actions$: Actions,
    private readonly _store: Store<AppState>,
    private readonly _authService: AuthService,
    private readonly _snackBar: MatSnackBar,
    private readonly _resetPasswordService: ResetPasswordService
  ) {
    const token = localStorage.getItem(LocalStorageKeys.Token);

    if (token) {
      this._store.dispatch(authActions.setToken({ token }));
    }
  }
}
