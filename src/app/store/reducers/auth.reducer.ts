import { createReducer, on } from '@ngrx/store';

import jwt_decode from 'jwt-decode';

import { ApiState, AuthInfo, AuthInfoDto, fromAuthInfoDto } from '@app/models';

import { authActions } from '../actions';

export interface AuthState {
  token?: string;
  info?: AuthInfo;
  loginState: ApiState;
}

const initialState: AuthState = {
  loginState: ApiState.Idle,
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
);
