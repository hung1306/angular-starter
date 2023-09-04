import { BaseListFilter } from '@app/models';

export interface BaseEntitiesState<TListFilter extends BaseListFilter> {
  filter: TListFilter;
}
