import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Model } from 'mongoose';
import { Producto } from './entities/producto.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductoService {

  constructor( @InjectModel(Producto.name) private readonly productoModel: Model<Producto>) {
    console.log('ProductoService initialized');
  }

  async create(createProductoDto: CreateProductoDto) {
    createProductoDto.nombre = createProductoDto.nombre.toLowerCase();

    try {
      const producto = await this.productoModel.create(createProductoDto);
      return producto;

    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`Ya hay un producto con ese nombre ${JSON.stringify(error.keyValue)}`);
      }
      console.log(error)
      throw new InternalServerErrorException(`Error al crear el producto - ${error.message}`);
    }
  }

  findAll() {
    return `This action returns all producto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
