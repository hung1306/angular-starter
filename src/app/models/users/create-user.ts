import { Status } from '../enums';

export interface CreateUser {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  phoneNumber: string;
  status: Status;
}

export interface CreateUserDto {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  phoneNumber: string;
  status: Status;
}

export function toCreateUserDto(model: CreateUser): CreateUserDto {
  return {
    username: model.username,
    firstname: model.firstname,
    lastname: model.lastname,
    password: model.password,
    phoneNumber: model.phoneNumber,
    status: model.status,
  };
}
