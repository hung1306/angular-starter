import { Injectable } from '@angular/core';
import { environment } from '@app/env';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  baseUrl = `${environment.baseApi}/auth`;

  sendResetPasswordEmail(username: string): Observable<any> {

    const data = { username: username };
    return this._http.post(`${this.baseUrl}/forgot-password`, data);
  }

  confirmResetPassword(userName: string, newPassword: string, code: string): Observable<any> {

    const data = { username: userName, password: newPassword, code: code };
    return this._http.post(`${this.baseUrl}/reset-password`, data);

  }

  constructor(private readonly _http: HttpClient) {
  }

}
