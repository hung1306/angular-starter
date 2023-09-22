import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable, tap } from 'rxjs';

import { AppState, authActions, authSelectors } from '@app/store';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard {

  constructor(private readonly _store: Store<AppState>) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._canActivate();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._canActivate();
  }

  private _canActivate(): Observable<boolean> {
    return this._store.pipe(
      select(authSelectors.selectIsLoggedIn),
      tap(canActivate => {
        if (!canActivate) {
          this._store.dispatch(authActions.logout());
        }
      })
    );
  }

}
