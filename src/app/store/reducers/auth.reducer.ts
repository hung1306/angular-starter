import { createReducer, on } from '@ngrx/store';

import jwt_decode from 'jwt-decode';

import { ApiState, AuthInfo, AuthInfoDto, fromAuthInfoDto } from '@app/models';

import { authActions } from '../actions';

export interface AuthState {
  token?: string;
  info?: AuthInfo;
  loginState: ApiState;

  isSendingEmail: ApiState;
  isResettingPassword: ApiState;
  errorMessage: string | null;
}

const initialState: AuthState = {
  loginState: ApiState.Idle,
  isSendingEmail: ApiState.Idle,
  isResettingPassword: ApiState.Idle,
  errorMessage: null,
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
    isSendingEmail: ApiState.Requesting,
    errorMessage: null,
  })),
  on(authActions.sendResetEmailSuccess, (state) => ({
    ...state,
    isSendingEmail: ApiState.Succeeded,
  })),
  on(authActions.sendResetEmailFailure, (state, { error }) => ({
    ...state,
    isSendingEmail: ApiState.Failed,
    errorMessage: error,
  })),
  on(authActions.confirmResetPassword, (state) => ({
    ...state,
    isResettingPassword: ApiState.Requesting,
    errorMessage: null,
  })),
  on(authActions.confirmResetPasswordSuccess, (state) => ({
    ...state,
    isResettingPassword: ApiState.Succeeded,
  })),
  on(authActions.confirmResetPasswordFailure, (state, { error }) => ({
    ...state,
    isResettingPassword: ApiState.Failed,
    errorMessage: error,
  })),
);


