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

  on(authActions.forgotPassword, (state) => ({
    ...state,
    forgotPasswordState: ApiState.Requesting,
  })),
  on(authActions.forgotPasswordSucceeded, (state) => ({
    ...state,
    forgotPasswordState: ApiState.Succeeded,
  })),
  on(authActions.forgotPasswordFailed, (state) => ({
    ...state,
    forgotPasswordState: ApiState.Failed,
  })),

  on(authActions.resetPassword, (state) => ({
    ...state,
    resetPasswordState: ApiState.Requesting,
  })),
  on(authActions.resetPasswordSucceeded, (state) => ({
    ...state,
    resetPasswordState: ApiState.Succeeded,
  })),
  on(authActions.resetPasswordFailed, (state) => ({
    ...state,
    resetPasswordState: ApiState.Failed,
  })),
);


