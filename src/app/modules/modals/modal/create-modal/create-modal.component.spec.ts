import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../../models/user.model';
import { ModalService } from '../../modal.service';

import { CreateModalComponent } from './create-modal.component';

describe('CreateModalComponent', () => {
  let component: CreateModalComponent;
  let fixture: ComponentFixture<CreateModalComponent>;
  let modalService: any;

  const modalServiceStub = jasmine.createSpyObj('ModalService', ['close']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateModalComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: ModalService, useValue: modalServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateModalComponent);
    modalService = TestBed.inject(ModalService);
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
    it('should not be emited isEditingMode with `false` value and the user does not exist', () => {
      component.save();
      fixture.detectChanges();
      expect(modalService.close).not.toHaveBeenCalled();
    });

    it('should be emited isEditingMode with `true` value and the user exists', fakeAsync(() => {
      component.userForm.get('userName').setValue('Name');
      component.userForm.get('userEmail').setValue('name@domain.com');
      component.userForm.get('userDepartment').setValue('Marketing');
      component.save();
      tick(2000);
      expect(modalService.close).toHaveBeenCalled();
    }));
  });
});
