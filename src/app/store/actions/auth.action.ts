import { createAction, props } from '@ngrx/store';

import { LoginRequest } from '@app/models';

const login = createAction(
  '[Auth] Login',
  props<{ request: LoginRequest }>()
);

const loginSucceeded = createAction(
  '[Auth] Login Succeeded',
  props<{ token: string }>()
);

const loginFailed = createAction(
  '[Auth] Login Failed',
);

const logout = createAction(
  '[Auth] Logout',
);

const setToken = createAction(
  '[Auth] Set token',
  props<{ token: string }>()
);

export const authActions = {
  login,
  loginSucceeded,
  loginFailed,
  logout,
  setToken,
};
