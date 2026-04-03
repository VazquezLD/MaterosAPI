import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pedido, PedidoSchema } from './entities/pedido.entity';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { ProductoModule } from 'src/producto/producto.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pedido.name, schema: PedidoSchema },
    ]),
    ProductoModule,
    MailModule
  ],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
