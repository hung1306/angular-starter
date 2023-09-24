import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { select, Store } from '@ngrx/store';

import { tap } from 'rxjs';

import { NavigationRoutes, RegexPatterns } from '@app/const';
import { ApiState } from '@app/models';
import { AppState, authActions, authSelectors } from '@app/store';
import { ValidationUtils } from '@app/utils';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  NavigationRoutes = NavigationRoutes;
  ApiState = ApiState;

  isPasswordHidden = true;
  formGroup: FormGroup;
  username: string;
  code: string;
  resetPasswordState: ApiState = ApiState.Idle;

  get passwordFormControl(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }

  get confirmPasswordFormControl(): FormControl {
    return this.formGroup.get('confirmPassword') as FormControl;
  }

  get passwordInputType(): string {
    return this.isPasswordHidden ? 'password' : 'text';
  }

  constructor(
    private readonly _store: Store<AppState>,
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
  ) {
    this.formGroup = this._formBuilder.group(
      {
        password: this._formBuilder.control<string | undefined>(undefined, [Validators.required, Validators.pattern(RegexPatterns.Password)]),
        confirmPassword: this._formBuilder.control<string | undefined>(undefined, [Validators.required, Validators.pattern(RegexPatterns.Password)]),

      },
      { validators: ValidationUtils.passwordsMatchValidator }
    );

    this.username = this._route.snapshot.queryParams['username'];
    this.code = this._route.snapshot.queryParams['code'];

    if (!this.username || !this.code) {
      this._router.navigate(NavigationRoutes.AuthLogin);
    }

    this.selectData();
  }

  selectData() {
    this._store.pipe(
      select(authSelectors.selectResetPasswordState),
      takeUntilDestroyed(),
      tap(resetPasswordState => this.resetPasswordState = resetPasswordState),
    ).subscribe();
  }

  onTogglePasswordVisibility() {
    this.isPasswordHidden = !this.isPasswordHidden;
  }

  onResetPassword() {
    if (this.formGroup.invalid) {
      return;
    }

    this._store.dispatch(authActions.resetPassword({
      model: {
        username: this.username,
        code: this.code,
        password: this.passwordFormControl.value,
      }
    }));
  }
}
