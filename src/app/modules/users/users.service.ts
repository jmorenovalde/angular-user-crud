import { Injectable } from '@angular/core';
import { UserDto } from '../../models/user-dto.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public users: UserDto[];

  constructor() {}
}
