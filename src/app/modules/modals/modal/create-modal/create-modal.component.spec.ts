import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersService } from 'src/app/modules/users/users.service';
import { ModalService } from '../../modal.service';

import { CreateModalComponent } from './create-modal.component';

describe('CreateModalComponent', () => {
  let component: CreateModalComponent;
  let fixture: ComponentFixture<CreateModalComponent>;
  let modalService: any;
  let usersService: any;

  const modalServiceStub = jasmine.createSpyObj('ModalService', ['close']);
  const usersServiceStub = jasmine.createSpyObj('UsersService', ['createUser']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateModalComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: ModalService, useValue: modalServiceStub },
        { provide: UsersService, useValue: usersServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateModalComponent);
    modalService = TestBed.inject(ModalService);
    usersService = TestBed.inject(UsersService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close the modal window', () => {
    component.close();
    expect(modalService.close).toHaveBeenCalled();
  });

  describe('onBlurUerName', () => {
    it('check the name when the field is not touched', () => {
      component.onBlurUerName();
      expect(component.isNameInalid).toBeTruthy();
    });

    it('check the name when the field is touched and is valid', () => {
      component.userForm.get('userName').setValue('name');
      component.onBlurUerName();
      expect(component.isNameInalid).toBeFalsy();
    });
  });

  describe('save', () => {
    it('should not be closed the modal because the form is not valid', () => {
      component.userForm.get('userName').setValue('');
      component.userForm.get('userEmail').setValue('invalid@fasdf');
      component.onBlurUerName();
      expect(component.isNameInalid).toBeTruthy('The name is valid');
      component.save();
      expect(usersService.createUser).not.toHaveBeenCalled();
    });

    it('should be closed the modal because the form is valid', () => {
      component.userForm.get('userName').setValue('Name');
      component.userForm.get('userEmail').setValue('name@domain.com');
      component.userForm.get('userDepartment').setValue('Marketing');
      component.save();
      expect(usersService.createUser).toHaveBeenCalled();
    });
  });
});
