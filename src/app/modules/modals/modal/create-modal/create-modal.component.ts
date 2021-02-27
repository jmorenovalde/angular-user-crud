import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../modal.service';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['../modal.component.scss'],
})
export class CreateModalComponent implements OnInit {
  /**
   * @ignore
   * The constructor of the component.
   */
  constructor(private modalService: ModalService) {}

  /**
   * @ignore
   * The init method of the component life cycle hook.
   */
  ngOnInit(): void {}

  /**
   * This method close the modal window.
   */
  public close(): void {
    this.modalService.close();
  }
}
