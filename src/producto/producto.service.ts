import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Model } from 'mongoose';
import { Producto } from './entities/producto.entity';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException } from '@nestjs/common';
import { PaginationDTO } from 'src/common/dto/pagination.dto';


@Injectable()
export class ProductoService {

  constructor( @InjectModel(Producto.name) private readonly productoModel: Model<Producto>) {
    console.log('ProductoService initialized');
  }

  //Metodo para crear un nuevo producto, recibe un DTO con los datos del producto a crear
  async create(createProductoDto: CreateProductoDto) {
    if (createProductoDto.nombre) {
      createProductoDto.nombre = createProductoDto.nombre.toLowerCase();
    }

    try {
      const producto = await this.productoModel.create(createProductoDto);
      return producto;

    } catch (error) {
      this.handleExceptions(error, 'create');
    }
  }

  async findAll(paginationDTO: PaginationDTO) {
    const { limit=10, offset=0 } = paginationDTO;
    try {
      const productos = await this.productoModel.find().limit(limit).skip(offset).select('-__v')
      if (productos.length === 0){
        throw new NotFoundException('No hay productos todavia.')
      }
      return productos;
    } catch (error) {
      this.handleExceptions(error, 'findAll');
    }
  }

  async deleteAll() {
    try {
        await this.productoModel.deleteMany({})
        return {message: "Productos eliminados satisfactoriamente"}
    } catch (error) {
        this.handleExceptions(error, 'deleteAll')
    }
  }

  //Metodo para buscar un producto por MongoID
  async findOne(id: string) {
    const producto = await this.productoModel.findById(id);

    if (!producto) {
      throw new NotFoundException(`El producto con id ${id} no fue encontrado`);
    }
    return producto;
  }

 // Este metodo actualiza cualquier cantidad de atributos del objeto, sea 1 o todos
  async update(id: string, updateProductoDto: UpdateProductoDto) {
      try {
        if (updateProductoDto.nombre){
          updateProductoDto.nombre = updateProductoDto.nombre.toLocaleLowerCase();
        }
        const productoActualizado = await this.productoModel.findByIdAndUpdate(id, updateProductoDto, {new: true, runValidators: true})
        if (!productoActualizado) {
          throw new NotFoundException(`El producto con id ${id} no fue encontrado`);
        }
        return productoActualizado;
        
      } catch (error) {
        this.handleExceptions(error, 'update');
        }
  }

  //Este metodo hace Hard Delete, cuidado
  async remove(id: string) {
    try {
      const productoAEliminar = await this.productoModel.findByIdAndDelete(id)
      if (!productoAEliminar){
        throw new NotFoundException(`El producto con id ${id} no fue encontrado`)
      }
      return {message: `Producto con id ${id} eliminado correctamente`, productoAEliminar};
    } catch (error) {
        this.handleExceptions(error, 'remove');
    }
  }

  // Metodo reutilizable para manejar excepciones en los métodos como update y remove, recibe el error y el nombre del método para loguear mejor el error
  private handleExceptions(error: any, metodo: string) {
    if (error instanceof HttpException) {
      throw error;
    }
    if (error.code === 11000) {
      throw new BadRequestException(`Ya existe un producto con ese nombre.`);
    }
    console.log(`Error en método ${metodo}:`, error);
    throw new InternalServerErrorException(`Error inesperado al usar el método ${metodo} con el producto. Revisa los logs.`);
  }
}
