import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ModalService } from '../../modal.service';

import { DeleteModalComponent } from './delete-modal.component';

describe('DeleteModalComponent', () => {
  let component: DeleteModalComponent;
  let fixture: ComponentFixture<DeleteModalComponent>;
  let modalService: any;

  const modalServiceStub = jasmine.createSpyObj('ModalService', ['close']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteModalComponent],
      providers: [{ provide: ModalService, useValue: modalServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteModalComponent);
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

  // This test has fakeAsync while I development the `UsersService`.
  it('delete send the information to `UsersService` to delete and close the modal window.', fakeAsync(() => {
    // Temporaly while develop the `UsersService`.
    spyOn(console, 'log');
    component.delete();
    tick(1750);
    expect(console.log).toHaveBeenCalled();
    expect(modalService.close).toHaveBeenCalled();
  }));
});
