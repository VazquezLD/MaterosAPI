import { Test, TestingModule } from '@nestjs/testing';
import { PedidoService } from './pedido.service';
import { getModelToken } from '@nestjs/mongoose';
import { Pedido } from './entities/pedido.entity';
import { Producto } from 'src/producto/entities/producto.entity';
import { MailService } from 'src/mail/mail.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('PedidoService', () => {
  let service: PedidoService;
  let productoModel: any;
  let pedidoModel: any;

  const mockProducto = {
    _id: '507f1f77bcf86cd799439011',
    nombre: 'Mate Test',
    precio: 100,
    stock: 10,
  };

  beforeEach(async () => {
    productoModel = {
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
    };
    pedidoModel = {
      create: jest.fn(),
    };
    const mockMailService = {
      sendOrderConfirmation: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PedidoService,
        { provide: getModelToken(Pedido.name), useValue: pedidoModel },
        { provide: getModelToken(Producto.name), useValue: productoModel },
        { provide: MailService, useValue: mockMailService },
      ],
    }).compile();

    service = module.get<PedidoService>(PedidoService);
  });

  it('debe lanzar error si el producto no existe', async () => {
    productoModel.findById.mockResolvedValue(null);
    const dto = { cliente: { nombre: 'a', email: 'a@a.com', telefono: '1', direccion: 'a' }, items: [{ producto: 'id', cantidad: 1 }] };
    
    await expect(service.create(dto as any)).rejects.toThrow(NotFoundException);
  });

  it('debe lanzar error si no hay suficiente stock', async () => {
    productoModel.findById.mockResolvedValue({ ...mockProducto, stock: 5 });
    const dto = { cliente: { nombre: 'a', email: 'a@a.com', telefono: '1', direccion: 'a' }, items: [{ producto: 'id', cantidad: 10 }] };
    
    await expect(service.create(dto as any)).rejects.toThrow(BadRequestException);
  });

  it('debe crear el pedido y descontar stock si todo es correcto', async () => {
    productoModel.findById.mockResolvedValue(mockProducto);
    pedidoModel.create.mockResolvedValue({ _id: 'pedidoId', total: 100, cliente: { email: 'a@a.com' }, items: [] });
    
    const dto = { 
      cliente: { nombre: 'Juan', email: 'juan@a.com', telefono: '123', direccion: 'Calle 1' }, 
      items: [{ producto: mockProducto._id, cantidad: 2 }] 
    };

    const result = await service.create(dto as any);
    
    expect(result).toBeDefined();
    expect(productoModel.findByIdAndUpdate).toHaveBeenCalled();
  });
});
