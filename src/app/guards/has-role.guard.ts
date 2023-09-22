import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState, authSelectors } from '@app/store';
import { AuthInfo, Role } from '@app/models';
import { ArrayUtils } from '../utils/array.utils';


@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard {
  constructor(private readonly _store: Store<AppState>,
              private readonly _router: Router,) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._canActivate(route);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._canActivate(childRoute);
  }


  private _canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const roleData: Role | Role[] | undefined = (route.data as any).role;
    const roles: Role[] = ArrayUtils.toArray(roleData);

    return this._store.select(authSelectors.selectInfo).pipe(map((info: AuthInfo | undefined) => {
      if (roles?.includes(info!.role)) {
        return true;
      }

      this._router.navigate(['']);
      return false;
    }));

  }
}
