import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import {
  CreateUser,
  CreateUserDto,
  fromUserDto,
  ListUsersQueryParams,
  toCreateUserDto, toUpdateUserDto, UpdateUser, UpdateUserDto,
  User,
  UserDto
} from '@app/models';

import { BaseEntitiesService } from './base-entities.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseEntitiesService<User, UserDto, ListUsersQueryParams, CreateUser, CreateUserDto, UpdateUser, UpdateUserDto> {
  buildFilterHttpParams(params: HttpParams, queryParams: ListUsersQueryParams): HttpParams {
    if (queryParams.status) {
      params = params.append('status', queryParams.status);
    }

    return params;
  }

  readonly url: string = 'users';

  fromDto(dto: UserDto): User {
    return fromUserDto(dto);
  }

  toCreateEntityDto(dto: CreateUser): CreateUserDto {
    return toCreateUserDto(dto);
  }

  toUpdateEntityDto(dto: UpdateUser): UpdateUserDto {
    return toUpdateUserDto(dto);
  }

  constructor(http: HttpClient) {
    super(http);
  }
}
