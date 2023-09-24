import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState, authSelectors } from '@app/store';
import { NavigationRoutes } from '@app/const';

@Injectable({
  providedIn: 'root'
})
export class IsNotLoggedInGuard {

  constructor(
    private readonly _store: Store<AppState>,
    private readonly _router: Router,
  ) {
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
      map(isLoggedIn => !isLoggedIn),
      tap(canActivate => {
        if (!canActivate) {
          this._router.navigate([NavigationRoutes.Empty]);
        }
      })
    );
  }

}
