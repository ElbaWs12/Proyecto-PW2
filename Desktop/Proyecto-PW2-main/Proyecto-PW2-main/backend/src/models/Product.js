//Orué
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  precio: { type: Number, required: true },
  imagenUrl: String,
  categoria: String,
  stock: { type: Number, default: 0 }
});

export default mongoose.model('Product', productSchema);