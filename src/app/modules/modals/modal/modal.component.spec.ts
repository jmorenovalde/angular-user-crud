import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { listUserDtoMock } from 'src/app/mockdata/users.mock.spec';
import { User } from 'src/app/models/user.model';
import { ModalService } from '../modal.service';
import { CreateModalComponent } from './create-modal/create-modal.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let el: DebugElement;
  let modalService: ModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent, CreateModalComponent, DeleteModalComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [ModalService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    modalService = TestBed.inject(ModalService);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('if the type is `create`, the expected result shows the `CreateModalCompoenet`', () => {
    modalService.type = 'create';
    fixture.detectChanges();
    const modalTitle = el.query(By.css('h3'));
    expect(modalTitle).toBeTruthy();
    expect(modalTitle.nativeElement.textContent).toContain('Add row');
  });

  it('if the type is `delete`, the expected result shows the `DeleteModalCompoenet`', () => {
    const user = new User();
    user.loadFromUserDto(listUserDtoMock[0]);
    modalService.type = 'delete';
    modalService.user = user;
    fixture.detectChanges();
    const modalTitle = el.query(By.css('h3'));
    expect(modalTitle).toBeTruthy();
    expect(modalTitle.nativeElement.textContent).toContain('Remove row');
  });
});
