import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as dayjs from 'dayjs';

import { AuthState } from '../reducers';

const selectAuthState = createFeatureSelector<AuthState>('auth');

const selectToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);

const selectInfo = createSelector(
  selectAuthState,
  (state: AuthState) => state.info
);

const selectIsLoggedIn = createSelector(
  selectInfo,
  (info): boolean => {
    if (!info) {
      return false;
    }

    return dayjs().isBefore(info.expiredAt);
  }
);

const selectLoginState = createSelector(
  selectAuthState,
  (state: AuthState) => state.loginState
);

const selectForgotPasswordState = createSelector(
  selectAuthState,
  (state: AuthState) => state.forgotPasswordState
);

const selectResetPasswordState = createSelector(
  selectAuthState,
  (state: AuthState) => state.resetPasswordState
);

export const authSelectors = {
  selectAuthState,
  selectToken,
  selectInfo,
  selectIsLoggedIn,
  selectLoginState,
  selectForgotPasswordState,
  selectResetPasswordState,
};
