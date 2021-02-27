import { UserDto } from './user-dto.model';
import { User } from './user.model';

describe('User', () => {
  describe('loadFromUserDto', () => {
    const today = new Date();
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);

    const mockUserDto: UserDto = {
      id: 1,
      name: 'Justin',
      email: 'justin.fisher@mail.com',
      department: 'Marketing',
      created: new Date(new Date(todayDate).setDate(todayDate.getDate() - 5)),
    };

    it('userDto is null or undefined', () => {
      const user = new User();
      user.loadFromUserDto(null);
      expect(user.id).toBeUndefined();
      expect(user.name).toBeUndefined();
      expect(user.email).toBeUndefined();
      expect(user.department).toBeUndefined();
      expect(user.created).toBeUndefined();
      expect(user.experience).toBeUndefined();
      expect(user.isEditing).toBeFalsy();
    });

    it('create an object with all elemement', () => {
      const user = new User();
      user.loadFromUserDto(mockUserDto);
      expect(user.id).toEqual(mockUserDto.id);
      expect(user.name).toBe(mockUserDto.name);
      expect(user.email).toBe(mockUserDto.email);
      expect(user.department).toBe(mockUserDto.department);
      expect(user.created).toEqual(mockUserDto.created);
      expect(user.isEditing).toBeFalsy();
    });

    it('create an object without name property', () => {
      const user = new User();
      const userDtoWithoutName = { ...mockUserDto };
      delete userDtoWithoutName.name;
      user.loadFromUserDto(userDtoWithoutName);
      expect(user.name).toBeUndefined();
    });

    it('create an object without `created` property, the property `experience` will be undefined', () => {
      const user = new User();
      const userDtoWithoutCreated = { ...mockUserDto };
      delete userDtoWithoutCreated.created;
      user.loadFromUserDto(userDtoWithoutCreated);
      expect(user.created).toBeNull();
      expect(user.experience).toBeUndefined();
    });

    it('create an object with `created` property equal to today, the property `experience` will be `Experienced`', () => {
      const userDto = { ...mockUserDto };
      userDto.created = todayDate;
      const user = new User();
      user.loadFromUserDto(userDto);
      expect(user.experience).toBe('Experienced');
    });

    it('create an object with `created` property equal to yesterday, the property `experience` will be `Experienced`', () => {
      const userDto = { ...mockUserDto };
      userDto.created = new Date(new Date(todayDate).setDate(todayDate.getDate() - 1));
      const user = new User();
      user.loadFromUserDto(userDto);
      expect(user.experience).toBe('Experienced');
    });

    it('create an object with `created` property equal to 2 days before the property `experience` will be `Advanced`', () => {
      const userDto = { ...mockUserDto };
      userDto.created = new Date(new Date(todayDate).setDate(todayDate.getDate() - 2));
      const user = new User();
      user.loadFromUserDto(userDto);
      expect(user.experience).toBe('Advanced');
    });

    it('create an object with `created` property equal to 3 days before the property `experience` will be `Senior`', () => {
      const userDto = { ...mockUserDto };
      userDto.created = new Date(new Date(todayDate).setDate(todayDate.getDate() - 3));
      const user = new User();
      user.loadFromUserDto(userDto);
      expect(user.experience).toBe('Senior');
    });

    it('create an object with `created` property equal to 4 or more days before the property `experience` will be `Expert`', () => {
      const userDto = { ...mockUserDto };
      userDto.created = new Date(new Date(todayDate).setDate(todayDate.getDate() - 4));
      const user = new User();
      user.loadFromUserDto(userDto);
      expect(user.experience).toBe('Expert');
    });
  });
});
