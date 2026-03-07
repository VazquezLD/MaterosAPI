import {IsInt, IsPositive, IsString, Min, MinLength, IsBoolean, IsUrl, IsEnum, IsNotEmpty} from 'class-validator';
import { CategoriaProducto } from '../entities/categoria.enum';

export class CreateProductoDto {
    @IsString()
    @MinLength(3)
    nombre: string;

    @IsInt()
    @IsPositive()
    @Min(1)
    precio: number;

    @IsString()
    descripcion: string;

    @IsInt()
    @Min(0)
    stock: number;

    @IsNotEmpty()
    @IsEnum(CategoriaProducto, {
    message: `La categoría debe ser una de las siguientes: ${Object.values(CategoriaProducto).join(', ')}`
  })
    categoria: CategoriaProducto;

    @IsUrl()
    imagenUrl: string;

    @IsBoolean()
    activo: boolean;
}
