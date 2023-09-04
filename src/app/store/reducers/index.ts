import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { storeLogger } from 'ngrx-store-logger';

import { environment } from '@app/env';

import { RouterStateModel } from './custom-route-serializer';
import { authReducer, AuthState } from './auth.reducer';
import { accountReducer, AccountState } from './account.reducer';
import { usersReducer, UsersState } from './users.reducer';

export interface AppState {
  router: RouterReducerState<RouterStateModel>;
  auth: AuthState,
  account: AccountState,
  users: UsersState,
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  auth: authReducer,
  account: accountReducer,
  users: usersReducer,
};

export function logger(reducer: ActionReducer<AppState>) {
  return storeLogger({
    collapsed: true,
  })(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger] : [];

export * from './custom-route-serializer';
export * from './account.reducer';
export * from './auth.reducer';
export * from './users.reducer';
export * from './base-entities.reducer';
