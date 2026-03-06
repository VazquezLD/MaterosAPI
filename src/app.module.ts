import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ProductoModule } from './producto/producto.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ServeStaticModule.forRoot({
    rootPath: 'public',
  }), 
  ProductoModule,
  MongooseModule.forRoot("mongodb://root:secretpassword@localhost:27017/mi_base_de_datos?authSource=admin")
],
})
export class AppModule {}
