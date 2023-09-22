import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '@app/env';
import { LoginRequest, LoginResponse } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = `${environment.baseApi}/auth`;

  constructor(private readonly _http: HttpClient) {
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(`${this.baseUrl}/login`, request);
  }


}
