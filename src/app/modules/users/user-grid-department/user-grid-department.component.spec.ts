import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserGridDepartmentItemComponent } from '../user-grid-department-item/user-grid-department-item.component';

import { UserGridDepartmentComponent } from './user-grid-department.component';

describe('UserGridDepartmentComponent', () => {
  let component: UserGridDepartmentComponent;
  let fixture: ComponentFixture<UserGridDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserGridDepartmentComponent, UserGridDepartmentItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGridDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
