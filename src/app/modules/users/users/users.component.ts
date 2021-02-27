import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  /**
   * this property is used to decided whith is the content of the card (true: list. false: grid).
   */
  public showListOrGrid = false;

  constructor() {}

  ngOnInit(): void {}

  public toggleView(viewToShow: string): void {
    if (viewToShow === 'list') {
      this.showListOrGrid = true;
    } else {
      this.showListOrGrid = false;
    }
  }
}
