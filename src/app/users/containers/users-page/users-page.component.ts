import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { tap } from 'rxjs';

import {
  CreateUser,
  CreateUserDto,
  ListUsersFilter,
  ListUsersQueryParams,
  Status,
  toUserDatatable,
  UpdateUser,
  UpdateUserDto,
  User,
  UserDatatable,
  UserDto
} from '@app/models';
import { UsersState } from '@app/store';
import { BaseEntitiesComponent } from '@app/components';

import { UsersComponentState, UsersStore } from '../../store';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  providers: [UsersStore],
})
export class UsersPageComponent extends BaseEntitiesComponent<
  UsersComponentState,
  UserDatatable,
  User,
  UserDto,
  ListUsersQueryParams,
  ListUsersFilter,
  UsersState,
  CreateUser,
  CreateUserDto,
  UpdateUser,
  UpdateUserDto
> {

  displayedColumns: string[] = ['username', 'name', 'phoneNumber', 'status', 'createdDate', 'updatedDate', 'actions'];

  buildFilterFormGroup(): FormGroup {
    return this.formBuilder.group({
      searchQuery: this.formBuilder.control<string | undefined>(undefined),
      status: this.formBuilder.control<string | Status | undefined>(this.FilterUtils.AllValue),
    });
  }

  toDatatable(entity: User): UserDatatable {
    return toUserDatatable(entity);
  }

  getListFilter(): ListUsersFilter {
    return {
      searchQuery: this.searchQueryFormControl.value || undefined,
      status: this.FilterUtils.getFilterValue<Status>(this.statusFormControl.value),
    };
  }

  setFilterFormValue(): void {
    this.filterFormGroup.patchValue({
      searchQuery: this.filter?.searchQuery,
      status: this.filter?.status || this.FilterUtils.AllValue,
    }, { emitEvent: false });
  }

  resetFilterFormValue(): void {
    this.filterFormGroup.patchValue({
      searchQuery: undefined,
      status: this.FilterUtils.AllValue,
    }, { emitEvent: false });
  }

  Statuses: Status[] = Object.values(Status);

  get statusFormControl(): FormControl {
    return this.filterFormGroup.get('status') as FormControl;
  }

  constructor(
    store: UsersStore,
    formBuilder: FormBuilder,
  ) {
    super(store, formBuilder);
  }

  override ngOnInit() {
    super.ngOnInit();

    this.statusFormControl.valueChanges.pipe(
      tap(() => this.onChangeFilter()),
    ).subscribe();
  }
}
