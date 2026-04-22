//Modifiqué este archivo - Orué
//Dividí la aplicación en dos vistas, una de inicio y otra para los detalles del producto.
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

//Pantallas
import UserProfile from './PerfilUsuario'; //Importar la vista UserProfile del archivo que la contiene - Orué
import ProductDetail from './ProductoDetalle'; //Importar la vista ProductDetail del archivo que la contiene - Orué 
import Cart from './Cart'; //Importar la vista Cart del archivo que la contiene - Orué 
import Auth from './Auth'; //Importar la vista Auth del archivo que la contiene - Orué 

// --- COMPONENTE DE LA NAVBAR  ---
const Navbar = () => (
  <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-100 sticky top-0 bg-white z-50">
    <Link to="/" className="text-3xl font-black tracking-tighter uppercase">CASSIE'S</Link>
    <ul className="hidden md:flex space-x-8 font-medium text-sm uppercase text-gray-500">
      <li className="hover:text-black cursor-pointer">Nuevos</li>
      <li className="hover:text-black cursor-pointer">Hombre</li>
      <li className="hover:text-black cursor-pointer">Mujer</li>
    </ul>
    <div className="flex items-center space-x-6">
      <button>🔍</button>
      <button>🛒</button>
    </div>
  </nav>
);

// --- MAIN ---
const Home = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

  return (
    <main className="max-w-[1440px] mx-auto px-8 py-12">
      <h1 className="text-2xl font-medium mb-12 border-l-4 border-black pl-4">Catálogo Completo</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-6">
        {productos.map((p) => (
          /* El Link hace que toda la tarjeta sea clickeable */
          <Link key={p._id} to={`/product/${p._id}`} className="group">
            <div className="aspect-[4/5] bg-[#f6f6f6] overflow-hidden mb-4">
              <img 
                src={p.imagenUrl || 'https://via.placeholder.com/600'} 
                alt={p.nombre}
                className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="space-y-1">
              <h2 className="font-medium text-base group-hover:underline">{p.nombre}</h2>
              <p className="text-gray-500 text-sm">{p.categoria}</p>
              <p className="font-semibold mt-2">${p.precio}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

// --- COMPONENTE PRINCIPAL ---
function App() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;