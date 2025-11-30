# mini-tienda
Proyecto final para la clase Tópico II: Temas Emergentes de Apps Web

## 📁 Estructura del Proyecto

```
mini-tienda/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │    └── db.config.js
│   │   ├── models/
│   │   │   ├── index.js
│   │   │   ├── Product.js
│   │   │   ├── Sale.js
│   │   │   └── SaleDetails.js
│   │   ├── routes/
│   │   │   ├── index.js
│   │   │   ├── sale.router.js
│   │   │   └── products.router.js
│   │   ├── controllers/
│   │   │   ├── product.controller.js
│   │   │   └── sale.controller.js
│   │   ├── middlewares/
│   │   │   ├── validators/
│   │   │   │   ├── checkResults.js  
│   │   │   │   ├── productValidator.js  
│   │   │   │   └── saleValidator.js
│   │   │   └── errorHandler.js
│   │   ├── utils/
│   │   │   └── AppError.js
│   │   └── app.js
│   ├── .env
│   ├── index.js
│   ├── package.json
│   └── package.lock.json
├── frontend/
│   ├── components/
│   │   ├── header.js
│   │   ├── productsList.js
│   │   └── cartStats.js
│   ├── index.html
│   ├── styles.css
│   └── main.js
└── 
```

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js (v14 o superior)
- MySQL (v5.7 o superior)
- Navegador web moderno

### Paso 1: Clonar o descargar el proyecto

```bash
git clone <url-del-repositorio>
cd mini-tienda
```

### Paso 2: Configurar la Base de Datos

1. Crear la base de datos en MySQL:

```sql
CREATE DATABASE mini_tienda_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. Las tablas se crearán automáticamente al ejecutar el backend gracias a Sequelize.

**Estructura de tablas:**

- **products**: id, name, description, price, stock
- **sales**: id, date, totalAmount
- **sale_details**: id, sale_id, product_id, productQuantity, unitPrice, subtotal

### Paso 3: Configurar el Backend

1. Navegar a la carpeta del backend:

```bash
cd backend
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env` en la raíz de `backend/` con el siguiente contenido:

```env
DB_NAME=mini_tienda_db
DB_USER=root
DB_PASSWORD=tu_contraseña_mysql
DB_HOST=localhost
DB_PORT=3306
PORT=3000
```

> ⚠️ **Importante:** Reemplaza `tu_contraseña_mysql` con la contraseña real de tu usuario MySQL.

4. En el archivo `index.js` se incluye la sincronización de la base de datos y se agregan registros de productos, por lo que no hay que agregar productos manualmente:

```javascript
await sequelize.sync({ force: false });
await Product.bulkCreate([...])
```

### Paso 4: Levantar el Backend

Ejecutar con nodemon (desarrollo):

```bash
npm run dev
```

O ejecutar normalmente:

```bash
npm start
```

El servidor estará disponible en: `http://localhost:3000`

**Verificar que funciona:**
- Abrir en el navegador o Postman: `http://localhost:3000/api/products`
- Debería devolver una lista de productos en formato JSON

### Paso 5: Configurar el Frontend

1. Navegar a la carpeta del frontend:

```bash
cd ../frontend
```

2. Abrir el archivo `index.html` con **Live Server** (extensión de VS Code):
   - Clic derecho en `index.html`
   - Seleccionar "Open with Live Server"

O alternativamente, abrir directamente el archivo `index.html` en el navegador.

La aplicación estará disponible en: `http://127.0.0.1:5500` (o similar, según Live Server)

## 📖 Uso de la Aplicación

### Navegación

La aplicación tiene tres vistas principales accesibles desde el menú:

1. **Productos** (`#/products`): Lista todos los productos disponibles con opción de agregar al carrito
2. **Carrito** (`#/cart`): Muestra los productos agregados al carrito con el total
3. **Estadísticas** (`#/stats`): Muestra información sobre productos y el carrito

### Funcionalidades

