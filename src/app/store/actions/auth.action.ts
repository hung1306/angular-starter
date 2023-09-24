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
  '[Auth] Set Token',
  props<{ token: string }>()
);
const forgotPassword = createAction(
  '[Auth] Forgot Password',
  props<{ username: string }>()
);

const forgotPasswordSucceeded = createAction(
  '[Auth] Forgot Password Success'
);

const forgotPasswordFailed = createAction(
  '[Auth] Forgot Password Failure',
);

const resetPassword = createAction(
  '[Auth] Reset Password',
  props<{ model: ResetPassword }>()
);

const resetPasswordSucceeded = createAction(
  '[Auth] Reset Password Success'
);

const resetPasswordFailed = createAction(
  '[Auth] Reset Password Failure',
);

export const authActions = {
  login,
  loginSucceeded,
  loginFailed,
  logout,
  setToken,
  forgotPassword,
  forgotPasswordSucceeded,
  forgotPasswordFailed,
  resetPassword,
  resetPasswordSucceeded,
  resetPasswordFailed,
};
