import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { ListComponent } from './list/list.component';
import { GridComponent } from './grid/grid.component';
import { UserGridDepartmentComponent } from './user-grid-department/user-grid-department.component';
import { UserGridDepartmentItemComponent } from './user-grid-department-item/user-grid-department-item.component';

@NgModule({
  declarations: [UsersComponent, ListComponent, GridComponent, UserGridDepartmentComponent, UserGridDepartmentItemComponent],
  exports: [UsersComponent],
  imports: [CommonModule],
})
export class UsersModule {}
