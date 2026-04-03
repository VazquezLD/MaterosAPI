import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator"
import { CategoriaProducto } from "src/producto/entities/categoria.enum";

export class PaginationDTO  {

    @IsOptional()
    @IsPositive()
    @IsNumber()
    @Min(1)
    limit?: number;

    @Min(0)
    @IsNumber()
    @IsOptional()
    offset?: number;

    @IsOptional()
    @IsEnum(CategoriaProducto)
    categoria?: CategoriaProducto;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    minPrice?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    maxPrice?: number;

    @IsOptional()
    @IsString()
    sort?: 'asc' | 'desc';
}