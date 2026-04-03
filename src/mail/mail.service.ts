import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Pedido } from 'src/pedido/entities/pedido.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendOrderConfirmation(pedido: Pedido) {
    try {
      await this.mailerService.sendMail({
        to: pedido.cliente.email,
        subject: 'Confirmación de tu pedido en Materos 🧉',
        html: `
          <h1>¡Gracias por tu compra, ${pedido.cliente.nombre}!</h1>
          <p>Hemos recibido tu pedido correctamente.</p>
          <p><strong>ID del Pedido:</strong> ${pedido._id}</p>
          <p><strong>Total:</strong> $${pedido.total}</p>
          <h3>Detalle:</h3>
          <ul>
            ${pedido.items.map(item => `<li>${item.nombre} x ${item.cantidad} - $${item.precioUnitario * item.cantidad}</li>`).join('')}
          </ul>
          <p>Nos pondremos en contacto pronto para el envío.</p>
        `,
      });
      console.log(`Email enviado a ${pedido.cliente.email}`);
    } catch (error) {
      console.error('Error enviando email:', error);
    }
  }
}
