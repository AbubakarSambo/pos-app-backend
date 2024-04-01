export class CreateCustomerDto {
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  address?: string;

  constructor(firstName, lastName, phone, email, address) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
    this.address = address;
  }
}
