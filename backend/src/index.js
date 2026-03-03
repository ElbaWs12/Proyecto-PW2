import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';


dotenv.config();
connectDB();
const app = express();


app.use(cors());
app.use(express.json());

// ==========================================
//ENDPOINTS DE LA API 
// ==========================================


app.post('/api/users/register', (req, res) => {
    res.json({ mensaje: "SE REGISTRA E INCRIPTA LA CONTRASEÑA" });
});

app.post('/api/users/login', (req, res) => {
    res.json({ mensaje: "ACCESO Y TOKEN DE SEGURIDAD" });
});


app.get('/api/products', (req, res) => {
    res.json({ mensaje: "SE ENVIA AL FRONT EL CATALOGO DE PRODUCTOS" });
});

app.post('/api/products', (req, res) => {
    res.json({ mensaje: "EL ADMIN ORGANIZA O SUBE LOS ARTICULOS" });
});

app.post('/api/orders', (req, res) => {
    res.json({ mensaje: "SE PROCESA LA COMPRA: VALIDA STOCK O CONGELA PRECIO" });
});

app.get('/api/orders/history', (req, res) => {
    res.json({ mensaje: "HISTORIAL DE COMPRAS DEL CLIENTE" });
});


app.get('/api/recommendations', (req, res) => {
    res.json({ mensaje: "DEVUELVE LOS MAS VENDIDOS O VISTOS." });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`SERVER ON ${PORT}`));