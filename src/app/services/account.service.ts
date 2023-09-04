import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@app/env';
import { Account, AccountDto, fromAccountDto } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = `${environment.baseApi}/account`;

  constructor(private readonly _http: HttpClient) {
  }

  get(): Observable<Account> {
    return this._http.get<AccountDto>(this.baseUrl).pipe(
      map(dto => fromAccountDto(dto)),
    );
  }
}
