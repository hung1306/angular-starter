import { createReducer, on } from '@ngrx/store';

import { ListUsersFilter } from '@app/models';

import { BaseEntitiesState } from './base-entities.reducer';
import { usersActions } from '../actions';

export interface UsersState extends BaseEntitiesState<ListUsersFilter> {
  filter: ListUsersFilter;
}

const initialState: UsersState = {
  filter: {},
};

export const usersReducer = createReducer(
  initialState,

  on(usersActions.changeFilter, (state, { filter }) => ({
    ...state,
    filter,
  })),
);
