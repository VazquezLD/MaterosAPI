import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CategoriaProducto } from './categoria.enum';

@Schema({ timestamps: true })
export class Producto extends Document{
    @Prop({ required: true , unique: true, index: true })
    nombre: string;
    @Prop({ required: true ,index: true })
    precio: number;
    @Prop({ required: true })
    descripcion: string;
    @Prop({ required: true })
    stock: number;
    @Prop({ required: true, enum: CategoriaProducto })
    categoria: string;
    @Prop({ required: true })
    imagenUrl: string;
    @Prop({ required: true })
    activo: boolean;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
