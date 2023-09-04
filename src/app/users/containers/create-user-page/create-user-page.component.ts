import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseCreateEntityComponent } from '@app/components';
import {
  CreateUser,
  CreateUserDto,
  ListUsersFilter,
  ListUsersQueryParams, UpdateUser, UpdateUserDto,
  User,
  UserDto
} from '@app/models';
import { UsersState } from '@app/store';

import { UsersComponentState, UsersStore } from '../../store';

@Component({
  selector: 'app-create-user-page',
  templateUrl: './create-user-page.component.html',
  styleUrls: ['./create-user-page.component.scss'],
  providers: [UsersStore],
})
export class CreateUserPageComponent extends BaseCreateEntityComponent<
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
}
