import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AccountState } from '../reducers';

const selectAccountState = createFeatureSelector<AccountState>('account');

const selectAccount = createSelector(
  selectAccountState,
  (state: AccountState) => state.account
);

export const accountSelectors = {
  selectAccountState,
  selectAccount,
};
