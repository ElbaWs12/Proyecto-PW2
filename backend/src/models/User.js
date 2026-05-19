//Orué
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  infoFacturacion: {
    rfc: String,
    direccion: String
  },
  carrito: [{
    producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    cantidad: { type: Number, default: 1 }
  }]
}, { timestamps: true });

export default mongoose.model('User', userSchema);