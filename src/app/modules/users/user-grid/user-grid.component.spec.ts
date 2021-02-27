import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserGridDepartmentItemComponent } from '../user-grid-department-item/user-grid-department-item.component';
import { UserGridDepartmentComponent } from '../user-grid-department/user-grid-department.component';

import { UserGridComponent } from './user-grid.component';

describe('UserGridComponent', () => {
  let component: UserGridComponent;
  let fixture: ComponentFixture<UserGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserGridComponent, UserGridDepartmentComponent, UserGridDepartmentItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
