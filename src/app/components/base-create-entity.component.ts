import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { tap } from 'rxjs';

import { BaseEntitiesComponentState, BaseEntitiesState, BaseEntitiesStore } from '@app/store';
import { ApiState, BaseDto, BaseEntity, BaseListFilter, ListQueryParams } from '@app/models';
import { NavigationRoutes } from '@app/const';

@Component({
  selector: 'app-base-create-entity',
  template: `NO UI TO BE FOUND HERE!`,
})
export abstract class BaseCreateEntityComponent<
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
> {

  entities?: TEntity[];
  createState?: ApiState;

  protected constructor(
    protected readonly store: BaseEntitiesStore<TComponentState, TEntity, TDto, TListQueryParams, TListFilter, TEntitiesState, TCreateEntity, TCreateDto, TUpdateEntity, TUpdateDto>,
    protected readonly router: Router,
    protected readonly activatedRoute: ActivatedRoute,
  ) {
    this.selectData();
  }

  selectData() {
    this.store.entities$.pipe(
      takeUntilDestroyed(),
      tap(entities => {
        this.entities = entities;
      })
    ).subscribe();

    this.store.createState$.pipe(
      takeUntilDestroyed(),
      tap(createState => {
        if (this.createState === ApiState.Requesting && createState === ApiState.Succeeded) {
          this.router.navigate([NavigationRoutes.Parent, this.entities?.at(0)?.id], { relativeTo: this.activatedRoute });
        }

        this.createState = createState;
      })
    ).subscribe();
  }

  onCreate(model: TCreateEntity) {
    this.store.create(model);
  }
}
