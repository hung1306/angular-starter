import { ActionCreator } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

import { BaseListFilter } from '@app/models';

export interface BaseEntitiesActions<TListFilter extends BaseListFilter> {
  changeFilter: ActionCreator<string, (props: { filter: TListFilter }) => ({
    filter: TListFilter
  } & TypedAction<string>)>;
}
