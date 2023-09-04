import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ApiState, Status, UpsertUser, User } from '@app/models';
import { RegexPatterns } from '@app/const';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnChanges {
  @Input() user?: User;
  @Input() state?: ApiState;

  @Output() save = new EventEmitter<UpsertUser>();
  @Output() cancel = new EventEmitter();

  ApiState = ApiState;

  formGroup: FormGroup;
  isPasswordHidden = true;

  get usernameFormControl(): FormControl {
    return this.formGroup.get('username') as FormControl;
  }

  get firstnameFormControl(): FormControl {
    return this.formGroup.get('firstname') as FormControl;
  }

  get lastnameFormControl(): FormControl {
    return this.formGroup.get('lastname') as FormControl;
  }

  get passwordFormControl(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }

  get phoneNumberFormControl(): FormControl {
    return this.formGroup.get('phoneNumber') as FormControl;
  }

  get statusFormControl(): FormControl {
    return this.formGroup.get('status') as FormControl;
  }

  get passwordInputType(): string {
    return this.isPasswordHidden ? 'password' : 'text';
  }

  constructor(private readonly _formBuilder: FormBuilder) {
    this.formGroup = this._formBuilder.group({
      username: this._formBuilder.control<string | undefined>(undefined, [Validators.required, Validators.email]),
      firstname: this._formBuilder.control<string | undefined>(undefined, [Validators.required]),
      lastname: this._formBuilder.control<string | undefined>(undefined, [Validators.required]),
      password: this._formBuilder.control<string | undefined>(undefined, [Validators.required, Validators.pattern(RegexPatterns.Password)]),
      phoneNumber: this._formBuilder.control<string | undefined>(undefined, [Validators.required, Validators.pattern(RegexPatterns.PhoneNumber)]),
      status: this._formBuilder.control<boolean | undefined>(true, [Validators.required]),
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user']) {
      this._setFormValue();
    }
  }

  onTogglePasswordVisibility() {
    this.isPasswordHidden = !this.isPasswordHidden;
  }

  onSave() {
    if (this.formGroup.invalid) {
      return;
    }

    this.save.emit({
      username: this.usernameFormControl.value,
      firstname: this.firstnameFormControl.value,
      lastname: this.lastnameFormControl.value,
      password: this.passwordFormControl.value,
      phoneNumber: this.phoneNumberFormControl.value,
      status: this.statusFormControl.value ? Status.Active : Status.Inactive,
    });
  }

  onCancel() {
    this.cancel.emit();
  }

  private _setFormValue() {
    this.formGroup.patchValue({
      username: this.user?.username,
      firstname: this.user?.firstname,
      lastname: this.user?.lastname,
      password: undefined,
      phoneNumber: this.user?.phoneNumber,
      status: !!this.user ? this.user.status === Status.Active : true,
    });

    if (!!this.user) {
      this.passwordFormControl.disable();
    }
  }
}
