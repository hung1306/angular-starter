import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '@app/env';
import { LoginRequest, LoginResponse, ResetPassword } from '@app/models';

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

<<<<<<< HEAD
  sendResetPasswordEmail(username: string): Observable<void> {
    return this._http.post<void>(`${this.baseUrl}/forgot-password`, { username: username });
  }

  confirmResetPassword(reset: ResetPassword): Observable<void> {
    return this._http.post<void>(`${this.baseUrl}/reset-password`, reset);
=======
  forgotPassword(username: string): Observable<void> {
    return this._http.post<void>(`${this.baseUrl}/forgot-password`, { username });
  }

  resetPassword(model: ResetPassword): Observable<void> {
    return this._http.post<void>(`${this.baseUrl}/reset-password`, model);
>>>>>>> 684206b7507b0264ec2ecfec12b116b68292bdd8
  }
}
