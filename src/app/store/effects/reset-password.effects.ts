import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ResetPasswordService } from '../../services/reset-password.service';
import { resetActions } from '../actions/reset-password.action';


@Injectable()
export class ResetPasswordEffects {
  constructor(private actions$: Actions, private resetPasswordService: ResetPasswordService) {
  }

  sendResetEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resetActions.sendResetEmail),
      switchMap((action) =>
        this.resetPasswordService.sendResetPasswordEmail(action.email).pipe(
          map((response) => {
            return resetActions.sendResetEmailSuccess();
          }),
          catchError((error) => {
            return of(resetActions.sendResetEmailFailure({ error }));
          })
        )
      )
    )
  );

  confirmResetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resetActions.confirmResetPassword),
      switchMap((action) =>
        this.resetPasswordService.confirmResetPassword(action.userName, action.newPassword, action.code).pipe(
          map((response) => {

            return resetActions.confirmResetPasswordSuccess();
          }),
          catchError((error) => {

            return of(resetActions.confirmResetPasswordFailure({ error }));
          })
        )
      )
    )
  );
}
