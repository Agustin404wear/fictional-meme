import mongoose from 'mongoose';

const ProductoSchema = new mongoose.Schema({
  title: String,
  price: Number,
  cantidad: Number,
  image: String
});

export default mongoose.model('Producto', ProductoSchema);