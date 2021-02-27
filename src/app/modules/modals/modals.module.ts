import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { CreateModalComponent } from './modal/create-modal/create-modal.component';
import { DeleteModalComponent } from './modal/delete-modal/delete-modal.component';

@NgModule({
  declarations: [ModalComponent, CreateModalComponent, DeleteModalComponent],
  exports: [ModalComponent],
  imports: [CommonModule],
})
export class ModalsModule {}
