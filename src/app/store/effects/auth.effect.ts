import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';

import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AppConfig, LocalStorageKeys, NavigationRoutes } from '@app/const';
import { AuthService } from '@app/services';
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

        this._router.navigate(NavigationRoutes.AuthLogin, {
          queryParams: {
            redirectUrl: url,
          },
        });
      })
    )
    , { dispatch: false });

  forgotPassword$ = createEffect(() =>
    this._actions$.pipe(
      ofType(authActions.forgotPassword),
      switchMap((action) =>
        this._authService.forgotPassword(action.username).pipe(
          map(() => {
            this._snackBar.open('An email just has been sent to your inbox, please check it.', undefined, { duration: AppConfig.SnackBarDuration });

            return authActions.forgotPasswordSucceeded();
          }),
          catchError((error: HttpErrorResponse) => {
            this._snackBar.open(HttpUtils.getErrorMessage(error), undefined, { duration: AppConfig.SnackBarDuration });

            return of(authActions.forgotPasswordFailed());
          })
        )
      )
    )
  );

  confirmResetPassword$ = createEffect(() =>
    this._actions$.pipe(
      ofType(authActions.resetPassword),
      switchMap((action) =>
        this._authService.resetPassword(action.model).pipe(
          map(() => {
            this._snackBar.open('Reset password succeeded, please use your new password to login.', undefined, { duration: AppConfig.SnackBarDuration });
            this._router.navigate(NavigationRoutes.AuthLogin);

            return authActions.resetPasswordSucceeded();
          }),
          catchError((error: HttpErrorResponse) => {
            this._snackBar.open(HttpUtils.getErrorMessage(error), undefined, { duration: AppConfig.SnackBarDuration });

            return of(authActions.resetPasswordFailed());
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
  ) {
    const token = localStorage.getItem(LocalStorageKeys.Token);

    if (token) {
      this._store.dispatch(authActions.setToken({ token }));
    }
  }
}
