import { createAction, props } from '@ngrx/store';

import { LoginRequest, ResetPassword } from '@app/models';

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

const sendResetEmailSucceeded = createAction(
  '[Auth] Send Reset Email Success'
);

const sendResetEmailFailed = createAction(
  '[Auth] Send Reset Email Failure',
);

const confirmResetPassword = createAction(
  '[Auth] Confirm Reset Password',
  props<{ reset: ResetPassword }>()
);

const confirmResetPasswordSucceeded = createAction(
  '[Auth] Confirm Reset Password Success'
);

const confirmResetPasswordFailed = createAction(
  '[Auth] Confirm Reset Password Failure',
);


export const authActions = {
  login,
  loginSucceeded,
  loginFailed,
  logout,
  setToken,
  sendResetEmail,
  sendResetEmailSucceeded,
  sendResetEmailFailed,
  confirmResetPassword,
  confirmResetPasswordFailed,
  confirmResetPasswordSucceeded
};
