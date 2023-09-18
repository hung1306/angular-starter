import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { tap } from 'rxjs';

import { BaseEntitiesComponentState, BaseEntitiesState, BaseEntitiesStore } from '@app/store';
import { ApiState, BaseDto, BaseEntity, BaseListFilter, ListQueryParams } from '@app/models';

@Component({
  selector: 'app-base-create-entity',
  template: `NO UI TO BE FOUND HERE!`,
})
export abstract class BaseEntityComponent<
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

  entity?: TEntity;
  updateState?: ApiState;
  deleteState?: ApiState;

  isEditing: boolean = false;

  protected constructor(
    protected readonly store: BaseEntitiesStore<TComponentState, TEntity, TDto, TListQueryParams, TListFilter, TEntitiesState, TCreateEntity, TCreateDto, TUpdateEntity, TUpdateDto>,
    protected readonly router: Router,
    protected readonly activatedRoute: ActivatedRoute,
  ) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!!id) {
      this.store.getEntity(id);
    }

    this.selectData();
  }
  // method use in UserComponent
  selectData() {
    this.store.selectedEntity$.pipe(
      takeUntilDestroyed(),
      tap(entity => {
        this.entity = entity;
      })
    ).subscribe();

    this.store.updateState$.pipe(
      takeUntilDestroyed(),
      tap(updateState => {
        if (this.updateState === ApiState.Requesting && updateState === ApiState.Succeeded) {
          this.onCancelEdit();
        }

        this.updateState = updateState;
      })
    ).subscribe();

    this.store.deleteState$.pipe(
      takeUntilDestroyed(),
      tap(deleteState => {
        if (this.deleteState === ApiState.Requesting && deleteState === ApiState.Succeeded) {
          this.router.navigate(['../'], { relativeTo: this.activatedRoute });
        }

        this.deleteState = deleteState;
      })
    ).subscribe();
  }

  onUpdate(model: TUpdateEntity) {
    this.store.update({ id: this.entity!.id, entity: model });
  }

  onEdit() {
    this.isEditing = true;
  }

  onCancelEdit() {
    this.isEditing = false;
  }

  onDelete() {
    this.store.delete(this.entity!.id);
  }
}
