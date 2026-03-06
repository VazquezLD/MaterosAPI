import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Producto } from './entities/producto.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductoService {

  constructor( @InjectModel(Producto.name) private readonly productoModel: Model<Producto>) {
    console.log('ProductoService initialized');
  }

  //Metodo para crear un nuevo producto, recibe un DTO con los datos del producto a crear
  async create(createProductoDto: CreateProductoDto) {
    createProductoDto.nombre = createProductoDto.nombre.toLowerCase();

    try {
      const producto = await this.productoModel.create(createProductoDto);
      return producto;

    } catch (error) {
      // Este error es de MongoDB cuando se viola una restricción de unicidad (por ejemplo, nombre único)
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

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`El id ${id} no es un ID válido de MongoDB`);
    }
    const producto = await this.productoModel.findById(id);

    if (!producto) {
      throw new NotFoundException(`El producto con id ${id} no fue encontrado`);
    }
    return producto;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
