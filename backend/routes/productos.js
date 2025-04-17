import express from 'express';
import pkg from 'mercadopago';
const mercadopago = pkg.default;

import Producto from '../models/Producto.js';
import dotenv from 'dotenv';

dotenv.config();
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN
});

const router = express.Router();

router.get('/productos', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

router.post('/crear-preferencia', async (req, res) => {
  try {
    const items = req.body.items.map(item => ({
      title: item.title,
      unit_price: Number(item.price),
      quantity: item.cantidad,
      currency_id: 'ARS'
    }));

    const preference = await mercadopago.preferences.create({ items });
    res.json({ init_point: preference.body.init_point });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear preferencia de pago' });
  }
});

export default router;