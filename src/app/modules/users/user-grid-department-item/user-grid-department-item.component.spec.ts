import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

import { UserGridDepartmentItemComponent } from './user-grid-department-item.component';

describe('UserGridDepartmentItemComponent', () => {
  let component: UserGridDepartmentItemComponent;
  let fixture: ComponentFixture<UserGridDepartmentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserGridDepartmentItemComponent],
      imports: [PipesModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGridDepartmentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
