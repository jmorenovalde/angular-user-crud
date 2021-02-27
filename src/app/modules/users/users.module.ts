import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserGridComponent } from './user-grid/user-grid.component';
import { UserGridDepartmentComponent } from './user-grid-department/user-grid-department.component';
import { UserGridDepartmentItemComponent } from './user-grid-department-item/user-grid-department-item.component';
import { UserListItemComponent } from './user-list-item/user-list-item.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UsersComponent,
    UserListComponent,
    UserGridComponent,
    UserGridDepartmentComponent,
    UserGridDepartmentItemComponent,
    UserListItemComponent,
  ],
  exports: [UsersComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class UsersModule {}
