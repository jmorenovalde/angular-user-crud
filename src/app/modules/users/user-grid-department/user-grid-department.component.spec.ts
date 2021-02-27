import { ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { listUserDtoMock } from 'src/app/mockdata/users.mock.spec';
import { User } from 'src/app/models/user.model';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { UserGridDepartmentItemComponent } from '../user-grid-department-item/user-grid-department-item.component';

import { UserGridDepartmentComponent } from './user-grid-department.component';

describe('UserGridDepartmentComponent', () => {
  let component: UserGridDepartmentComponent;
  let fixture: ComponentFixture<UserGridDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserGridDepartmentComponent, UserGridDepartmentItemComponent],
      imports: [PipesModule, ReactiveFormsModule],
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

  describe('Search', () => {
    beforeEach(() => {
      const usesList: User[] = [];
      listUserDtoMock.forEach((userDto) => {
        const user = new User();
        user.loadFromUserDto(userDto);
        usesList.push(user);
      });
      component.users = usesList;
    });

    it('search an user whos name is `Justin', fakeAsync(() => {
      component.ngOnInit();
      component.formSearch.get('search').setValue('Justin');
      fixture.detectChanges();
      tick(500);
      expect(component.usersToShow?.length).toEqual(1);
    }));

    it('search an user whos email is `mabel.cox@mail.com', fakeAsync(() => {
      component.ngOnInit();
      component.formSearch.get('search').setValue('Justin');
      fixture.detectChanges();
      tick(500);
      expect(component.usersToShow?.length).toEqual(1);
    }));

    it('resest search or search value equal to empty string', fakeAsync(() => {
      component.ngOnInit();
      component.formSearch.get('search').setValue('');
      fixture.detectChanges();
      tick(500);
      expect(component.usersToShow?.length).toEqual(7);
    }));
  });
});
