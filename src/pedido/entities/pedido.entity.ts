import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
class PedidoItem {
  @Prop({ type: Types.ObjectId, ref: 'Producto', required: true })
  producto: Types.ObjectId;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, min: 1 })
  cantidad: number;

  @Prop({ required: true, min: 0 })
  precioUnitario: number;
}

@Schema()
class ClienteInfo {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  telefono: string;

  @Prop({ required: true })
  direccion: string;
}

@Schema({ timestamps: true })
export class Pedido extends Document {
  @Prop({ type: ClienteInfo, required: true })
  cliente: ClienteInfo;

  @Prop({ type: [PedidoItem], required: true })
  items: PedidoItem[];

  @Prop({ required: true, min: 0 })
  total: number;

  @Prop({
    type: String,
    enum: ['pendiente', 'pagado', 'enviado', 'cancelado'],
    default: 'pendiente',
  })
  estado: string;
}

export const PedidoSchema = SchemaFactory.createForClass(Pedido);
