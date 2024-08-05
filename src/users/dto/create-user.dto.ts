export type Role = 'worker' | 'client';

export class CreateUserDto {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  role: Role;
  isAdmin: boolean;
}
