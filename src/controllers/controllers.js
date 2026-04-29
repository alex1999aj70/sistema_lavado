import pool from '../db/connection.js';

// ─── ROL ────────────────────────────────────────────────────────────────────
export const getRoles = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM ROL');
  res.json(rows);
};
export const getRolById = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM ROL WHERE idRol = ?', [req.params.id]);
  if (!rows.length) return res.status(404).json({ message: 'Rol no encontrado' });
  res.json(rows[0]);
};
export const createRol = async (req, res) => {
  const { nombre_rol } = req.body;
  const [result] = await pool.query('INSERT INTO ROL (nombre_rol) VALUES (?)', [nombre_rol]);
  res.status(201).json({ idRol: result.insertId, nombre_rol });
};
export const updateRol = async (req, res) => {
  const { nombre_rol } = req.body;
  await pool.query('UPDATE ROL SET nombre_rol = ? WHERE idRol = ?', [nombre_rol, req.params.id]);
  res.json({ message: 'Rol actualizado' });
};
export const deleteRol = async (req, res) => {
  await pool.query('DELETE FROM ROL WHERE idRol = ?', [req.params.id]);
  res.json({ message: 'Rol eliminado' });
};

// ─── USUARIO ─────────────────────────────────────────────────────────────────
export const getUsuarios = async (req, res) => {
  const [rows] = await pool.query(
    `SELECT u.idUsuario, u.nombre_usuario, r.nombre_rol
     FROM USUARIO u JOIN ROL r ON u.idRol = r.idRol`
  );
  res.json(rows);
};
export const getUsuarioById = async (req, res) => {
  const [rows] = await pool.query(
    `SELECT u.idUsuario, u.nombre_usuario, r.nombre_rol
     FROM USUARIO u JOIN ROL r ON u.idRol = r.idRol WHERE u.idUsuario = ?`, [req.params.id]
  );
  if (!rows.length) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json(rows[0]);
};
export const createUsuario = async (req, res) => {
  const { nombre_usuario, contrasena, idRol } = req.body;
  const [result] = await pool.query(
    'INSERT INTO USUARIO (nombre_usuario, contrasena, idRol) VALUES (?,?,?)',
    [nombre_usuario, contrasena, idRol]
  );
  res.status(201).json({ idUsuario: result.insertId, nombre_usuario });
};
export const updateUsuario = async (req, res) => {
  const { nombre_usuario, contrasena, idRol } = req.body;
  await pool.query(
    'UPDATE USUARIO SET nombre_usuario=?, contrasena=?, idRol=? WHERE idUsuario=?',
    [nombre_usuario, contrasena, idRol, req.params.id]
  );
  res.json({ message: 'Usuario actualizado' });
};
export const deleteUsuario = async (req, res) => {
  await pool.query('DELETE FROM USUARIO WHERE idUsuario = ?', [req.params.id]);
  res.json({ message: 'Usuario eliminado' });
};

// ─── CLIENTE ──────────────────────────────────────────────────────────────────
export const getClientes = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM CLIENTE');
  res.json(rows);
};
export const getClienteById = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM CLIENTE WHERE idCliente = ?', [req.params.id]);
  if (!rows.length) return res.status(404).json({ message: 'Cliente no encontrado' });
  res.json(rows[0]);
};
export const createCliente = async (req, res) => {
  const { nombre, telefono, direccion } = req.body;
  const [result] = await pool.query(
    'INSERT INTO CLIENTE (nombre, telefono, direccion) VALUES (?,?,?)',
    [nombre, telefono, direccion]
  );
  res.status(201).json({ idCliente: result.insertId, nombre });
};
export const updateCliente = async (req, res) => {
  const { nombre, telefono, direccion } = req.body;
  await pool.query(
    'UPDATE CLIENTE SET nombre=?, telefono=?, direccion=? WHERE idCliente=?',
    [nombre, telefono, direccion, req.params.id]
  );
  res.json({ message: 'Cliente actualizado' });
};
export const deleteCliente = async (req, res) => {
  await pool.query('DELETE FROM CLIENTE WHERE idCliente = ?', [req.params.id]);
  res.json({ message: 'Cliente eliminado' });
};

