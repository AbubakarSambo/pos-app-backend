export class CreateRoleDto {
  name: string;
  orgId: number;

  constructor(name: string, orgId: number) {
    this.name = name;
    this.orgId = orgId;
  }
}
