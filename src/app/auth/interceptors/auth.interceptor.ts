import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { select, Store } from '@ngrx/store';

import { Observable, take, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { environment } from '@app/env';
import { AppState, authActions, authSelectors } from '@app/store';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly _store: Store<AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this._store.pipe(
      select(authSelectors.selectToken),
      take(1),
      switchMap(token => this._processRequest(req, next, token))
    );
  }

  private _processRequest(req: HttpRequest<any>, next: HttpHandler, token?: string): Observable<HttpEvent<any>> {
    req = this._cloneRequestWithAuthHeader(req, token);

    return next.handle(req).pipe(
      catchError(error => {
        return this._handleResponseError(error);
      })
    );
  }

  private _cloneRequestWithAuthHeader(req: HttpRequest<any>, token?: string) {
    if (!!token && this._isTargetingApi(req)) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      });
    }

    return req;
  }

  private _handleResponseError(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    switch (error.status) {
      case 401:
      case 403:
        this._logout();
        break;
    }

    return throwError(() => error);
  }

  private _logout() {
    this._store.dispatch(authActions.logout());
  }

  private _isTargetingApi(req: HttpRequest<any>) {
    return req.url.startsWith(environment.baseApi);
  }
}
