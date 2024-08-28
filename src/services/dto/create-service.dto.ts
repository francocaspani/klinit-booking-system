import {
  IsBoolean,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum Category {
  Comercial = 'commercial',
  Residential = 'residential',
}

export class CreateServiceDto {
  @IsEmpty()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  durationInMinutes: number;

  @IsNotEmpty()
  @IsEnum(Category)
  category: Category;

  @IsBoolean()
  @IsOptional()
  isAvailable: boolean;
}
