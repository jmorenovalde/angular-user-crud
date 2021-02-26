import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { ListComponent } from './list/list.component';
import { GridComponent } from './grid/grid.component';

@NgModule({
  declarations: [UsersComponent, ListComponent, GridComponent],
  exports: [UsersComponent],
  imports: [CommonModule],
})
export class UsersModule {}
