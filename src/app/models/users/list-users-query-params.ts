import { Status } from '../enums';
import { ListQueryParams } from '../entities';

export interface ListUsersQueryParams extends ListQueryParams {
  status?: Status;
}
