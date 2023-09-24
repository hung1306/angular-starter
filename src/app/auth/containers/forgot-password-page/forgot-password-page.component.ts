import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { select, Store } from '@ngrx/store';

import { tap } from 'rxjs';

import { NavigationRoutes } from '@app/const';
import { ApiState } from '@app/models';
import { AppState, authActions, authSelectors } from '@app/store';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss']
})
export class ForgotPasswordPageComponent {

  NavigationRoutes = NavigationRoutes;
  ApiState = ApiState;

  formGroup: FormGroup;
  forgotPasswordState: ApiState = ApiState.Idle;

  get usernameFormControl(): FormControl {
    return this.formGroup.get('username') as FormControl;
  }

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _store: Store<AppState>,
  ) {
    this.formGroup = this._formBuilder.group({
      username: this._formBuilder.control<string | undefined>(undefined, [Validators.required, Validators.email]),
    });

    this.selectData();
  }

  selectData() {
    this._store.pipe(
      select(authSelectors.selectForgotPasswordState),
      takeUntilDestroyed(),
      tap(forgotPasswordState => this.forgotPasswordState = forgotPasswordState),
    ).subscribe();
  }

  onForgotPassword(): void {
    if (this.formGroup.invalid) {
      return;
    }

    this._store.dispatch(authActions.forgotPassword({
      username: this.usernameFormControl.value,
    }));
  }
}
