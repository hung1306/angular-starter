import { BaseListFilter } from '../entities';
import { Status } from '../enums';

export interface ListUsersFilter extends BaseListFilter {
  status?: Status;
}
