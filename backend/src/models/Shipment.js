//Orué
import mongoose from 'mongoose';

const shipmentSchema = new mongoose.Schema({
  orderId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Order', 
    required: true 
  },
  
  // Estado del envío
  status: {
    type: String,
    enum: ['Pendiente', 'Empaquetado', 'Enviado', 'En Tránsito', 'Entregado', 'Devuelto'],
    default: 'Pendiente'
  },

  // Fechas estimadas
  estimatedDelivery: { type: Date },
  
  // Historial de eventos para mostrar en la UX del cliente
  history: [
    {
      status: { type: String },
      location: { type: String },
      description: { type: String },
      timestamp: { type: Date, default: Date.now }
    }
  ],
  
  // URL directa al rastreo de la paquetería para mejorar la UX
  trackingUrl: { type: String }
}, { timestamps: true });

export default mongoose.model('Shipment', shipmentSchema);