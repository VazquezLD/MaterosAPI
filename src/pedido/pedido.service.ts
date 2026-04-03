import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Producto } from 'src/producto/entities/producto.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { Pedido } from './entities/pedido.entity';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class PedidoService {
  constructor(
    @InjectModel(Pedido.name) private readonly pedidoModel: Model<Pedido>,
    @InjectModel(Producto.name) private readonly productoModel: Model<Producto>,
    private readonly mailService: MailService,
  ) {}

  async create(createPedidoDto: CreatePedidoDto) {
    const { items, cliente } = createPedidoDto;
    let total = 0;
    const itemsProcesados: any[] = [];

    // Validar productos y stock
    for (const item of items) {
      const producto = await this.productoModel.findById(item.producto);
      
      if (!producto) {
        throw new NotFoundException(`Producto con ID ${item.producto} no encontrado.`);
      }

      if (producto.stock < item.cantidad) {
        throw new BadRequestException(`No hay suficiente stock para el producto ${producto.nombre}. Stock disponible: ${producto.stock}`);
      }

      const subtotal = producto.precio * item.cantidad;
      total += subtotal;

      itemsProcesados.push({
        producto: producto._id,
        nombre: producto.nombre,
        cantidad: item.cantidad,
        precioUnitario: producto.precio,
      });

      // Actualizar stock
      await this.productoModel.findByIdAndUpdate(producto._id, {
        $inc: { stock: -item.cantidad }
      });
    }

    try {
      const nuevoPedido = await this.pedidoModel.create({
        cliente,
        items: itemsProcesados,
        total,
        estado: 'pendiente'
      });
      
      // Enviar correo de confirmación de forma asíncrona
      this.mailService.sendOrderConfirmation(nuevoPedido);

      return nuevoPedido;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al crear el pedido.');
    }
  }

  async findAll() {
    return this.pedidoModel.find().sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    const pedido = await this.pedidoModel.findById(id);
    if (!pedido) throw new NotFoundException(`Pedido con ID ${id} no encontrado.`);
    return pedido;
  }

  async updateStatus(id: string, estado: string) {
    const pedido = await this.pedidoModel.findByIdAndUpdate(id, { estado }, { new: true });
    if (!pedido) throw new NotFoundException(`Pedido con ID ${id} no encontrado.`);
    return pedido;
  }
}
