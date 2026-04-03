import { Type } from 'class-transformer';
import { IsEmail, IsMongoId, IsNotEmpty, IsNumber, IsPositive, IsString, Min, ValidateNested, IsArray, MinLength } from 'class-validator';

class ClienteDto {
  @IsString()
  @MinLength(3)
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  telefono: string;

  @IsString()
  direccion: string;
}

class ItemDto {
  @IsMongoId()
  producto: string;

  @IsNumber()
  @IsPositive()
  @Min(1)
  cantidad: number;
}

export class CreatePedidoDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ClienteDto)
  cliente: ClienteDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];
}
