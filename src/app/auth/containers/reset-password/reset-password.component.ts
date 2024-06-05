<<<<<<< HEAD
import { NavigationRoutes, RegexPatterns } from '@app/const';
import { ApiState } from '@app/models';
import { AppState, authActions } from '@app/store';

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';

=======
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { select, Store } from '@ngrx/store';

import { tap } from 'rxjs';

import { NavigationRoutes, RegexPatterns } from '@app/const';
import { ApiState } from '@app/models';
import { AppState, authActions, authSelectors } from '@app/store';
>>>>>>> 684206b7507b0264ec2ecfec12b116b68292bdd8
import { ValidationUtils } from '@app/utils';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  NavigationRoutes = NavigationRoutes;
  ApiState = ApiState;
<<<<<<< HEAD
  isPasswordHidden = true;
  formGroup: FormGroup;
  username = '';
  code = '';
=======

  isPasswordHidden = true;
  formGroup: FormGroup;
  username: string;
  code: string;
  resetPasswordState: ApiState = ApiState.Idle;
>>>>>>> 684206b7507b0264ec2ecfec12b116b68292bdd8

  get passwordFormControl(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }

  get confirmPasswordFormControl(): FormControl {
    return this.formGroup.get('confirmPassword') as FormControl;
  }

<<<<<<< HEAD
  constructor(
    private readonly _store: Store<AppState>,
    private readonly _formBuilder: FormBuilder,
=======
  get passwordInputType(): string {
    return this.isPasswordHidden ? 'password' : 'text';
  }

  constructor(
    private readonly _store: Store<AppState>,
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
>>>>>>> 684206b7507b0264ec2ecfec12b116b68292bdd8
    private readonly _route: ActivatedRoute,
  ) {
    this.formGroup = this._formBuilder.group(
      {
        password: this._formBuilder.control<string | undefined>(undefined, [Validators.required, Validators.pattern(RegexPatterns.Password)]),
        confirmPassword: this._formBuilder.control<string | undefined>(undefined, [Validators.required, Validators.pattern(RegexPatterns.Password)]),

      },
      { validators: ValidationUtils.passwordsMatchValidator }
    );
<<<<<<< HEAD
  }

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      this.username = params['username'];
      this.code = params['code'];
    });
=======

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
>>>>>>> 684206b7507b0264ec2ecfec12b116b68292bdd8
  }

  onTogglePasswordVisibility() {
    this.isPasswordHidden = !this.isPasswordHidden;
  }

<<<<<<< HEAD
  get passwordInputType(): string {
    return this.isPasswordHidden ? 'password' : 'text';
  }

=======
>>>>>>> 684206b7507b0264ec2ecfec12b116b68292bdd8
  onResetPassword() {
    if (this.formGroup.invalid) {
      return;
    }
<<<<<<< HEAD
    const confirmPassword = this.confirmPasswordFormControl.value;
    this._store.dispatch(authActions.confirmResetPassword({
      resetPassword: {
        username: this.username,
        password: confirmPassword,
        code: this.code
=======

    this._store.dispatch(authActions.resetPassword({
      model: {
        username: this.username,
        code: this.code,
        password: this.passwordFormControl.value,
>>>>>>> 684206b7507b0264ec2ecfec12b116b68292bdd8
      }
    }));
  }
}
