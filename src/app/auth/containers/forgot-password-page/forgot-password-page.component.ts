import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { NavigationRoutes } from '@app/const';
import { ApiState } from '@app/models';
import { AppState, authActions } from '@app/store';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss']
})
export class ForgotPasswordPageComponent {

  NavigationRoutes = NavigationRoutes;
  formGroup: FormGroup;
  ApiState = ApiState;
  resetPasswordState: ApiState = ApiState.Idle;

  get usernameFormControl(): FormControl {
    return this.formGroup.get('username') as FormControl;
  }

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _store: Store<AppState>,
  ) {

    this.formGroup = this._formBuilder.group(
      { username: this._formBuilder.control<string | undefined>(undefined, [Validators.required, Validators.email]) }
    );
  }

  onForgotPassword(): void {
    if (this.formGroup.invalid) {
      return;
    }
    const username = this.usernameFormControl.value;
    this._store.dispatch(authActions.sendResetEmail({ email: username }));
  }
}
