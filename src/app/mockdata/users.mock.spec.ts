import { UserDto } from '../models/user-dto.model';

const today = new Date();
const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);

export const listUserDtoMock: UserDto[] = [
  {
    id: 1,
    name: 'Justin',
    email: 'justin.fisher@mail.com',
    department: 'Marketing',
    created: new Date(new Date(todayDate).setDate(todayDate.getDate() - 5)),
  },
  {
    id: 2,
    name: 'Sam',
    email: 'sam.black@mail.com',
    department: 'Development',
    created: new Date(new Date(todayDate).setDate(todayDate.getDate() - 3)),
  },
  {
    id: 3,
    name: 'Mabel',
    email: 'mabel.cox@mail.com',
    department: 'Development',
    created: new Date(new Date(todayDate).setDate(todayDate.getDate() - 2)),
  },
  {
    id: 4,
    name: 'Sean',
    email: 'sean.wellington@mail.com',
    department: 'Marketing',
    created: new Date(new Date(todayDate).setDate(todayDate.getDate() - 1)),
  },
  {
    id: 5,
    name: 'Allie',
    email: 'allie.lopez@mail.com',
    department: 'Development',
    created: todayDate,
  },
  {
    id: 6,
    name: 'Nannie',
    email: 'nannie.park@mail.com',
    department: 'Marketing',
    created: new Date(new Date(todayDate).setDate(todayDate.getDate() - 2)),
  },
  {
    id: 8,
    name: 'Louis',
    email: 'lous@domain.com',
    department: 'Marketing',
    created: todayDate,
  },
];
