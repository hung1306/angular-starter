import { createAction, props } from '@ngrx/store';

import { LoginRequest } from '@app/models';

const login = createAction(
  '[Auth] Login',
  props<{ request: LoginRequest }>()
);

const loginSucceeded = createAction(
  '[Auth] Login Succeeded',
  props<{ token: string }>()
);

const loginFailed = createAction(
  '[Auth] Login Failed',
);

const logout = createAction(
  '[Auth] Logout',
);

const setToken = createAction(
  '[Auth] Set token',
  props<{ token: string }>()
);
const sendResetEmail = createAction(
  '[Auth] Send Reset Email',
  props<{ email: string }>()
);

const sendResetEmailSuccess = createAction(
  '[Auth] Send Reset Email Success'
);

const sendResetEmailFailure = createAction(
  '[Auth] Send Reset Email Failure',
  props<{ error: string }>()
);

const confirmResetPassword = createAction(
  '[Auth] Confirm Reset Password',
  props<{ userName: string, newPassword: string, code: string }>()
);

const confirmResetPasswordSuccess = createAction(
  '[Auth] Confirm Reset Password Success'
);

const confirmResetPasswordFailure = createAction(
  '[Auth] Confirm Reset Password Failure',
  props<{ error: string }>()
);


export const authActions = {
  login,
  loginSucceeded,
  loginFailed,
  logout,
  setToken,
  sendResetEmail,
  sendResetEmailSuccess,
  sendResetEmailFailure,
  confirmResetPassword,
  confirmResetPasswordFailure,
  confirmResetPasswordSuccess
};
