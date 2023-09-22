import { Component } from '@angular/core';
import { NavigationRoutes, RegexPatterns } from '@app/const';
import { ApiState } from '@app/models';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, resetActions } from '@app/store';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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
  username = '';
  code = '';

  get passwordFormControl(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }

  get confirmPasswordFormControl(): FormControl {
    return this.formGroup.get('confirmPassword') as FormControl;
  }

  constructor(
    private readonly _store: Store<AppState>,
    private readonly _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formGroup = this._formBuilder.group(
      {
        password: this._formBuilder.control<string | undefined>(undefined, [Validators.required, Validators.pattern(RegexPatterns.Password)]),
        confirmPassword: this._formBuilder.control<string | undefined>(undefined, [Validators.required, Validators.pattern(RegexPatterns.Password)]),

      },
      { validators: passwordsMatchValidator }
    );
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
      this.code = params['code'];
    });
  }

  onTogglePasswordVisibility() {
    this.isPasswordHidden = !this.isPasswordHidden;
  }

  get passwordInputType(): string {
    return this.isPasswordHidden ? 'password' : 'text';
  }

  onResetPassword() {
    console.log(this.formGroup.errors);
    if (this.formGroup.invalid) {
      return;
    }
    const confirmPassWord = this.confirmPasswordFormControl.value;
    this._store.dispatch(resetActions.confirmResetPassword({ userName: this.username, newPassword: confirmPassWord, code: this.code }));
    this.router.navigate(['auth/login']);
  }
}

const passwordsMatchValidator: ValidatorFn = (formGroup: AbstractControl) => {
  const passwordFormControl = formGroup.get('password') as FormControl;
  const confirmPasswordFormControl = formGroup.get('confirmPassword') as FormControl;

  return passwordFormControl.value === confirmPasswordFormControl.value
    ? null
    : { passwordsNotMatch: true };
};
