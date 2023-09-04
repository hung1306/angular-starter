import { createAction, props } from '@ngrx/store';

import { ListUsersFilter } from '@app/models';

import { BaseEntitiesActions } from './base-entities.action';

const changeFilter = createAction(
  '[Users] Change Filter',
  props<{ filter: ListUsersFilter }>()
);

export const usersActions: BaseEntitiesActions<ListUsersFilter> = {
  changeFilter,
};
