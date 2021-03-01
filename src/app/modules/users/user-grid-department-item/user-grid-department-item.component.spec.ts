import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { listUserDtoMock } from 'src/app/mockdata/users.mock.spec';
import { User } from 'src/app/models/user.model';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

import { UserGridDepartmentItemComponent } from './user-grid-department-item.component';

describe('UserGridDepartmentItemComponent', () => {
  let component: UserGridDepartmentItemComponent;
  let fixture: ComponentFixture<UserGridDepartmentItemComponent>;
  let el: DebugElement;

  const today = new Date();
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserGridDepartmentItemComponent],
      imports: [PipesModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGridDepartmentItemComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('view', () => {
    beforeEach(() => {
      const user = new User();
      user.loadFromUserDto(listUserDtoMock[0]);
      component.user = user;
      fixture.detectChanges();
    });

    it('the value of name will be `Justin`', () => {
      const name = el.query(By.css('.user--name'));
      expect(name.nativeElement.textContent).toEqual('Justin');
    });

    it('the value of email will be `justin.fisher@mail.com`', () => {
      const email = el.query(By.css('.user--email'));
      expect(email.nativeElement.textContent).toEqual('justin.fisher@mail.com');
    });

    it('if created today the experience will be Experienced', () => {
      const userDto = listUserDtoMock[0];
      userDto.created = todayDate;
      component.user.loadFromUserDto(userDto);
      fixture.detectChanges();
      const experienced = el.query(By.css('.user-experince'));
      console.log(experienced.nativeElement);
      expect(experienced.nativeElement.textContent).toEqual('Experienced');
    });

    it('if created yesterday the experience will be Experienced', () => {
      const userDto = listUserDtoMock[0];
      userDto.created = new Date(new Date(todayDate).setDate(todayDate.getDate() - 1));
      component.user.loadFromUserDto(userDto);
      fixture.detectChanges();
      const experienced = el.query(By.css('.experienced'));
      expect(experienced.nativeElement.textContent).toEqual('Experienced');
    });

    it('if created 2 days before the experience will be Advanced', () => {
      const userDto = listUserDtoMock[0];
      userDto.created = new Date(new Date(todayDate).setDate(todayDate.getDate() - 2));
      component.user.loadFromUserDto(userDto);
      fixture.detectChanges();
      const experienced = el.query(By.css('.advanced'));
      expect(experienced.nativeElement.textContent).toEqual('Advanced');
    });

    it('if created 3 days before the experience will be Senior', () => {
      const userDto = listUserDtoMock[0];
      userDto.created = new Date(new Date(todayDate).setDate(todayDate.getDate() - 3));
      component.user.loadFromUserDto(userDto);
      fixture.detectChanges();
      const experienced = el.query(By.css('.senior'));
      expect(experienced.nativeElement.textContent).toEqual('Senior');
    });

    it('if created more than 4 days before the experience will be Expert', () => {
      const userDto = listUserDtoMock[0];
      userDto.created = new Date(new Date(todayDate).setDate(todayDate.getDate() - 4));
      component.user.loadFromUserDto(userDto);
      fixture.detectChanges();
      const experienced = el.query(By.css('.expert'));
      expect(experienced.nativeElement.textContent).toEqual('Expert');
    });
  });
});
