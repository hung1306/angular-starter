import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseEntityComponent } from '@app/components';
import { UsersState } from '@app/store';
import {
  ApiState,
  CreateUser,
  CreateUserDto,
  ListUsersFilter,
  ListUsersQueryParams,
  UpdateUser, UpdateUserDto,
  User,
  UserDto
} from '@app/models';

import { UsersComponentState, UsersStore } from '../../store';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
  providers: [UsersStore],
})
export class UserPageComponent extends BaseEntityComponent<
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
  constructor(
    store: UsersStore,
    router: Router,
    activatedRoute: ActivatedRoute,
  ) {
    super(store, router, activatedRoute);
  }

  protected readonly ApiState = ApiState;
}
