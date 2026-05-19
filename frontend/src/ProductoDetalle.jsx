// - Orué 
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductoDetalle() {
  const { id } = useParams(); // Obtenemos el ID del producto de la URL
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  // 1. Cargar el producto al entrar a la página
  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProducto(data);
        setCargando(false);
      })
      .catch(err => {
        console.error("Error al obtener el producto:", err);
        setCargando(false);
      });
  }, [id]);

  //Función para añadir al carrito
  const agregarAlCarrito = async () => {
    const userId = localStorage.getItem('userId');
    console.log("DEBUG FRONT - Usuario:", userId, "Producto:", id); // 👈 MIRA ESTO

    if (!userId) {
      alert("Por favor, inicia sesión");
      navigate('/login');
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId: id, cantidad: 1 }),
      });

      const data = await respuesta.json();
      console.log("Respuesta del servidor:", data); // 👈 MIRA ESTO

      if (respuesta.ok) {
        alert("¡Añadido!");
      } else {
        alert("Error: " + data.mensaje);
      }
    } catch (error) {
      console.error("Error capturado en el front:", error);
    }
  };

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f6f6] text-black">
        <p className="font-bold tracking-widest uppercase text-sm animate-pulse">Cargando producto...</p>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f6f6] text-black">
        <p className="font-medium text-lg">Producto no encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-white text-black font-sans">
      <div className="max-w-[1200px] mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Columna Izquierda: Imagen */}
        <div className="bg-[#f6f6f6] aspect-[4/5] flex items-center justify-center p-8">
          <img 
            src={producto.imagenUrl || 'https://via.placeholder.com/600'} 
            alt={producto.nombre} 
            className="w-full h-full object-cover mix-blend-multiply"
          />
        </div>

        {/* Columna Derecha: Detalles y Botones */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="space-y-2">
            <p className="text-gray-500 font-medium uppercase tracking-widest text-sm">
              {producto.categoria || 'Calzado'}
            </p>
            <h1 className="text-4xl font-black tracking-tighter uppercase">{producto.nombre}</h1>
            <p className="text-2xl font-medium mt-4">${producto.precio}</p>
          </div>

          <div className="space-y-4 pt-6">
            <p className="text-gray-600 leading-relaxed text-sm">
              {producto.descripcion || 'Una combinación perfecta de estilo y comodidad, ideal para acompañarte en tu día a día con el mejor diseño.'}
            </p>
          </div>

          <div className="pt-8">
            <button 
              onClick={agregarAlCarrito}
              className="w-full bg-black text-white py-5 rounded-full font-bold uppercase tracking-wide text-sm hover:bg-gray-800 transition-colors"
            >
              Añadir al Carrito
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductoDetalle;