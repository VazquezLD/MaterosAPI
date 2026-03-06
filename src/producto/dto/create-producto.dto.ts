import {IsInt, IsPositive, IsString, Min, MinLength, IsBoolean, IsUrl} from 'class-validator';

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

    @IsString()
    categoria: string;

    @IsUrl()
    imagenUrl: string;

    @IsBoolean()
    activo: boolean;
}
