import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { select, Store } from '@ngrx/store';

import { tap } from 'rxjs';

import { AppState, authActions, authSelectors } from '@app/store';
import { NavigationRoutes, RegexPatterns } from '@app/const';
import { ApiState } from '@app/models';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  NavigationRoutes = NavigationRoutes;
  ApiState = ApiState;

  loginState: ApiState = ApiState.Idle;

  isPasswordHidden = true;

  formGroup: FormGroup;

  get usernameFormControl(): FormControl {
    return this.formGroup.get('username') as FormControl;
  }

  get passwordFormControl(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }

  get passwordInputType(): string {
    return this.isPasswordHidden ? 'password' : 'text';
  }

  constructor(
    private readonly _store: Store<AppState>,
    private readonly _formBuilder: FormBuilder,
  ) {
    this.formGroup = this._formBuilder.group({
      username: this._formBuilder.control<string | undefined>(undefined, [Validators.required, Validators.email]),
      password: this._formBuilder.control<string | undefined>(undefined, [Validators.required, Validators.pattern(RegexPatterns.Password)]),
    });

    this.selectData();
  }

  selectData() {
    this._store.pipe(
      select(authSelectors.selectLoginState),
      takeUntilDestroyed(),
      tap(loginState => this.loginState = loginState),
    ).subscribe();
  }

  onLogin() {
    if (this.formGroup.invalid) {
      return;
    }

    this._store.dispatch(authActions.login({
      request: {
        username: this.usernameFormControl.value,
        password: this.passwordFormControl.value,
      },
    }));
  }

  onTogglePasswordVisibility() {
    this.isPasswordHidden = !this.isPasswordHidden;
  }
}
