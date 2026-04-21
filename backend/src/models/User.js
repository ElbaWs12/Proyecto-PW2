//Orué
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  infoFacturacion: {
    rfc: String,
    direccion: String
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);