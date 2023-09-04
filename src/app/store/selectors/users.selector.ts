import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ListUsersFilter } from '@app/models';

import { UsersState } from '../reducers';
import { BaseEntitiesSelectors } from './base-entities.selector';

const selectUsersState = createFeatureSelector<UsersState>('users');

const selectFilter = createSelector(
  selectUsersState,
  (state: UsersState) => state.filter
);

export const usersSelectors: BaseEntitiesSelectors<ListUsersFilter, UsersState> = {
  selectFilter,
};
