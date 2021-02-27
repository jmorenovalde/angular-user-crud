import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-grid-department',
  templateUrl: './user-grid-department.component.html',
  styleUrls: ['./user-grid-department.component.scss'],
})
export class UserGridDepartmentComponent implements OnInit, OnDestroy {
  /**
   * The department neme
   */
  @Input() department: string;

  @Input() users: User[];

  public usersToShow: User[] = [];

  public formSearch: FormGroup;

  /**
   * This varible is used to unsuscribe the subscriptions on the ngOnDestroy method.
   */
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();

  /**
   * @ignore
   * The constructor of the component.
   */
  constructor() {}

  /**
   * @ignore
   * The init method of the component life cycle hook.
   */
  ngOnInit(): void {
    if (this.users?.length > 0) {
      this.usersToShow.push(...this.users);
    }
    this.initFormSearch();
  }

  /**
   * @ignore
   * Component lifecycle that runs when the component is going to destroy.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

  /**
   * this metho init the serarch form.
   */
  private initFormSearch(): void {
    this.formSearch = new FormGroup({
      search: new FormControl(''),
    });

    this.formSearch.valueChanges
      .pipe(takeUntil(this.unsubscribe$), debounceTime(250))
      .subscribe((value) => this.filterUsers(value));
  }

  private filterUsers(value: string) {
    if (value.search) {
      this.usersToShow = this.users.filter(
        (user) =>
          user.name.toLocaleLowerCase().includes(value.search.toString().toLocaleLowerCase()) ||
          user.email.toLocaleLowerCase().includes(value.search.toString().toLocaleLowerCase())
      );
    } else if (value.search.toString() === '') {
      this.usersToShow = [];
      this.usersToShow.push(...this.users);
    }
  }
}
