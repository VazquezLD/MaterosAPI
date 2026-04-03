# Materos Backend - Tienda de Mates

Backend desarrollado con NestJS para una tienda online de mates, termos, yerba y accesorios.

## Instalación

1. Clonar repositorio
2. Instalar dependencias:
```bash
npm install
```
3. Levantar base de datos (requiere Docker):
```bash
docker-compose up -d
```
4. Iniciar en modo desarrollo:
```bash
npm run start:dev
```

## Endpoints Principales

### Productos (`/api/v1/producto`)
- `GET /producto`: Lista productos.
  - Query Params opcionales: `limit`, `offset`, `categoria`, `search`.
- `GET /producto/:id`: Busca un producto por ID.
- `POST /producto`: Crea un producto (Admin).
- `PATCH /producto/:id`: Actualiza un producto.
- `DELETE /producto/:id`: Elimina un producto.

### Pedidos (`/api/v1/pedido`)
- `POST /pedido`: Realiza un pedido (Automáticamente reduce stock).
- `GET /pedido`: Lista todos los pedidos (Admin).
- `GET /pedido/:id`: Detalle de un pedido.
- `PATCH /pedido/:id/status`: Cambia el estado del pedido (Admin).

### Semilla (`/api/v1/seed`)
- `GET /seed`: Borra la base de datos y carga datos de prueba iniciales.

## Stack usado
* NestJS
* MongoDB (Mongoose)
* Docker
* Class Validator & Transformer