// ─── CATEGORIA_SERVICIO ───────────────────────────────────────────────────────
export const getCategorias = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM CATEGORIA_SERVICIO');
  res.json(rows);
};
export const getCategoriaById = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM CATEGORIA_SERVICIO WHERE idCategoria = ?', [req.params.id]);
  if (!rows.length) return res.status(404).json({ message: 'Categoría no encontrada' });
  res.json(rows[0]);
};
export const createCategoria = async (req, res) => {
  const { nombre_categoria } = req.body;
  const [result] = await pool.query('INSERT INTO CATEGORIA_SERVICIO (nombre_categoria) VALUES (?)', [nombre_categoria]);
  res.status(201).json({ idCategoria: result.insertId, nombre_categoria });
};
export const updateCategoria = async (req, res) => {
  const { nombre_categoria } = req.body;
  await pool.query('UPDATE CATEGORIA_SERVICIO SET nombre_categoria=? WHERE idCategoria=?', [nombre_categoria, req.params.id]);
  res.json({ message: 'Categoría actualizada' });
};
export const deleteCategoria = async (req, res) => {
  await pool.query('DELETE FROM CATEGORIA_SERVICIO WHERE idCategoria = ?', [req.params.id]);
  res.json({ message: 'Categoría eliminada' });
};

// ─── SERVICIO ─────────────────────────────────────────────────────────────────
export const getServicios = async (req, res) => {
  const [rows] = await pool.query(
    `SELECT s.*, c.nombre_categoria FROM SERVICIO s
     JOIN CATEGORIA_SERVICIO c ON s.idCategoria = c.idCategoria`
  );
  res.json(rows);
};
export const getServicioById = async (req, res) => {
  const [rows] = await pool.query(
    `SELECT s.*, c.nombre_categoria FROM SERVICIO s
     JOIN CATEGORIA_SERVICIO c ON s.idCategoria = c.idCategoria
     WHERE s.idServicio = ?`, [req.params.id]
  );
  if (!rows.length) return res.status(404).json({ message: 'Servicio no encontrado' });
  res.json(rows[0]);
};
export const createServicio = async (req, res) => {
  const { nombre_servicio, descripcion, precio_base, idCategoria } = req.body;
  const [result] = await pool.query(
    'INSERT INTO SERVICIO (nombre_servicio, descripcion, precio_base, idCategoria) VALUES (?,?,?,?)',
    [nombre_servicio, descripcion, precio_base, idCategoria]
  );
  res.status(201).json({ idServicio: result.insertId, nombre_servicio });
};
export const updateServicio = async (req, res) => {
  const { nombre_servicio, descripcion, precio_base, idCategoria } = req.body;
  await pool.query(
    'UPDATE SERVICIO SET nombre_servicio=?, descripcion=?, precio_base=?, idCategoria=? WHERE idServicio=?',
    [nombre_servicio, descripcion, precio_base, idCategoria, req.params.id]
  );
  res.json({ message: 'Servicio actualizado' });
};
export const deleteServicio = async (req, res) => {
  await pool.query('DELETE FROM SERVICIO WHERE idServicio = ?', [req.params.id]);
  res.json({ message: 'Servicio eliminado' });
};

