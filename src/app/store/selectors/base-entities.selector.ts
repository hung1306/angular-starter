import { MemoizedSelector } from '@ngrx/store';

import { BaseListFilter } from '@app/models';
import { BaseEntitiesState } from '@app/store';

export interface BaseEntitiesSelectors<TListFilter extends BaseListFilter, TEntitiesState extends BaseEntitiesState<TListFilter>> {
  selectFilter: MemoizedSelector<object, TListFilter, (s1: TEntitiesState) => TListFilter>;
}
