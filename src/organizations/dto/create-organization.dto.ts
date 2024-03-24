export class CreateOrganizationDto {
  name: string;
  location: string;
  address: string;
  phone: string;
  logo?: null | string;

  constructor(
    name: string,
    location: string,
    address: string,
    phone: string,
    logo?: null | string,
  ) {
    this.name = name;
    this.location = location;
    this.address = address;
    this.phone = phone;
    this.logo = logo;
  }
}
