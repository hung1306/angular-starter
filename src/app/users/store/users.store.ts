import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Store } from '@ngrx/store';

import {
  AppState,
  BaseEntitiesComponentState,
  BaseEntitiesStore, usersActions,
  usersSelectors,
  UsersState
} from '@app/store';
import {
  CreateUser,
  CreateUserDto,
  ListUsersFilter,
  ListUsersQueryParams, PaginationMetadata,
  UpdateUser,
  UpdateUserDto,
  User,
  UserDto
} from '@app/models';
import { UsersService } from '@app/services';

export interface UsersComponentState extends BaseEntitiesComponentState<User> {
}

@Injectable()
export class UsersStore extends BaseEntitiesStore<
  UsersComponentState,
  User,
  UserDto,
  ListUsersQueryParams,
  ListUsersFilter,
  UsersState,
  CreateUser,
  CreateUserDto,
  UpdateUser,
  UpdateUserDto
> {
  toListQueryParams(paginationMetadata: PaginationMetadata, filter: ListUsersFilter): ListUsersQueryParams {
    return {
      pageNumber: paginationMetadata.pageNumber,
      pageSize: paginationMetadata.pageSize,
      searchQuery: filter.searchQuery,
      status: filter.status,
    };
  }

  constructor(
    store: Store<AppState>,
    usersService: UsersService,
    snackBar: MatSnackBar,
  ) {
    super(store, usersService, snackBar, usersSelectors, usersActions);
  }
}
