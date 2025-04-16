import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String,
  tipo: String,
});

export default mongoose.model('Producto', productoSchema);