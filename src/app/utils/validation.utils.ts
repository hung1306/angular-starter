import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

export class ValidationUtils {
  static passwordsMatchValidator: ValidatorFn = (formGroup: AbstractControl) => {
    const passwordFormControl = formGroup.get('password') as FormControl;
    const confirmPasswordFormControl = formGroup.get('confirmPassword') as FormControl;

    return passwordFormControl.value === confirmPasswordFormControl.value
      ? null
      : { passwordsNotMatch: true };
  };
}