- **Ver productos**: La vista principal carga todos los productos desde la API
- **Agregar al carrito**: Cada producto tiene un botón para agregarlo al carrito temporal
- **Ver carrito**: Visualiza los productos seleccionados y el monto total
- **Gestionar carrito**: Eliminar productos o vaciar todo el carrito
- **Registrar una compra**: Se registra la compra de los productos en el carrito
- **Navegación SPA**: Cambiar entre vistas sin recargar la página

## 🎯 Temas Implementados

### 1. Microfrontends
- Componentes independientes en `components/`:
  - `header.js`: Navegación
  - `productsList.js`: Lista de productos
  - `cartStats.js`: Carrito y estadísticas

### 2. Manejo Asíncrono (async/await)
- Todas las llamadas a la API usan `async/await`
- Implementado en:
  - `productsList.js`: Carga de productos
  - Backend: Todas las rutas de productos

### 3. API REST con Express
- Endpoints CRUD de productos:
  - `GET /api/products` - Listar productos
  - `GET /api/products/:id` - Obtener producto por ID
  - `POST /api/products` - Crear producto
  - `PUT /api/products/:id` - Actualizar producto
  - `DELETE /api/products/:id` - Eliminar producto
- Endpoints CRUD de ventas:
  - `GET /api/sales` - Listar ventas
  - `GET /api/sales/:id` - Obtener ventas por ID
  - `POST /api/sales` - Registrar venta
  - `PUT /api/sales/:id` - Actualizar venta
  - `DELETE /api/sales/:id` - Eliminar venta

### 4. Manejo de Errores

**Backend:**
- Clase de error personalizada
- Middleware de validación con express-validator
- Middleware de errores global
- Middleware para rutas no encontradas (404)

**Frontend:**
- Try/catch en todas las llamadas fetch
- Mensajes de error mostrados en el DOM
- Manejo de respuestas fallidas de la API

### 5. Base de Datos (MySQL + Sequelize)
- ORM Sequelize configurado
- Modelos: Product, Sale, SaleDetails
- Relaciones Many-to-Many entre Sales y Products
- BulkCreate para datos iniciales

### 6. Manejo del DOM
- Creación dinámica de elementos HTML
- Manipulación del contenido según la vista activa
- Event listeners para interacciones

### 7. Manejo del BOM
- `localStorage`: Almacenamiento del carrito
- `location.hash`: Enrutamiento
- `window` events: hashchange, load
- `confirm()`: Confirmación de acciones

### 8. Enrutamiento del lado del cliente
- Sistema de routing con hash (`#/ruta`)
- Navegación sin recarga de página
- Router principal en `main.js`

### 9. Almacenamiento del lado del cliente
- `localStorage`: Persistencia del carrito entre sesiones
- Lectura y escritura de datos JSON

## 🔒 Seguridad

- **Helmet**: Headers de seguridad HTTP
- **CORS**: Configuración de orígenes permitidos
- **express-validator**: Validación de datos de entrada
- **Variables de entorno**: Datos sensibles en `.env`

## 🐛 Solución de Problemas

### El backend no inicia
- Verificar que MySQL esté corriendo
- Revisar credenciales en `.env`
- Verificar que el puerto 3000 esté disponible

### Error de conexión a la base de datos
- Confirmar que la base de datos `mini_tienda_db` exista
- Verificar usuario y contraseña de MySQL
- Revisar que el host y puerto sean correctos

### Los productos no cargan en el frontend
- Verificar que el backend esté corriendo
- Abrir la consola del navegador para ver errores
- Confirmar que la URL de la API sea correcta

### El carrito no guarda datos
- Verificar que el navegador permita `localStorage`
- Limpiar el `localStorage` si hay datos corruptos:
  ```javascript
  localStorage.clear()
  ```

### Ejemplo de Request de Producto (POST):

```json
{
    "name": "Producto Ejemplo",
  "description": "Descripción del producto",
  "price": 99.99,
  "stock": 50
}
```

### Ejemplo de Request de Venta (POST):
```json
{
	"totalAmount":3500.00,
    "details":[
        {"productId":1,"productQuantity":2},
        {"productId":2,"productQuantity":1}
    ]
}
```
