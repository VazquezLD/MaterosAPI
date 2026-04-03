# 🧉 Resumen de Desarrollo: Materos Backend (E-commerce)

Este documento detalla la evolución y las características técnicas implementadas en el backend de la aplicación "Materos", desarrollada con **NestJS** y **MongoDB**.

---

## 🚀 1. Fase Inicial: Cimentación del Catálogo
En el primer bloque de desarrollo, transformamos una estructura básica en un sistema de gestión de productos robusto:
*   **Módulo de Productos:** Creación de la entidad `Producto` con Schema de Mongoose, incluyendo validaciones estrictas de datos (precio positivo, stock mínimo, categorías fijas).
*   **Filtrado Avanzado:** Implementación de búsqueda por nombre (case-insensitive) y filtrado por categorías en el endpoint `GET /producto`.
*   **Sistema de Semilla (Seed):** Desarrollo de un endpoint especializado (`/api/v1/seed`) para limpiar y repoblar la base de datos con un catálogo inicial de más de 100 productos de alta calidad.

## 🛒 2. Gestión de Pedidos e Inventario
Desarrollamos el motor transaccional de la tienda:
*   **Módulo de Pedidos:** Creación de una entidad `Pedido` que almacena información del cliente (nombre, email, dirección) y una lista de ítems comprados.
*   **Lógica de Stock en Tiempo Real:** Implementación de un flujo que verifica la disponibilidad de cada producto antes de confirmar la compra y descuenta automáticamente el stock de la base de datos tras el éxito del pedido.
*   **Simulación de Pagos:** Creación de un endpoint de **Webhook** (`/api/v1/pedido/:id/webhook-payment`) para simular la confirmación de una pasarela de pagos externa (como Mercado Pago).

## 🔐 3. Seguridad y Profesionalización (Portfolio Ready)
Para elevar el proyecto a un nivel de portfolio senior, implementamos:
*   **Autenticación JWT:** Sistema completo de registro (`/auth/register`) y login (`/auth/login`) con generación de tokens **JSON Web Tokens**.
*   **Protección de Contraseñas:** Integración de **Bcrypt** para el hashing de contraseñas de usuarios.
*   **Autorización por Roles:** Creación de un decorador personalizado `@Auth('admin')` y un Guard de roles para restringir operaciones de escritura (crear/editar/borrar productos) exclusivamente a administradores.
*   **Seguridad de Configuración:** Migración de credenciales sensibles (MongoDB URI, JWT Secret) a variables de entorno utilizando `@nestjs/config` y archivos `.env`.

## 📧 4. Notificaciones y Experiencia de Usuario
*   **Módulo de Correo (MailModule):** Integración de `Nodemailer` para el envío de correos electrónicos.
*   **Confirmación de Compra:** Implementación de una lógica asíncrona que envía un email automático al cliente con el detalle estético de su pedido inmediatamente después de realizar la compra.

## 🛠️ 5. Calidad de Código y Documentación
*   **Fix de TSConfig:** Resolución de errores críticos de configuración en el compilador de TypeScript y soporte para módulos JSON.
*   **Tests Unitarios:** Desarrollo de pruebas con **Jest** para validar que la lógica de descuento de stock sea infalible.
*   **Documentación de Endpoints:** Creación de un archivo `endpoints.md` detallado con todos los métodos, protecciones y ejemplos de uso de la API.

---

**Tecnologías Utilizadas:** NestJS, MongoDB (Mongoose), TypeScript, JWT, Passport, Bcrypt, Nodemailer, Jest, Docker.
