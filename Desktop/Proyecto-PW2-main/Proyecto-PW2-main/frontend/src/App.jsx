//Modifiqué este archivo - Orué
//Dividí la aplicación en dos vistas, una de inicio y otra para los detalles del producto.
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route, Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Footer from './Footer';

//Pantallas
import UserProfile from './PerfilUsuario'; //Importar la vista UserProfile del archivo que la contiene - Orué
import ProductDetail from './ProductoDetalle'; //Importar la vista ProductDetail del archivo que la contiene - Orué 
import Cart from './Cart'; //Importar la vista Cart del archivo que la contiene - Orué 
import Auth from './Auth'; //Importar la vista Auth del archivo que la contiene - Orué 

// --- COMPONENTE DE LA NAVBAR COMPLETO ---
const Navbar = () => {
  const navigate = useNavigate(); // 👈 Inicializamos el navegador de React Router

  // Función para validar el acceso antes de navegar - Orué
  const navegarConValidacion = (rutaDestino) => {
  // Verificamos en el almacenamiento real del navegador
  const sesionActiva = localStorage.getItem('userId'); 

  if (!sesionActiva) {
    // Si no hay ID de usuario, es que no han entrado
    navigate('/login');
  } else {
    // Si existe el ID, tienen permiso total
    navigate(rutaDestino);
  }
};

  return (
    <header className="sticky top-0 bg-white z-50 border-b border-gray-100">
      <nav className="flex justify-between items-center px-8 py-4">
        <Link to="/" className="text-2xl font-black tracking-tighter uppercase">
          CASSIE'S
        </Link>

        <ul className="hidden md:flex space-x-8 font-medium text-sm uppercase text-gray-500">
          <li><Link to="/?categoria=Calzado" className="hover:text-black transition-colors">Calzado</Link></li>
          <li><Link to="/?categoria=Hombre" className="hover:text-black transition-colors">Hombre</Link></li>
          <li><Link to="/?categoria=Mujer" className="hover:text-black transition-colors">Mujer</Link></li>
          <li><Link to="/?categoria=Formal" className="hover:text-black transition-colors">Formal</Link></li>
        </ul>

        {/* Contenedor de botones alineados a la izquierda */}
        <div className="flex items-center justify-start space-x-6">
          
          {/* Botón Mi Perfil con Validación */}
          <button
            onClick={() => navegarConValidacion('/profile/userId')}
            className="text-xl hover:opacity-60 transition-opacity focus:outline-none"
            aria-label="Ver mi perfil"
          >
            👤
          </button>

          {/* Botón Carrito con Validación - Orué */}
          <button
            onClick={() => navegarConValidacion('/cart')}
            className="text-xl hover:opacity-60 transition-opacity focus:outline-none"
            aria-label="Ver carrito"
          >
            🛒
          </button>
        </div>
      </nav>

      {/* Despliegue de la Barra de Búsqueda Estilo Nike - Orué */}
      <div className="bg-gray-50 border-b border-gray-100 px-8 py-4 transition-all duration-300">
        <div className="max-w-3xl mx-auto flex items-center bg-white border border-gray-200 rounded-full px-4 py-2">
          <span className="text-gray-400 mr-2">🔍</span>
          <input
            type="text"
            placeholder="Buscar calzado o ropa..."
            className="w-full bg-transparent outline-none text-sm text-black placeholder:text-gray-400"
            autoFocus
          />
        </div>
      </div>
    </header>
  );
};


// --- MAIN ---
const Home = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

  const [searchParams] = useSearchParams();
  const categoriaFiltro = searchParams.get('categoria');

  const productosFiltrados = categoriaFiltro
    ? productos.filter(p => p.categoria === categoriaFiltro)
    : productos;

  return (
    <main className="max-w-[1440px] mx-auto px-8 py-12">
      <h1 className="text-2xl font-medium mb-12 border-l-4 border-black pl-4">Catálogo Completo</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-6">
        {productosFiltrados.map((p) => (
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
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Condición: Solo mostrar Navbar si NO estamos en /login */}
      {location.pathname !== '/login' && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
        <Route path="/login" element={<Auth />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;