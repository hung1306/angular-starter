import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { Store } from '@ngrx/store';

import { take, tap } from 'rxjs';

import { AppState, authSelectors } from '@app/store';
import { Role } from '@app/models';
import { ArrayUtils } from '@app/utils';


@Directive({
  selector: '[hasRole]'
})
export class HasRoleDirective {
  private roles: Role[] = [];

  constructor(
    private readonly _store: Store<AppState>,
    private readonly _templateRef: TemplateRef<any>,
    private readonly _viewContainer: ViewContainerRef,
  ) {
  }

  @Input() set hasRole(role: Role | Role[] | undefined) {
    this.roles = ArrayUtils.toArray(role);

    this._updateView();
  }

  private _updateView() {
    this._store.select(authSelectors.selectInfo).pipe(
      take(1),
      tap(info => {
        if (!this.roles?.length || (!!info?.role && this._hasRole(info!.role))) {
          this._viewContainer.createEmbeddedView(this._templateRef);
        } else {
          this._viewContainer.clear();
        }
      }),
    ).subscribe();
  }

  private _hasRole(role: Role) {
    return this.roles?.includes(role);
  }
}
