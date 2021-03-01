import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { listUserDtoMock } from 'src/app/mockdata/users.mock.spec';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/modules/users/users.service';
import { click } from 'src/app/utils/test-utils';
import { ModalService } from '../../modal.service';
import { DeleteModalComponent } from './delete-modal.component';

describe('DeleteModalComponent', () => {
  let component: DeleteModalComponent;
  let fixture: ComponentFixture<DeleteModalComponent>;
  let el: DebugElement;
  let modalService: any;
  let usersService: any;

  const modalServiceStub = jasmine.createSpyObj('ModalService', ['close']);
  const usersServiceStub = jasmine.createSpyObj('UsersService', ['deleteUser']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteModalComponent],
      providers: [
        { provide: ModalService, useValue: modalServiceStub },
        { provide: UsersService, useValue: usersServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteModalComponent);
    modalService = TestBed.inject(ModalService);
    usersService = TestBed.inject(UsersService);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    const userMock = new User();
    userMock.loadFromUserDto(listUserDtoMock[0]);
    component.user = userMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close the modal window', () => {
    component.close();
    expect(modalService.close).toHaveBeenCalled();
  });

  it('delete send the information to `UsersService` to delete and close the modal window.', () => {
    component.delete();
    expect(usersService.deleteUser).toHaveBeenCalled();
  });

  describe('view', () => {
    it('click on close buton and modoal should be closed', () => {
      const buttonCancel = el.query(By.css('.btn-light'));
      expect(buttonCancel).toBeTruthy();
      click(buttonCancel);
      fixture.detectChanges();
      expect(modalService.close).toHaveBeenCalled();
    });

    it('click boton delete and call delete method form UsersService', () => {
      const buttonDelete = el.query(By.css('.btn-danger'));
      expect(buttonDelete).toBeTruthy();
      click(buttonDelete);
      fixture.detectChanges();
      expect(usersService.deleteUser).toHaveBeenCalled();
    });

    it('fields will be disabled and the value shold be the same that the user', () => {
      const inputName = el.query(By.css('#name'));
      expect(inputName).toBeTruthy();
      expect(inputName.nativeElement.disabled).toBeTruthy();
      expect(inputName.nativeElement.value).toEqual(component.user.name);
      const inputEmail = el.query(By.css('#email'));
      expect(inputEmail).toBeTruthy();
      expect(inputEmail.nativeElement.disabled).toBeTruthy();
      expect(inputEmail.nativeElement.value).toEqual(component.user.email);
      const inputDepartment = el.query(By.css('#department'));
      expect(inputDepartment).toBeTruthy();
      expect(inputDepartment.nativeElement.disabled).toBeTruthy();
      expect(inputDepartment.nativeElement.value).toEqual(component.user.department);
    });
  });
});
