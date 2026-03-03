import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// 1. Configuración inicial
dotenv.config();
connectDB();
const app = express();

// Middlewares (Para leer JSON y conectar el frontend)
app.use(cors());
app.use(express.json());

// ==========================================
// 2. ENDPOINTS DE LA API (Tienda Nike)
// ==========================================

// --- USUARIOS Y AUTENTICACIÓN (Seguridad) ---
app.post('/api/users/register', (req, res) => {
    res.json({ mensaje: "Endpoint listo: Aquí se registrará al cliente y se encriptará su contraseña." });
});

app.post('/api/users/login', (req, res) => {
    res.json({ mensaje: "Endpoint listo: Aquí se validará el acceso y se generará el token de seguridad." });
});

// --- PRODUCTOS (Rendimiento y Catálogo) ---
app.get('/api/products', (req, res) => {
    res.json({ mensaje: "Endpoint listo: Aquí se enviará la lista de tenis y ropa al frontend." });
});

app.post('/api/products', (req, res) => {
    res.json({ mensaje: "Endpoint protegido listo: Aquí el Administrador podrá subir nuevos artículos." });
});

// --- ORDENES Y CARRITO (Concurrencia e Integridad) ---
app.post('/api/orders', (req, res) => {
    res.json({ mensaje: "Endpoint listo: Aquí se procesará el pago, validando el stock (concurrencia) y congelando el precio." });
});

app.get('/api/orders/history', (req, res) => {
    res.json({ mensaje: "Endpoint listo: Aquí se devolverá el historial exacto de compras del usuario activo." });
});

// --- RECOMENDACIONES ---
app.get('/api/recommendations', (req, res) => {
    res.json({ mensaje: "Endpoint listo: Aquí se devolverán los artículos más vendidos o sugeridos." });
});

// 3. Levantar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));