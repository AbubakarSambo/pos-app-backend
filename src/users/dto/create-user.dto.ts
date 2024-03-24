export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  orgId: number;
  roleId: number;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    orgId: number,
    roleId: number,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.orgId = orgId;
    this.roleId = roleId;
  }
}
