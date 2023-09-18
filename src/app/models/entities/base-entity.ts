import { Dayjs } from 'dayjs';
import * as dayjs from 'dayjs';

export interface BaseEntity {
  id: string;
  createdDate: Dayjs;
  createdBy: string;
  updatedDate: Dayjs;
  updatedBy: string;
}

export interface BaseDto {
  id: string;
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
}

export function fromBaseDto(dto: BaseDto): BaseEntity {
  return {
    id: dto.id,
    createdDate: dayjs(dto.createdDate),
    createdBy: dto.createdBy,
    updatedDate: dayjs(dto.updatedDate),
    updatedBy: dto.updatedBy,
  };
}
