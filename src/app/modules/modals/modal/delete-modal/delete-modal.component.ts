import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/modules/users/users.service';
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
  constructor(private modalService: ModalService, private usersService: UsersService) {}

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
    this.usersService.deleteUser(this.user.id);
  }
}
