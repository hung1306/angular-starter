import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { tap } from 'rxjs';

import { BaseListFilter } from '@app/models';

import { AppState } from '../reducers';
import { BaseEntitiesActions } from '../actions';

export abstract class BaseEntitiesEffect<TListFilter extends BaseListFilter> {

  abstract toFilterString(filter: TListFilter): string;

  abstract fromFilterString(filterString: string): TListFilter;

  changeFilter$ = createEffect(() => this.actions$.pipe(
    ofType(this.actions.changeFilter),
    tap((action) => {
      localStorage.setItem(this.localStorageFilterKey, this.toFilterString(action.filter));
    })
  ), { dispatch: false });

  protected constructor(
    protected readonly localStorageFilterKey: string,
    protected readonly store: Store<AppState>,
    protected readonly actions$: Actions,
    protected readonly actions: BaseEntitiesActions<TListFilter>,
  ) {
    const filterString = localStorage.getItem(this.localStorageFilterKey);

    if (!!filterString) {
      this.store.dispatch(this.actions.changeFilter({ filter: this.fromFilterString(filterString) }));
    }
  }
}
