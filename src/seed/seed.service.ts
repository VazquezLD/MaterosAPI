import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Producto } from '../producto/entities/producto.entity';
import seedData from '../data-seed.json';

@Injectable()
export class SeedService {
  // No se usa el DTO de productos porque al ser una semilla ya esta verificado que los objetos ya tienen el formato correcto.
  // Usar el CreateProductoDTO haría muy lenta la carga masiva de los productos
  constructor( @InjectModel(Producto.name) private readonly productoModel: Model<Producto> ) {}

  async executeSeed() {
    try {

      await this.productoModel.deleteMany({});

      const productosFormateados = seedData.map(producto => {
        return { ...producto, nombre: producto.nombre.toLowerCase()
        };
      });

      await this.productoModel.insertMany(productosFormateados);
      return { message: '¡Semilla ejecutada con éxito! Base de datos cargada.' };

    } catch (error) {
      console.log('Error ejecutando la semilla:', error);
      throw new InternalServerErrorException('Falló la ejecución de la semilla. Revisa los logs.');
    }
  }
}
