import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ComponentStore } from '@ngrx/component-store';
import { select, Store } from '@ngrx/store';

import { EMPTY, Observable, switchMap, tap, withLatestFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BaseEntitiesService } from '@app/services';
import {
  ApiState,
  BaseDto,
  BaseEntity,
  BaseListFilter,
  ListQueryParams,
  Pagination,
  PaginationMetadata
} from '@app/models';
import { HttpUtils } from '@app/utils';
import { AppConfig } from '@app/const';

import { AppState, BaseEntitiesState } from '../reducers';
import { BaseEntitiesSelectors } from '../selectors';
import { BaseEntitiesActions } from '../actions';

export interface BaseEntitiesComponentState<TEntity extends BaseEntity> extends EntityState<TEntity> {
  listState: ApiState;
  paginationMetadata: PaginationMetadata;
  createState: ApiState;
  selectedId: string;
  getState: ApiState;
  updateState: ApiState;
  deleteState: ApiState;
}

export abstract class BaseEntitiesStore<
  TComponentState extends BaseEntitiesComponentState<TEntity>,
  TEntity extends BaseEntity,
  TDto extends BaseDto,
  TListQueryParams extends ListQueryParams,
  TListFilter extends BaseListFilter,
  TEntitiesState extends BaseEntitiesState<TListFilter>,
  TCreateEntity,
  TCreateDto,
  TUpdateEntity,
  TUpdateDto,
