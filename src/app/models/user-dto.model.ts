/**
 * The User model from the Backend (Data Transfer Object).
 */
export interface UserDto {
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
}
