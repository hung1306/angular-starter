import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';

import { Privilege, Role } from '../enums';

export interface AuthInfo {
  id: string;
  email: string;
  jwtId: string;
  issuer: string;
  audience: string;
  role: Role;
  privileges: Privilege[];
  issuedAt: Dayjs;
  notValidBefore: Dayjs;
  expiredAt: Dayjs;
}

// it's not really a DTO, just name it like this for consistency
export interface AuthInfoDto {
  sub: string;
  email: string;
  jti: string;
  iss: string;
  aud: string;
  role: Role;
  privileges: Privilege[];
  iat: number;
  nbf: number;
  exp: number;
}

export function fromAuthInfoDto(dto: AuthInfoDto): AuthInfo {
  return {
    id: dto.sub,
    email: dto.email,
    jwtId: dto.jti,
    issuer: dto.iss,
    audience: dto.aud,
    role: dto.role,
    privileges: dto.privileges,
    issuedAt: dayjs(dto.iat * 1000),
    notValidBefore: dayjs(dto.nbf * 1000),
    expiredAt: dayjs(dto.exp * 1000),
  };
}