> extends ComponentStore<TComponentState> {
  abstract toListQueryParams(paginationMetadata: PaginationMetadata, filter: TListFilter): TListQueryParams;

  adapter: EntityAdapter<TEntity> = createEntityAdapter<TEntity>();

  protected constructor(
    protected readonly store: Store<AppState>,
    protected readonly entitiesService: BaseEntitiesService<TEntity, TDto, TListQueryParams, TCreateEntity, TCreateDto, TUpdateEntity, TUpdateDto>,
    protected readonly snackBar: MatSnackBar,
    protected readonly selectors: BaseEntitiesSelectors<TListFilter, TEntitiesState>,
    protected readonly actions: BaseEntitiesActions<TListFilter>,
  ) {
    super(createEntityAdapter<TEntity>().getInitialState({
      listState: ApiState.Idle,
      paginationMetadata: {
        pageNumber: 0,
        pageSize: 25,
        totalPages: 0,
        totalCount: 0,
        hasPrevious: false,
        hasNext: false,
      },
    } as TComponentState));
  }

  readonly setPagination = this.updater((state, pagination: Pagination) => {
    return {
      ...state,
      paginationMetadata: {
        ...state.paginationMetadata,
        ...pagination,
      },
    };
  });

  readonly list = this.effect<void>(
    (trigger$) => trigger$.pipe(
      withLatestFrom(this.store.pipe(select(this.selectors.selectFilter))),
      switchMap(([_, filter]) => {
        this.patchState({ listState: ApiState.Requesting } as Partial<TComponentState>);

        const paginationMetadata = this.get().paginationMetadata;
        return this.entitiesService.list(this.toListQueryParams(paginationMetadata, filter)).pipe(
          tap({
            next: (pagedList) => this.patchState(this.adapter.setAll(pagedList.items, {
              ...this.get(),
              paginationMetadata: pagedList.paginationMetadata,
              listState: ApiState.Succeeded,
            })),
            error: (error: HttpErrorResponse) => {
              this.snackBar.open(HttpUtils.getErrorMessage(error), undefined, { duration: AppConfig.SnackBarDuration });
              this.patchState({ listState: ApiState.Failed } as Partial<TComponentState>);
            },
          }),
          catchError(() => EMPTY),
        );
      }),
    )
  );

  readonly create = this.effect((model$: Observable<TCreateEntity>) => {
    return model$.pipe(
      switchMap((model) => {
        this.patchState({ createState: ApiState.Requesting } as Partial<TComponentState>);

        return this.entitiesService.create(model).pipe(
          tap({
            next: (entity) => this.patchState(this.adapter.upsertOne(entity, {
              ...this.get(),
              createState: ApiState.Succeeded,
            })),
            error: (error: HttpErrorResponse) => {
              this.snackBar.open(HttpUtils.getErrorMessage(error), undefined, { duration: AppConfig.SnackBarDuration });
              this.patchState({ createState: ApiState.Failed } as Partial<TComponentState>);
            },
          }),
          catchError(() => EMPTY),
        );
      }),
    );
  });

  readonly getEntity = this.effect((id$: Observable<string>) => {
    return id$.pipe(
      switchMap((id) => {
        this.patchState({ selectedId: id, getState: ApiState.Requesting } as Partial<TComponentState>);

        return this.entitiesService.get(id).pipe(
          tap({
            next: (entity) => this.patchState(this.adapter.upsertOne(entity, {
              ...this.get(),
              getState: ApiState.Succeeded,
            })),
            error: (error: HttpErrorResponse) => {
              this.snackBar.open(HttpUtils.getErrorMessage(error), undefined, { duration: AppConfig.SnackBarDuration });
              this.patchState({ getState: ApiState.Failed } as Partial<TComponentState>);
            },
          }),
          catchError(() => EMPTY),
        );
      }),
    );
  });

  readonly update = this.effect((model$: Observable<{ id: string, entity: TUpdateEntity }>) => {
    return model$.pipe(
      switchMap((model) => {
        this.patchState({ updateState: ApiState.Requesting } as Partial<TComponentState>);

        return this.entitiesService.update(model.id, model.entity).pipe(
          tap({
            next: (entity) => this.patchState(this.adapter.upsertOne(entity, {
              ...this.get(),
              updateState: ApiState.Succeeded,
            })),
            error: (error: HttpErrorResponse) => {
              this.snackBar.open(HttpUtils.getErrorMessage(error), undefined, { duration: AppConfig.SnackBarDuration });
              this.patchState({ updateState: ApiState.Failed } as Partial<TComponentState>);
            },
          }),
          catchError(() => EMPTY),
        );
      }),
    );
  });

  readonly delete = this.effect((id$: Observable<string>) => {
    return id$.pipe(
      switchMap((id) => {
        this.patchState({ deleteState: ApiState.Requesting } as Partial<TComponentState>);

        return this.entitiesService.delete(id).pipe(
          tap({
            next: () => this.patchState(this.adapter.removeOne(id, {
              ...this.get(),
              deleteState: ApiState.Succeeded,
            })),
            error: (error: HttpErrorResponse) => {
              this.snackBar.open(HttpUtils.getErrorMessage(error), undefined, { duration: AppConfig.SnackBarDuration });
              this.patchState({ deleteState: ApiState.Failed } as Partial<TComponentState>);
            },
          }),
          catchError(() => EMPTY),
        );
      }),
    );
  });

  readonly entitiesMap$ = this.select((state) => this.adapter.getSelectors().selectEntities(state));
  readonly entities$ = this.select((state) => this.adapter.getSelectors().selectAll(state));
  readonly listState$ = this.select((state) => state.listState);
  readonly paginationMetadata$ = this.select((state) => state.paginationMetadata);
  readonly filter$ = this.store.pipe(select(this.selectors.selectFilter));
  readonly createState$ = this.select((state) => state.createState);
  readonly selectedId$ = this.select((state) => state.selectedId);
  readonly selectedEntity$ = this.select(
    this.entitiesMap$,
    this.selectedId$,
    (entitiesMap, selectedId) => entitiesMap?.[selectedId],
  );
  readonly getState$ = this.select((state) => state.getState);
  readonly updateState$ = this.select((state) => state.updateState);
  readonly deleteState$ = this.select((state) => state.deleteState);

  changePagination(pagination: Pagination) {
    this.setPagination(pagination);
    this.list();
  }

  changeFilter(filter: TListFilter) {
    this.store.dispatch(this.actions.changeFilter({ filter }));
    this.changePagination({
      pageNumber: 0,
      pageSize: this.get().paginationMetadata.pageSize,
    });
  }
}
