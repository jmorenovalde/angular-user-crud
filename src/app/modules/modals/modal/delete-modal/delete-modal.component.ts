import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ModalService } from '../../modal.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['../modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  /**
   * The user to delete
   */
  @Input() user: User;

  /**
   * This property is used to indicate that the delete process is running.
   */
  public isProcessing = false;

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
    this.isProcessing = true;
    // TODO: send delete comand to the backend service
    setTimeout(() => {
      console.log('Delete user', this.user);
      this.modalService.close();
    }, 1500);
  }
}
