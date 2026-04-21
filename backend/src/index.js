import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import Product from './models/Product.js'; // Orué
import User from './models/User.js'; // Orué


dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json());

// ==========================================
//ENDPOINTS DE LA API 
// ==========================================

// Obtener todos los productos - Orué
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Obtener UN producto - Orué
app.get('/api/products/:id', async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);
    if (!producto) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

// Agregar un producto nuevo - Orué
app.post('/api/products', async (req, res) => {
  const nuevoProducto = new Product(req.body);
  await nuevoProducto.save();
  res.status(201).json(nuevoProducto);
});

// Actualizar un producto por su ID
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params; // Obtenemos el id de la URL
    const datosActualizados = req.body; // Los nuevos datos vienen en el body

    const productoEditado = await Product.findByIdAndUpdate(
      id, 
      datosActualizados, 
      { new: true } // Esta opción devuelve el producto ya modificado
    );

    if (!productoEditado) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.json(productoEditado);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar", error });
  }
});

// DELETE producto - Orué
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productoEliminado = await Product.findByIdAndDelete(id);

    if (!productoEliminado) {
      return res.status(404).json({ mensaje: "El producto no existe" });
    }

    res.json({ mensaje: "Producto eliminado correctamente", productoEliminado });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar", error });
  }
});

// Obtener datos de un usuario - Orué
app.get('/api/users/:id', async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id).select('-password');
    
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    
    res.json(usuario);
  } catch (error) {
    // Si el ID tiene un formato inválido, caerá aquí
    console.error("Error al obtener usuario:", error);
    res.status(400).json({ mensaje: "ID de usuario inválido o error en el servidor" });
  }
});

// Registrar un usuario nuevo
app.post('/api/users', async (req, res) => {
  try {
    const nuevoUsuario = new User(req.body);
    const usuarioGuardado = await nuevoUsuario.save();
    
    // Convertimos a objeto para quitar la contraseña de la respuesta por seguridad
    const respuesta = usuarioGuardado.toObject();
    delete respuesta.password;
    
    res.status(201).json(respuesta);
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    if (error.code === 11000) { // Error de MongoDB para correos duplicados
      return res.status(400).json({ mensaje: "El correo electrónico ya está registrado." });
    }
    res.status(400).json({ mensaje: "Error al crear la cuenta.", error });
  }
});

// Actualizar datos de un usuario - Orué
app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const datosNuevos = req.body;

    // .select('-password') asegura que no regresemos la contraseña en la respuesta
    const usuarioEditado = await User.findByIdAndUpdate(
      id, 
      datosNuevos, 
      { new: true, runValidators: true } 
    ).select('-password');

    if (!usuarioEditado) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.json(usuarioEditado);
  } catch (error) {
    console.error("Error al actualizar:", error);
    res.status(500).json({ mensaje: "Error interno al actualizar usuario", error });
  }
});

// DELETE de usuario - Orué
app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioBorrado = await User.findByIdAndDelete(id);

    if (!usuarioBorrado) {
      return res.status(404).json({ mensaje: "El usuario que intentas borrar no existe" });
    }

    res.json({ mensaje: "Usuario eliminado de la plataforma correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al intentar eliminar el usuario", error });
  }
});

// Registro de envío - Orué
app.post('/api/shipments', async (req, res) => {
  try {
    const { orderId, carrier, trackingNumber, estimatedDelivery } = req.body;
    
    const nuevoEnvio = new Shipment({
      orderId,
      carrier,
      trackingNumber,
      estimatedDelivery,
      status: 'Enviado',
      history: [{ status: 'Enviado', description: 'El paquete ha salido de nuestro almacén.' }]
    });

    await nuevoEnvio.save();
    res.status(201).json(nuevoEnvio);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear el envío", error });
  }
});

// Obtener todos los envíos - Orué
app.get('/api/shipments', async (req, res) => {
  try {
    const shipments = await Shipment.find().populate('orderId');
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al traer los envíos", error });
  }
});

// Obtener un envío por ID - Orué
app.get('/api/shipments/:id', async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) return res.status(404).json({ mensaje: "Envío no encontrado" });
    res.json(shipment);
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor", error });
  }
});

// Actualizar el estado del envío - Orué
app.put('/api/shipments/:id', async (req, res) => {
  try {
    // Si envías un nuevo evento en el body, lo "pusheamos" al arreglo de history
    const { status, location, description } = req.body;
    
    const updateData = { ...req.body };
    
    // Lógica para no borrar el historial, sino agregarle eventos
    const shipmentActualizado = await Shipment.findByIdAndUpdate(
      req.params.id,
      { 
        $set: updateData,
        $push: status ? { history: { status, location, description } } : {} 
      },
      { new: true }
    );

    if (!shipmentActualizado) return res.status(404).json({ mensaje: "Envío no encontrado" });
    res.json(shipmentActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el envío", error });
  }
});

// DELETE de envío - Orué
app.delete('/api/shipments/:id', async (req, res) => {
  try {
    const shipmentBorrado = await Shipment.findByIdAndDelete(req.params.id);
    if (!shipmentBorrado) return res.status(404).json({ mensaje: "El registro no existe" });
    res.json({ mensaje: "Registro de envío eliminado" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar", error });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`SERVER ON ${PORT}`));