// ─── CITA ─────────────────────────────────────────────────────────────────────
export const getCitas = async (req, res) => {
  const [rows] = await pool.query(
    `SELECT c.*, cl.nombre AS cliente, u.nombre_usuario AS empleado
     FROM CITA c
     JOIN CLIENTE cl ON c.idCliente = cl.idCliente
     JOIN USUARIO u ON c.idUsuario = u.idUsuario`
  );
  res.json(rows);
};
export const getCitaById = async (req, res) => {
  const [rows] = await pool.query(
    `SELECT c.*, cl.nombre AS cliente, u.nombre_usuario AS empleado
     FROM CITA c
     JOIN CLIENTE cl ON c.idCliente = cl.idCliente
     JOIN USUARIO u ON c.idUsuario = u.idUsuario
     WHERE c.idCita = ?`, [req.params.id]
  );
  if (!rows.length) return res.status(404).json({ message: 'Cita no encontrada' });
  res.json(rows[0]);
};
export const createCita = async (req, res) => {
  const { fecha_hora, estado, idCliente, idUsuario } = req.body;
  const [result] = await pool.query(
    'INSERT INTO CITA (fecha_hora, estado, idCliente, idUsuario) VALUES (?,?,?,?)',
    [fecha_hora, estado || 'Pendiente', idCliente, idUsuario]
  );
  res.status(201).json({ idCita: result.insertId, fecha_hora, estado: estado || 'Pendiente' });
};
export const updateCita = async (req, res) => {
  const { fecha_hora, estado, idCliente, idUsuario } = req.body;
  await pool.query(
    'UPDATE CITA SET fecha_hora=?, estado=?, idCliente=?, idUsuario=? WHERE idCita=?',
    [fecha_hora, estado, idCliente, idUsuario, req.params.id]
  );
  res.json({ message: 'Cita actualizada' });
};
export const deleteCita = async (req, res) => {
  await pool.query('DELETE FROM CITA WHERE idCita = ?', [req.params.id]);
  res.json({ message: 'Cita eliminada' });
};

// ─── DETALLE_CITA ─────────────────────────────────────────────────────────────
export const getDetallesByCita = async (req, res) => {
  const [rows] = await pool.query(
    `SELECT dc.*, s.nombre_servicio FROM DETALLE_CITA dc
     JOIN SERVICIO s ON dc.idServicio = s.idServicio
     WHERE dc.idCita = ?`, [req.params.idCita]
  );
  res.json(rows);
};
export const addDetalle = async (req, res) => {
  const { idCita, idServicio, cantidad, precio_aplicado } = req.body;
  await pool.query(
    'INSERT INTO DETALLE_CITA (idCita, idServicio, cantidad, precio_aplicado) VALUES (?,?,?,?)',
    [idCita, idServicio, cantidad || 1, precio_aplicado]
  );
  res.status(201).json({ message: 'Detalle agregado' });
};
export const deleteDetalle = async (req, res) => {
  const { idCita, idServicio } = req.params;
  await pool.query('DELETE FROM DETALLE_CITA WHERE idCita=? AND idServicio=?', [idCita, idServicio]);
  res.json({ message: 'Detalle eliminado' });
};

// ─── PAGO ─────────────────────────────────────────────────────────────────────
export const getPagos = async (req, res) => {
  const [rows] = await pool.query(
    `SELECT p.*, c.fecha_hora AS fecha_cita, cl.nombre AS cliente
     FROM PAGO p
     JOIN CITA c ON p.idCita = c.idCita
     JOIN CLIENTE cl ON c.idCliente = cl.idCliente`
  );
  res.json(rows);
};
export const getPagoById = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM PAGO WHERE idPago = ?', [req.params.id]);
  if (!rows.length) return res.status(404).json({ message: 'Pago no encontrado' });
  res.json(rows[0]);
};
export const createPago = async (req, res) => {
  const { fecha_pago, monto_total, metodo_pago, idCita } = req.body;
  const [result] = await pool.query(
    'INSERT INTO PAGO (fecha_pago, monto_total, metodo_pago, idCita) VALUES (?,?,?,?)',
    [fecha_pago, monto_total, metodo_pago, idCita]
  );
  res.status(201).json({ idPago: result.insertId, monto_total, metodo_pago });
};
export const updatePago = async (req, res) => {
  const { fecha_pago, monto_total, metodo_pago, idCita } = req.body;
  await pool.query(
    'UPDATE PAGO SET fecha_pago=?, monto_total=?, metodo_pago=?, idCita=? WHERE idPago=?',
    [fecha_pago, monto_total, metodo_pago, idCita, req.params.id]
  );
  res.json({ message: 'Pago actualizado' });
};
export const deletePago = async (req, res) => {
  await pool.query('DELETE FROM PAGO WHERE idPago = ?', [req.params.id]);
  res.json({ message: 'Pago eliminado' });
};