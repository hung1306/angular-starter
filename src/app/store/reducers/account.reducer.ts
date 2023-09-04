import { createReducer, on } from '@ngrx/store';

import { Account, ApiState } from '@app/models';

import { accountActions } from '../actions';

export interface AccountState {
  account?: Account;
  getAccountState: ApiState;
}

const initialState: AccountState = {
  getAccountState: ApiState.Idle,
};

export const accountReducer = createReducer(
  initialState,

  on(accountActions.getAccount, state => ({
    ...state,
    getAccountState: ApiState.Requesting,
  })),
  on(accountActions.getAccountSucceeded, (state, { account }) => ({
    ...state,
    account,
    getAccountState: ApiState.Succeeded,
  })),
  on(accountActions.getAccountFailed, state => ({
    ...state,
    getAccountState: ApiState.Failed,
  })),
);
