# 🧉 Materos API - Documentación de Endpoints

Esta API proporciona todos los servicios necesarios para gestionar la tienda de productos de mate, incluyendo catálogo, gestión de stock, autenticación y procesamiento de pedidos.

**URL Base:** `http://localhost:3000/api/v1`

---

## 🔐 Autenticación (`/auth`)
Gestión de usuarios y seguridad.

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `POST` | `/auth/register` | Registra un nuevo usuario (retorna token). |
| `POST` | `/auth/login` | Inicia sesión y retorna el JWT. |
| `GET` | `/auth/check` | Verifica si el token es válido (Ruta Protegida). |

---

## 📦 Productos (`/producto`)
Gestión integral del catálogo.

| Método | Endpoint | Protección | Descripción |
| :--- | :--- | :--- | :--- |
| `GET` | `/producto` | Pública | Lista productos con filtros avanzados. |
| `GET` | `/producto/:id` | Pública | Detalle de un producto. |
| `POST` | `/producto` | **Admin** | Crea un nuevo producto. |
| `PATCH` | `/producto/:id` | **Admin** | Actualiza un producto. |
| `DELETE` | `/producto/:id` | **Admin** | Elimina un producto. |

### 🔍 Filtros Avanzados (Query Params)
*   `categoria`: Filtrado por tipo.
*   `search`: Búsqueda por nombre.
*   `minPrice` / `maxPrice`: Rango de precios.
*   `sort`: Ordenar por precio (`asc` o `desc`).

---

## 🛒 Pedidos (`/pedido`)
Procesamiento de compras.

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `POST` | `/pedido` | Crea pedido, descuenta stock y **envía confirmación por email**. |
| `GET` | `/pedido` | Lista histórica de pedidos (Admin). |
| `POST` | `/pedido/:id/webhook-payment` | Simula confirmación de pago de pasarela externa. |

---

## ⚡ Semilla (`/seed`)

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/seed` | Reinicia la DB y carga el catálogo inicial. |

---

## 🛠️ Notas de Seguridad
*   **JWT:** Se debe enviar el token en el header `Authorization: Bearer <TOKEN>` para rutas protegidas.
*   **Roles:** Las rutas de escritura de productos requieren que el usuario tenga el rol `admin`.
*   **Variables de Entorno:** Configurar el archivo `.env` antes de iniciar (ver `.env.template`).
