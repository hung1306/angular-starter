import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { tap } from 'rxjs';

import { ApiState, BaseDto, BaseEntity, BaseListFilter, ListQueryParams, PaginationMetadata } from '@app/models';
import { BaseEntitiesComponentState, BaseEntitiesState, BaseEntitiesStore } from '@app/store';
import { AppConfig, NavigationRoutes } from '@app/const';
import { FilterUtils } from '@app/utils';

@Component({
  selector: 'app-base-entities',
  template: `NO UI TO BE FOUND HERE!`,
})
export abstract class BaseEntitiesComponent<
  TComponentState extends BaseEntitiesComponentState<TEntity>,
  TDatatable,
  TEntity extends BaseEntity,
  TDto extends BaseDto,
  TListQueryParams extends ListQueryParams,
  TListFilter extends BaseListFilter,
  TEntitiesState extends BaseEntitiesState<TListFilter>,
  TCreateEntity,
  TCreateDto,
  TUpdateEntity,
  TUpdateDto,
> implements OnInit {

  AppConfig = AppConfig;
  FilterUtils = FilterUtils;
  NavigationRoutes = NavigationRoutes;

  entities?: TEntity[];
  listState?: ApiState;
  paginationMetadata?: PaginationMetadata;
  filter?: TListFilter;
  filterFormGroup: FormGroup;
  dataSource: MatTableDataSource<TDatatable> = new MatTableDataSource<TDatatable>();

  abstract displayedColumns: string[];

  abstract buildFilterFormGroup(): FormGroup;

  abstract toDatatable(entity: TEntity): TDatatable;

  abstract getListFilter(): TListFilter;

  abstract setFilterFormValue(): void;

  abstract resetFilterFormValue(): void;

  get searchQueryFormControl(): FormControl {
    return this.filterFormGroup.get('searchQuery') as FormControl;
  }

  protected constructor(
    protected readonly store: BaseEntitiesStore<TComponentState, TEntity, TDto, TListQueryParams, TListFilter, TEntitiesState, TCreateEntity, TCreateDto, TUpdateEntity, TUpdateDto>,
    protected readonly formBuilder: FormBuilder,
  ) {
    this.filterFormGroup = this.buildFilterFormGroup();
    this.selectData();
  }

  ngOnInit(): void {
    this.store.list();
  }

  selectData() {
    this.store.entities$.pipe(
      takeUntilDestroyed(),
      tap(entities => {
        this.entities = entities;
        this.dataSource.data = this.entities?.map(this.toDatatable);
      })
    ).subscribe();

    this.store.listState$.pipe(
      takeUntilDestroyed(),
      tap(listState => {
        this.listState = listState;
      })
    ).subscribe();

    this.store.paginationMetadata$.pipe(
      takeUntilDestroyed(),
      tap(paginationMetadata => {
        this.paginationMetadata = paginationMetadata;
      })
    ).subscribe();

    this.store.filter$.pipe(
      takeUntilDestroyed(),
      tap(filter => {
        this.filter = filter;

        this.setFilterFormValue();
      })
    ).subscribe();
  }

  onResetSearchQuery() {
    this.searchQueryFormControl.setValue(undefined);
    this.onChangeFilter();
  }

  onChangePagination(event: PageEvent) {
    this.store.changePagination({
      pageNumber: event.pageIndex,
      pageSize: event.pageSize,
    });
  }

  onChangeFilter() {
    this._changeFilter(this.getListFilter());
  }

  onResetFilter() {
    this.resetFilterFormValue();
    this.onChangeFilter();
  }

  private _changeFilter(filter: TListFilter) {
    this.store.changeFilter(filter);
  }
}
