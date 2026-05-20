import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Le decimos: "Usa el .env, pero si falla (undefined), usa esta dirección directamente"
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/tienda_nike';
        
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error de conexión: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;