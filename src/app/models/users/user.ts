import { BaseEntity, BaseDto, fromBaseDto } from '../entities';
import { Status } from '../enums';

export interface User extends BaseEntity {
  username: string;
  firstname: string;
  lastname: string;
  phoneNumber?: string;
  status: Status;
}

export interface UserDto extends BaseDto {
  username: string;
  firstname: string;
  lastname: string;
  phoneNumber?: string;
  status: Status;
}

export function fromUserDto(dto: UserDto): User {
  return {
    ...fromBaseDto(dto),
    username: dto.username,
    firstname: dto.firstname,
    lastname: dto.lastname,
    phoneNumber: dto.phoneNumber,
    status: dto.status,
  };
}

export interface UserDatatable extends User {
  name: string;
}

export function toUserDatatable(model: User): UserDatatable {
  return {
    ...model,
    name: `${model.firstname} ${model.lastname}`,
  };
}
