import { UserDto } from './user-dto.model';

/**
 * This class is for show the user at list or grid.
 */
export class User {
  /**
   * The identity field of the user.
   */
  id?: number;
  /**
   * The name of the user.
   */
  name?: string;
  /**
   * The email of the user.
   */
  email?: string;
  /**
   * The department of the user
   * Aviable values: Marketing and Development.
   */
  department?: string;
  /**
   * The date time of the creation of the user in the system.
   */
  created?: Date;
  /**
   * To show the experience of the user at grid
   */
  experience: string;
  /**
   * This property is used in the list to indicates that this user is edit mode.
   */
  isEditing: boolean;

  constructor() {
    this.isEditing = false;
  }

  /**
   * Init the User from a UserDto
   * @param user
   */
  public loadFromUserDto(user: UserDto): void {
    if (user) {
      this.id = user.id;
      this.name = user.name;
      this.email = user.email;
      this.department = user.department;
      this.created = user.created ? new Date(user.created) : null;

      if (user.created) {
        const today = new Date();
        const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
        const diffTime = Math.abs(todayDate.getTime() - user.created.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        switch (diffDays) {
          case 0:
          case 1:
            this.experience = 'Experienced';
            break;
          case 2:
            this.experience = 'Advanced';
            break;
          case 3:
            this.experience = 'Senior';
            break;
          default:
            this.experience = 'Expert';
        }
      }
    }
  }
}
