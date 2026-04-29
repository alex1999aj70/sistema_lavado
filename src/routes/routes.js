import { Router } from 'express';
import {
  getRoles, getRolById, createRol, updateRol, deleteRol,
  getUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario,
  getClientes, getClienteById, createCliente, updateCliente, deleteCliente,
  getCategorias, getCategoriaById, createCategoria, updateCategoria, deleteCategoria,
  getServicios, getServicioById, createServicio, updateServicio, deleteServicio,
  getCitas, getCitaById, createCita, updateCita, deleteCita,
  getDetallesByCita, addDetalle, deleteDetalle,
  getPagos, getPagoById, createPago, updatePago, deletePago
} from '../controllers/controllers.js';

const router = Router();

// ─── ROL ─────────────────────────────────────────────────────────────────────
router.get('/roles',         getRoles);
router.get('/roles/:id',     getRolById);
router.post('/roles',        createRol);
router.put('/roles/:id',     updateRol);
router.delete('/roles/:id',  deleteRol);

// ─── USUARIO ──────────────────────────────────────────────────────────────────
router.get('/usuarios',          getUsuarios);
router.get('/usuarios/:id',      getUsuarioById);
router.post('/usuarios',         createUsuario);
router.put('/usuarios/:id',      updateUsuario);
router.delete('/usuarios/:id',   deleteUsuario);

// ─── CLIENTE ──────────────────────────────────────────────────────────────────
router.get('/clientes',          getClientes);
router.get('/clientes/:id',      getClienteById);
router.post('/clientes',         createCliente);
router.put('/clientes/:id',      updateCliente);
router.delete('/clientes/:id',   deleteCliente);

// ─── CATEGORÍA SERVICIO ───────────────────────────────────────────────────────
router.get('/categorias',          getCategorias);
router.get('/categorias/:id',      getCategoriaById);
router.post('/categorias',         createCategoria);
router.put('/categorias/:id',      updateCategoria);
router.delete('/categorias/:id',   deleteCategoria);

// ─── SERVICIO ─────────────────────────────────────────────────────────────────
router.get('/servicios',           getServicios);
router.get('/servicios/:id',       getServicioById);
router.post('/servicios',          createServicio);
router.put('/servicios/:id',       updateServicio);
router.delete('/servicios/:id',    deleteServicio);

// ─── CITA ─────────────────────────────────────────────────────────────────────
router.get('/citas',               getCitas);
router.get('/citas/:id',           getCitaById);
router.post('/citas',              createCita);
router.put('/citas/:id',           updateCita);
router.delete('/citas/:id',        deleteCita);

// ─── DETALLE_CITA ─────────────────────────────────────────────────────────────
router.get('/citas/:idCita/detalles',                   getDetallesByCita);
router.post('/detalles',                                addDetalle);
router.delete('/detalles/:idCita/:idServicio',          deleteDetalle);

// ─── PAGO ─────────────────────────────────────────────────────────────────────
router.get('/pagos',               getPagos);
router.get('/pagos/:id',           getPagoById);
router.post('/pagos',              createPago);
router.put('/pagos/:id',           updatePago);
router.delete('/pagos/:id',        deletePago);

export default router;