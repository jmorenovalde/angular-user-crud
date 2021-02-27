import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ModalService } from '../../modal.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['../modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  @Input() user: User;

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

  public delete(): void {
    // TODO: send delete comand to the backend service
    console.log('Delete user', this.user);
    this.modalService.close();
  }
}
