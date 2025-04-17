import express from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import Producto from '../models/Producto.js';
import dotenv from 'dotenv';

dotenv.config();

// Configuración NUEVA correcta para MercadoPago v2.x
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

const router = express.Router();

// Obtener productos
router.get('/productos', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Crear preferencia de pago
router.post('/crear-preferencia', async (req, res) => {
  try {
    const items = req.body.items.map(item => ({
      title: item.title,
      unit_price: Number(item.price),
      quantity: item.cantidad,
      currency_id: 'ARS'
    }));

    const preference = new Preference(client);
    const response = await preference.create({ body: { items } });

    res.json({ init_point: response.init_point });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al crear preferencia de pago' });
  }
});

export default router;
