import { createReducer, on } from '@ngrx/store';

import { resetActions } from '../actions';
import { ApiState } from '@app/models';

export interface ResetState {


  isSendingEmail: ApiState;
  isResettingPassword: ApiState;
  errorMessage: string | null;
}

const initialState: ResetState = {

  isSendingEmail: ApiState.Idle,
  isResettingPassword: ApiState.Idle,
  errorMessage: null,
};

export const resetPasswordReducer = createReducer(
  initialState,
  on(resetActions.sendResetEmail, (state) => ({
    ...state,
    isSendingEmail: ApiState.Requesting,
    errorMessage: null,
  })),
  on(resetActions.sendResetEmailSuccess, (state) => ({
    ...state,
    isSendingEmail: ApiState.Succeeded,
  })),
  on(resetActions.sendResetEmailFailure, (state, { error }) => ({
    ...state,
    isSendingEmail: ApiState.Failed,
    errorMessage: error,
  })),
  on(resetActions.confirmResetPassword, (state) => ({
    ...state,
    isResettingPassword: ApiState.Requesting,
    errorMessage: null,
  })),
  on(resetActions.confirmResetPasswordSuccess, (state) => ({
    ...state,
    isResettingPassword: ApiState.Succeeded,
  })),
  on(resetActions.confirmResetPasswordFailure, (state, { error }) => ({
    ...state,
    isResettingPassword: ApiState.Failed,
    errorMessage: error,
  })),
);
