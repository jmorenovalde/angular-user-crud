import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { UsersService } from 'src/app/modules/users/users.service';
import { click } from 'src/app/utils/test-utils';
import { ModalService } from '../../modal.service';

import { CreateModalComponent } from './create-modal.component';

describe('CreateModalComponent', () => {
  let component: CreateModalComponent;
  let fixture: ComponentFixture<CreateModalComponent>;
  let el: DebugElement;
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
    el = fixture.debugElement;
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
    it('should be closed the modal because the form is valid', () => {
      component.userForm.get('userName').setValue('Name');
      component.userForm.get('userEmail').setValue('name@domain.com');
      component.userForm.get('userDepartment').setValue('Marketing');
      component.save();
      expect(usersService.createUser).toHaveBeenCalled();
    });

    it('should not be closed the modal because the form is not valid', () => {
      component.onBlurUerName();
      fixture.detectChanges();
      expect(component.isNameInalid).toBeTruthy('The name is valid');
      expect(component.userForm.invalid).toBeTruthy('The form is valid');
      component.save();
      fixture.detectChanges();
      expect(component.saveDisabled).toBeTruthy('Not enter at save function');
      expect(component.userForm.invalid).toBeTruthy('The form is valid');
    });
  });

  describe('view', () => {
    it('it the form is empty, the save button is disabled', () => {
      const buttonSave = el.query(By.css('.btn-primary'));
      expect(buttonSave).toBeTruthy();
      expect(buttonSave.nativeElement.enabled).toBeFalsy();
    });

    it('it the form has an invalid email, the save button is disabled', fakeAsync(() => {
      component.userForm.get('userEmail').setValue('error@email');
      flush();
      const buttonSave = el.query(By.css('.btn-primary'));
      expect(buttonSave).toBeTruthy();
      expect(buttonSave.nativeElement.enabled).toBeFalsy();
    }));

    it('it the form has a name and a valid email, the save button is enabled', fakeAsync(() => {
      component.userForm.get('userName').setValue('Name');
      component.userForm.get('userEmail').setValue('error@email.com');
      component.userForm.markAsDirty();
      flush();
      expect(component.userForm.valid).toBeTruthy('The form is invalid');
      fixture.detectChanges();
      const buttonSave = el.query(By.css('.btn-primary'));
      expect(buttonSave).toBeTruthy();
      expect(buttonSave.nativeElement.disabled).toBeFalsy('the button is disabled');
      click(buttonSave);
      fixture.detectChanges();
      flush();
      expect(usersService.createUser).toHaveBeenCalled();
    }));

    it('the department combo should be have only two options', () => {
      const department = el.query(By.css('#department'));
      expect(department.nativeElement.options.length).toBe(3);
      expect(department.nativeElement.options[0].value).toEqual('-1');
      expect(department.nativeElement.options[1].value).toEqual('Marketing');
      expect(department.nativeElement.options[2].value).toEqual('Development');
    });

    it('click on close buton and modoal should be closed', () => {
      const buttonCancel = el.query(By.css('.btn-light'));
      expect(buttonCancel).toBeTruthy();
      click(buttonCancel);
      fixture.detectChanges();
      expect(modalService.close).toHaveBeenCalled();
    });
  });
});
