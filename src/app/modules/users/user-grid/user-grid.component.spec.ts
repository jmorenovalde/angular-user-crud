import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { UserGridDepartmentItemComponent } from '../user-grid-department-item/user-grid-department-item.component';
import { UserGridDepartmentComponent } from '../user-grid-department/user-grid-department.component';
import { UsersService } from '../users.service';

import { UserGridComponent } from './user-grid.component';

describe('UserGridComponent', () => {
  let component: UserGridComponent;
  let fixture: ComponentFixture<UserGridComponent>;
  let usersService: any;

  const usersServiceStub = jasmine.createSpyObj('UsersService', ['loadUsers']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserGridComponent, UserGridDepartmentComponent, UserGridDepartmentItemComponent],
      imports: [HttpClientTestingModule, PipesModule, ReactiveFormsModule],
      providers: [{ provide: UsersService, useValue: usersServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGridComponent);
    usersService = TestBed.inject(UsersService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
