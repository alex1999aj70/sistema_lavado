import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './src/routes/routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

//  Ruta raíz 
app.get('/', (req, res) => {
  res.json({
    message: '🚗 API Sistema de Lavado de Autos',
    version: '1.0.0',
    endpoints: '/api/v1'
  });
});

//  Rutas API 
app.use('/api/v1', router);

//  404 handler 
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint no encontrado' });
});

//  Error handler 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor', error: err.message });
});

//  Iniciar servidor 
app.listen(PORT, () => {
  console.log(`\n  Sistema de Lavado - Backend API`);
  console.log(`  Servidor corriendo en: http://localhost:${PORT}`);
  console.log(`  API disponible en:     http://localhost:${PORT}/api/v1\n`);
});
