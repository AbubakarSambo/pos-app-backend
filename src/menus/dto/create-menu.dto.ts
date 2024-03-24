export class CreateMenuDto {
  name: string;
  price: string;
  description?: string;
  image?: string;
  categoryId: number;
  orgId: number;
}
