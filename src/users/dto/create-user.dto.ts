export class CreateUserDto {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  role: string;
  isAdmin: boolean;
}
