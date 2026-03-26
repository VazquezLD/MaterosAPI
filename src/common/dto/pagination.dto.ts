import { IsNumber, IsOptional, IsPositive, Min } from "class-validator"

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
    }