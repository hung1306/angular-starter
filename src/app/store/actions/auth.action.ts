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
<<<<<<< HEAD
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
  props<{ resetPassword: ResetPassword }>()
);

const confirmResetPasswordSucceeded = createAction(
  '[Auth] Confirm Reset Password Success'
);

const confirmResetPasswordFailed = createAction(
  '[Auth] Confirm Reset Password Failure',
=======
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
>>>>>>> 684206b7507b0264ec2ecfec12b116b68292bdd8
);

export const authActions = {
  login,
  loginSucceeded,
  loginFailed,
  logout,
  setToken,
<<<<<<< HEAD
  sendResetEmail,
  sendResetEmailSucceeded,
  sendResetEmailFailed,
  confirmResetPassword,
  confirmResetPasswordFailed,
  confirmResetPasswordSucceeded
=======
  forgotPassword,
  forgotPasswordSucceeded,
  forgotPasswordFailed,
  resetPassword,
  resetPasswordSucceeded,
  resetPasswordFailed,
>>>>>>> 684206b7507b0264ec2ecfec12b116b68292bdd8
};
