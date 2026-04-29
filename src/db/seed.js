import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  multipleStatements: true
});

console.log('📦 Creando y poblando base de datos...\n');

const sql = `
-- ──────────────────────────────────────────
-- CREAR BASE DE DATOS
-- ──────────────────────────────────────────
CREATE DATABASE IF NOT EXISTS bd_sistema_lavado;
USE bd_sistema_lavado;

-- ──────────────────────────────────────────
-- TABLAS
-- ──────────────────────────────────────────

CREATE TABLE IF NOT EXISTS ROL (
  idRol INT AUTO_INCREMENT PRIMARY KEY,
  nombre_rol VARCHAR(45) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS USUARIO (
  idUsuario INT AUTO_INCREMENT PRIMARY KEY,
  nombre_usuario VARCHAR(45) NOT NULL,
  contrasena VARCHAR(100) NOT NULL,
  idRol INT NOT NULL,
  FOREIGN KEY (idRol) REFERENCES ROL(idRol) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS CLIENTE (
  idCliente INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  direccion TEXT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS CATEGORIA_SERVICIO (
  idCategoria INT AUTO_INCREMENT PRIMARY KEY,
  nombre_categoria VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS SERVICIO (
  idServicio INT AUTO_INCREMENT PRIMARY KEY,
  nombre_servicio VARCHAR(150) NOT NULL,
  descripcion TEXT,
  precio_base DECIMAL(10,2) NOT NULL,
  idCategoria INT NOT NULL,
  FOREIGN KEY (idCategoria) REFERENCES CATEGORIA_SERVICIO(idCategoria) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS CITA (
  idCita INT AUTO_INCREMENT PRIMARY KEY,
  fecha_hora DATETIME NOT NULL,
  estado VARCHAR(45) DEFAULT 'Pendiente',
  idCliente INT NOT NULL,
  idUsuario INT NOT NULL,
  FOREIGN KEY (idCliente) REFERENCES CLIENTE(idCliente) ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS DETALLE_CITA (
  idCita INT NOT NULL,
  idServicio INT NOT NULL,
  cantidad INT DEFAULT 1,
  precio_aplicado DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (idCita, idServicio),
  FOREIGN KEY (idCita) REFERENCES CITA(idCita) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (idServicio) REFERENCES SERVICIO(idServicio) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS PAGO (
  idPago INT AUTO_INCREMENT PRIMARY KEY,
  fecha_pago DATETIME NOT NULL,
  monto_total DECIMAL(10,2) NOT NULL,
  metodo_pago VARCHAR(45) NOT NULL,
  idCita INT NOT NULL,
  FOREIGN KEY (idCita) REFERENCES CITA(idCita) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ──────────────────────────────────────────
-- DATOS DE PRUEBA
-- ──────────────────────────────────────────

INSERT IGNORE INTO ROL (idRol, nombre_rol) VALUES
  (1, 'Administrador'),
  (2, 'Empleado'),
  (3, 'Cajero');

INSERT IGNORE INTO USUARIO (idUsuario, nombre_usuario, contrasena, idRol) VALUES
  (1, 'admin',    'admin123',    1),
  (2, 'juan',     'juan456',     2),
  (3, 'maria',    'maria789',    2),
  (4, 'carlos',   'carlos321',   3);

INSERT IGNORE INTO CLIENTE (idCliente, nombre, telefono, direccion) VALUES
  (1, 'Luis Hernández',   '9381234567', 'Av. Principal #10, Carmen, Camp.'),
  (2, 'Ana Torres',       '9389876543', 'Calle 20 #45, Carmen, Camp.'),
  (3, 'Pedro Ramírez',    '9385551234', 'Col. Centro #33, Carmen, Camp.'),
  (4, 'Sofía Mendoza',    '9384447890', 'Fracc. Las Flores #7, Carmen, Camp.'),
  (5, 'Roberto Castillo', '9383336789', 'Calle 30 #12, Carmen, Camp.');

INSERT IGNORE INTO CATEGORIA_SERVICIO (idCategoria, nombre_categoria) VALUES
  (1, 'Lavado Exterior'),
  (2, 'Lavado Interior'),
  (3, 'Detallado Completo'),
  (4, 'Servicios Especiales');

INSERT IGNORE INTO SERVICIO (idServicio, nombre_servicio, descripcion, precio_base, idCategoria) VALUES
  (1, 'Lavado Básico Exterior',    'Lavado con shampoo y enjuague exterior',             80.00,  1),
  (2, 'Lavado Premium Exterior',   'Lavado + cera + secado con microfibra',              150.00, 1),
  (3, 'Aspirado Interior',         'Aspirado completo de alfombras y asientos',          100.00, 2),
  (4, 'Limpieza de Tapicería',     'Limpieza profunda con vapor en asientos',            250.00, 2),
  (5, 'Detallado Completo',        'Lavado exterior + interior + cera + renovador',      450.00, 3),
  (6, 'Pulido de Carrocería',      'Pulido y corrección de pintura',                     600.00, 4),
  (7, 'Lavado de Motor',           'Desengrasado y limpieza de motor',                   200.00, 4);

INSERT IGNORE INTO CITA (idCita, fecha_hora, estado, idCliente, idUsuario) VALUES
  (1, '2025-04-01 09:00:00', 'Completada', 1, 2),
  (2, '2025-04-02 10:30:00', 'Completada', 2, 3),
  (3, '2025-04-03 11:00:00', 'Pendiente',  3, 2),
  (4, '2025-04-04 14:00:00', 'En proceso', 4, 3),
  (5, '2025-04-05 16:00:00', 'Pendiente',  5, 2);

INSERT IGNORE INTO DETALLE_CITA (idCita, idServicio, cantidad, precio_aplicado) VALUES
  (1, 1, 1, 80.00),
  (1, 3, 1, 100.00),
  (2, 5, 1, 450.00),
  (3, 2, 1, 150.00),
  (3, 4, 1, 250.00),
  (4, 6, 1, 600.00),
  (5, 1, 1, 80.00),
  (5, 7, 1, 200.00);

INSERT IGNORE INTO PAGO (idPago, fecha_pago, monto_total, metodo_pago, idCita) VALUES
  (1, '2025-04-01 09:45:00', 180.00, 'Efectivo',       1),
  (2, '2025-04-02 11:15:00', 450.00, 'Tarjeta débito', 2);
`;

try {
  await connection.query(sql);
  console.log('✅ Base de datos creada correctamente.');
  console.log('✅ Tablas creadas correctamente.');
  console.log('✅ Datos de prueba insertados correctamente.\n');
  console.log('🎉 ¡Listo! Puedes iniciar el servidor con: npm run dev\n');
} catch (err) {
  console.error('❌ Error al ejecutar el script:', err.message);
} finally {
  await connection.end();
}