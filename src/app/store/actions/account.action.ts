import { createAction, props } from '@ngrx/store';

import { Account } from '@app/models';

const getAccount = createAction(
  '[Account] Get Account',
);

const getAccountSucceeded = createAction(
  '[Account] Get Account Succeeded',
  props<{ account: Account }>()
);

const getAccountFailed = createAction(
  '[Account] Get Account Failed',
);

export const accountActions = {
  getAccount,
  getAccountSucceeded,
  getAccountFailed,
};
