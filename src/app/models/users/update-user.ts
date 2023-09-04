import { Status } from '../enums';

export interface UpdateUser {
  firstname: string;
  lastname: string;
  phoneNumber: string;
  status: Status;
}

export interface UpdateUserDto {
  firstname: string;
  lastname: string;
  phoneNumber: string;
  status: Status;
}

export function toUpdateUserDto(model: UpdateUser): UpdateUserDto {
  return {
    firstname: model.firstname,
    lastname: model.lastname,
    phoneNumber: model.phoneNumber,
    status: model.status,
  };
}
