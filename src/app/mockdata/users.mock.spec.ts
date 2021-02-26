import { UserDto } from '../models/user-dto.model';

export const listUserDtoMock: UserDto[] = [
  {
    id: 1,
    name: 'Justin',
    email: 'justin.fisher@mail.com',
    department: 'Marketing',
    created: new Date('2020-11-05T00:00:00'),
  },
  {
    id: 2,
    name: 'Sam',
    email: 'sam.black@mail.com',
    department: 'Development',
    created: new Date('2020-11-05T00:00:00'),
  },
  {
    id: 3,
    name: 'Mabel',
    email: 'mabel.cox@mail.com',
    department: 'Development',
    created: new Date('2020-11-06T00:00:00'),
  },
];
