import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

import { LocalStorageKeys } from '@app/const';
import { ListUsersFilter } from '@app/models';

import { AppState } from '../reducers';
import { BaseEntitiesEffect } from './base-entities.effect';
import { usersActions } from '../actions';

@Injectable()
export class UsersEffect extends BaseEntitiesEffect<ListUsersFilter> {
  toFilterString(filter: ListUsersFilter): string {
    return JSON.stringify(filter);
  }

  fromFilterString(filterString: string): ListUsersFilter {
    return JSON.parse(filterString);
  }

  constructor(
    store: Store<AppState>,
    actions$: Actions,
  ) {
    super(LocalStorageKeys.UsersFilter, store, actions$, usersActions);
  }
}
