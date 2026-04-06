import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Producto, ProductoSchema } from './entities/producto.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProductoController],
  providers: [ProductoService],
  imports: [
    MongooseModule.forFeature([{ name: Producto.name, schema: ProductoSchema }]),
    AuthModule
  ],
  exports: [MongooseModule]
})
export class ProductoModule {}
