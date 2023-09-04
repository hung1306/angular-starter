export interface Account {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
}

export interface AccountDto {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
}

export function fromAccountDto(dto: AccountDto): Account {
  return {
    id: dto.id,
    username: dto.username,
    firstname: dto.firstname,
    lastname: dto.lastname,
    phoneNumber: dto.phoneNumber,
  };
}
