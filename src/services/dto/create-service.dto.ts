export type Category = 'comercial' | 'residential';

export class CreateServiceDto {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: Category;
  isAvailable: boolean;
}
