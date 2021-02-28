import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../modals/modal.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  /**
   * this property is used to decided whith is the content of the card (true: list. false: grid).
   */
  public showListOrGrid = true;

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
   * This method is used to change between the list view and the grid view.
   *
   * @param viewToShow the view to show
   */
  public toggleView(viewToShow: string): void {
    if (viewToShow === 'list') {
      this.showListOrGrid = true;
    } else {
      this.showListOrGrid = false;
    }
  }

  public openAddUser(): void {
    this.modalService.open('create');
  }
}
