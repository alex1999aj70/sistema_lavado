#  Sistema de Lavado de Autos — Backend API

## Información del Proyecto

| Campo       | Detalle                                  |
|-------------|------------------------------------------|
| **Materia**  | Aplicaciones con Base de Datos           |
| **Profesor** | Jesús Alejandro Flores Hernández         |
| **Alumno**   | Alejandro del Jesús Díaz López           |
| **Matricula**| 191087                                   |
| **Carrera**  | Ingeniería en Sistemas Computacionales   |
| **Fecha**    | 1 de mayo del 2026                       |

---

## Descripción

API REST desarrollada con **Node.js + Express + MySQL2** usando módulos ES6.  
Permite gestionar los recursos de un sistema de administración para un negocio de lavado de autos: clientes, citas, servicios, empleados y pagos.

---

## Tecnologías

- Node.js (ES Modules)
- Express.js
- MySQL2
- dotenv
- cors

---

## Instalación y Uso

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/sistema-lavado-backend.git
cd sistema-lavado-backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
# Edita .env con tus credenciales de MySQL
```

### 4. Crear y poblar la base de datos

```bash
npm run seed
```

### 5. Iniciar el servidor

```bash
# Modo desarrollo (recarga automática)
npm run dev

# Modo producción
npm start
```

> El servidor correrá en `http://localhost:3000`

---

## Estructura del Proyecto

```
sistema-lavado-backend/
├── index.js                  # Punto de entrada
├── package.json
├── .env.example
├── .gitignore
└── src/
    ├── db/
    │   ├── connection.js     # Pool de conexión MySQL
    │   └── seed.js           # Script crear y poblar BD
    ├── controllers/
    │   └── controllers.js    # Lógica de negocio
    └── routes/
        └── routes.js         # Definición de endpoints
```

---

## Endpoints de la API

Base URL: `http://localhost:3000/api/v1`

---

###  ROL

| Método | Endpoint       | Descripción              |
|--------|----------------|--------------------------|
| GET    | /roles         | Obtener todos los roles  |
| GET    | /roles/:id     | Obtener rol por ID       |
| POST   | /roles         | Crear nuevo rol          |
| PUT    | /roles/:id     | Actualizar rol           |
| DELETE | /roles/:id     | Eliminar rol             |

**Body POST/PUT:**
```json
{ "nombre_rol": "Administrador" }
```

---

###  USUARIO

| Método | Endpoint         | Descripción                 |
|--------|------------------|-----------------------------|
| GET    | /usuarios        | Obtener todos los usuarios  |
| GET    | /usuarios/:id    | Obtener usuario por ID      |
| POST   | /usuarios        | Crear nuevo usuario         |
| PUT    | /usuarios/:id    | Actualizar usuario          |
| DELETE | /usuarios/:id    | Eliminar usuario            |

**Body POST/PUT:**
```json
{
  "nombre_usuario": "juan",
  "contrasena": "pass123",
  "idRol": 2
}
```

---

###  CLIENTE

| Método | Endpoint        | Descripción                 |
|--------|-----------------|-----------------------------|
| GET    | /clientes       | Obtener todos los clientes  |
| GET    | /clientes/:id   | Obtener cliente por ID      |
| POST   | /clientes       | Crear nuevo cliente         |
| PUT    | /clientes/:id   | Actualizar cliente          |
| DELETE | /clientes/:id   | Eliminar cliente            |

**Body POST/PUT:**
```json
{
  "nombre": "Luis Hernández",
  "telefono": "9381234567",
  "direccion": "Av. Principal #10, Carmen, Camp."
}
```

---

###  CATEGORÍA DE SERVICIO

| Método | Endpoint          | Descripción                    |
|--------|-------------------|--------------------------------|
| GET    | /categorias       | Obtener todas las categorías   |
| GET    | /categorias/:id   | Obtener categoría por ID       |
| POST   | /categorias       | Crear nueva categoría          |
| PUT    | /categorias/:id   | Actualizar categoría           |
| DELETE | /categorias/:id   | Eliminar categoría             |

**Body POST/PUT:**
```json
{ "nombre_categoria": "Lavado Exterior" }
```

---

###  SERVICIO

| Método | Endpoint        | Descripción                  |
|--------|-----------------|------------------------------|
| GET    | /servicios      | Obtener todos los servicios  |
| GET    | /servicios/:id  | Obtener servicio por ID      |
| POST   | /servicios      | Crear nuevo servicio         |
| PUT    | /servicios/:id  | Actualizar servicio          |
| DELETE | /servicios/:id  | Eliminar servicio            |

**Body POST/PUT:**
```json
{
  "nombre_servicio": "Lavado Básico",
  "descripcion": "Lavado exterior con shampoo",
  "precio_base": 80.00,
  "idCategoria": 1
}
```

---

###  CITA

| Método | Endpoint    | Descripción               |
|--------|-------------|---------------------------|
| GET    | /citas      | Obtener todas las citas   |
| GET    | /citas/:id  | Obtener cita por ID       |
| POST   | /citas      | Crear nueva cita          |
| PUT    | /citas/:id  | Actualizar cita           |
| DELETE | /citas/:id  | Eliminar cita             |

**Body POST/PUT:**
```json
{
  "fecha_hora": "2025-04-10 10:00:00",
  "estado": "Pendiente",
  "idCliente": 1,
  "idUsuario": 2
}
```

---

###  DETALLE DE CITA

| Método | Endpoint                        | Descripción                        |
|--------|---------------------------------|------------------------------------|
| GET    | /citas/:idCita/detalles         | Obtener detalles de una cita       |
| POST   | /detalles                       | Agregar servicio a una cita        |
| DELETE | /detalles/:idCita/:idServicio   | Eliminar servicio de una cita      |

**Body POST:**
```json
{
  "idCita": 1,
  "idServicio": 3,
  "cantidad": 1,
  "precio_aplicado": 100.00
}
```

---

###  PAGO

| Método | Endpoint    | Descripción              |
|--------|-------------|--------------------------|
| GET    | /pagos      | Obtener todos los pagos  |
| GET    | /pagos/:id  | Obtener pago por ID      |
| POST   | /pagos      | Registrar nuevo pago     |
| PUT    | /pagos/:id  | Actualizar pago          |
| DELETE | /pagos/:id  | Eliminar pago            |

**Body POST/PUT:**
```json
{
  "fecha_pago": "2025-04-10 11:00:00",
  "monto_total": 180.00,
  "metodo_pago": "Efectivo",
  "idCita": 1
}
```

---

## Datos de Prueba

El script `npm run seed` crea la base de datos e inserta:

- 3 roles (Administrador, Empleado, Cajero)
- 4 usuarios
- 5 clientes
- 4 categorías de servicio
- 7 servicios
- 5 citas
- 8 detalles de cita
- 2 pagos

---

## Modo desarrollo con recarga automática

```bash
node --watch index.js
# o bien:
npm run dev
```

Este comando reinicia el servidor automáticamente cada vez que se detecta un cambio en los archivos, sin necesidad de instalar nodemon.
