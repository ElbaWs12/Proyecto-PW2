import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      navigate('/login');
      return;
    }

    // Corregido: Ahora apunta a tu nueva ruta de carrito con populate
    fetch(`http://localhost:5000/api/cart/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener el carrito');
        return res.json();
      })
      .then((data) => {
        setCartItems(data || []);
        setCargando(false);
      })
      .catch((err) => {
        console.error(err);
        alert('Sesión expirada o inválida.');
        localStorage.removeItem('userId');
        navigate('/login');
      });
  }, [navigate]);

  const subtotal = cartItems.reduce((acc, item) => {
    if (!item.producto) return acc;
    return acc + (item.producto.precio * item.cantidad);
  }, 0);

  const envio = subtotal > 500 || subtotal === 0 ? 0 : 99;

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black">
        <p className="text-lg font-medium animate-pulse">Cargando tu carrito...</p>
      </div>
    );
  }

  const eliminarDelCarrito = (cartItemId) => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    // Confirmación rápida opcional para el usuario
    if (!window.confirm("¿Seguro que quieres quitar este artículo?")) return;

    fetch(`http://localhost:5000/api/cart/${userId}/${cartItemId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('No se pudo eliminar el producto');
        return res.json();
      })
      .then((nuevoCarrito) => {
        // El backend nos devuelve el carrito actualizado, así que solo refrescamos el estado
        setCartItems(nuevoCarrito);
      })
      .catch((err) => {
        console.error(err);
        alert('Hubo un error al intentar eliminar el producto.');
      });
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <div className="max-w-[1100px] mx-auto pt-10 pb-20 px-6 lg:flex lg:gap-16">

        {/* Columna Izquierda: Lista de Productos */}
        <div className="lg:w-[65%]">
          <h1 className="text-2xl font-medium mb-8">Carrito</h1>

          {cartItems.length === 0 ? (
            <p className="text-gray-500">Tu carrito está vacío.</p>
          ) : (
            <div className="space-y-8">
              {cartItems.map((item) => {
                if (!item.producto) return null;

                return (
                  <div key={item._id} className="flex gap-6 pb-8 border-b border-gray-100">
                    <div className="w-40 h-40 bg-[#f6f6f6] flex-shrink-0">
                      <img
                        src={item.producto.imagenUrl}
                        alt={item.producto.nombre}
                        className="w-full h-full object-cover mix-blend-multiply"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        {/* Ojo aquí: item.producto.nombre e item.producto.precio */}
                        <h2 className="font-medium text-lg uppercase tracking-tight">{item.producto.nombre}</h2>
                        <p className="font-medium">${item.producto.precio}</p>
                      </div>
                      {/* Asumiendo que estos datos también viven en tu modelo Producto */}
                      <p className="text-gray-500 text-sm">{item.producto.categoria}</p>
                      <p className="text-gray-500 text-sm">Talla: {item.producto.talla || 'N/A'}</p>

                      {/* La cantidad sí vive en la raíz del objeto del carrito */}
                      <p className="text-gray-500 text-sm">Cantidad: {item.cantidad}</p>

                      <div className="pt-4 flex gap-4">
                        <button 
                          onClick={() => eliminarDelCarrito(item._id)}
                          className="text-white underline hover:text-gray-500"
                        >
                          Eliminar
                        </button>
                        {/* <button className="text-white underline hover:text-gray-500">Guardar para después</button> */}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Columna Derecha: Resumen de Compra */}
        <div className="lg:w-[35%] mt-12 lg:mt-0">
          <h2 className="text-2xl font-medium mb-8">Resumen</h2>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Gastos de envío y gestión estimados</span>
              <span className="font-medium">{envio === 0 ? 'Gratis' : `$${envio}`}</span>
            </div>
            <div className="py-4 border-y border-gray-100 flex justify-between text-base font-medium mt-4">
              <span>Total</span>
              <span>${(subtotal + envio).toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <button className="w-full bg-black text-white py-5 rounded-full font-bold uppercase text-sm hover:bg-gray-800 transition-colors">
              Pasar por caja
            </button>
            <button className="w-full bg-black text-white py-5 rounded-full font-bold uppercase text-sm flex items-center justify-center gap-2 hover:border-black transition-colors">
              PayPal
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Cart;