import { createAction, props } from '@ngrx/store';

export const sendResetEmail = createAction(
  '[Auth] Send Reset Email',
  props<{ email: string }>()
);

export const sendResetEmailSuccess = createAction(
  '[Auth] Send Reset Email Success'
);

export const sendResetEmailFailure = createAction(
  '[Auth] Send Reset Email Failure',
  props<{ error: string }>()
);

export const confirmResetPassword = createAction(
  '[Auth] Confirm Reset Password',
  props<{ userName: string, newPassword: string, code: string }>()
);

export const confirmResetPasswordSuccess = createAction(
  '[Auth] Confirm Reset Password Success'
);

export const confirmResetPasswordFailure = createAction(
  '[Auth] Confirm Reset Password Failure',
  props<{ error: string }>()
);

export const resetActions = {
  sendResetEmail,
  sendResetEmailSuccess,
  sendResetEmailFailure,
  confirmResetPassword,
  confirmResetPasswordFailure,
  confirmResetPasswordSuccess
};
