import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidoService.create(createPedidoDto);
  }

  @Get()
  findAll() {
    return this.pedidoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pedidoService.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body('estado') estado: string,
  ) {
    return this.pedidoService.updateStatus(id, estado);
  }

  @Post(':id/webhook-payment')
  webhookPayment(@Param('id', ParseMongoIdPipe) id: string) {
    // Simulamos que la pasarela de pagos nos avisa que el pago fue exitoso
    return this.pedidoService.updateStatus(id, 'pagado');
  }
}
