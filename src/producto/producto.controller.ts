import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  @Auth('admin')
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productoService.create(createProductoDto);
  }

  @Get()
  findAll( @Query() paginationDTO: PaginationDTO) {
    return this.productoService.findAll(paginationDTO);
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.productoService.findOne(id);
  }

  @Patch(':id')
  @Auth('admin')
  update(@Param('id', ParseMongoIdPipe) id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productoService.update(id, updateProductoDto);
  }

  @Delete(':id')
  @Auth('admin')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.productoService.remove(id);
  }

  @Delete()
  @Auth('admin')
  removeAll(){
    return this.productoService.deleteAll()
  }
}
