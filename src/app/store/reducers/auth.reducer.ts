import { createReducer, on } from '@ngrx/store';

import jwt_decode from 'jwt-decode';

import { ApiState, AuthInfo, AuthInfoDto, fromAuthInfoDto } from '@app/models';

import { authActions } from '../actions';

export interface AuthState {
  token?: string;
  info?: AuthInfo;
  loginState: ApiState;
  forgotPasswordState: ApiState;
  resetPasswordState: ApiState;
}

const initialState: AuthState = {
  loginState: ApiState.Idle,
  forgotPasswordState: ApiState.Idle,
  resetPasswordState: ApiState.Idle,
};

export const authReducer = createReducer(
  initialState,

  on(authActions.login, state => ({
    ...state,
    loginState: ApiState.Requesting,
  })),
  on(authActions.loginSucceeded, state => ({
    ...state,
    loginState: ApiState.Succeeded,
  })),
  on(authActions.loginFailed, state => ({
    ...state,
    loginState: ApiState.Failed,
  })),

  on(authActions.logout, () => initialState),

  on(authActions.setToken, (state, { token }) => {
    const decoded: AuthInfoDto = jwt_decode(token);

    return {
      ...state,
      token,
      info: fromAuthInfoDto(decoded),
    };
  }),
  on(authActions.sendResetEmail, (state) => ({
    ...state,
    forgotPasswordState: ApiState.Requesting,
  })),
  on(authActions.sendResetEmailSucceeded, (state) => ({
    ...state,
    forgotPasswordState: ApiState.Succeeded,
  })),
  on(authActions.sendResetEmailFailed, (state) => ({
    ...state,
    forgotPasswordState: ApiState.Failed,
  })),
  on(authActions.confirmResetPassword, (state) => ({
    ...state,
    resetPasswordState: ApiState.Requesting,
  })),
  on(authActions.confirmResetPasswordSucceeded, (state) => ({
    ...state,
    resetPasswordState: ApiState.Succeeded,
  })),
  on(authActions.confirmResetPasswordFailed, (state) => ({
    ...state,
    resetPasswordState: ApiState.Failed,
  })),
);


