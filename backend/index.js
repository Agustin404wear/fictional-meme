import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import productosRoutes from './routes/productos.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch((err) => console.log('Error al conectar MongoDB:', err));

// Rutas
app.use('/api', productosRoutes);

// Iniciar servidor
const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
