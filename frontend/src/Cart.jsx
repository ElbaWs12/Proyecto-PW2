import React from 'react';
import { Link } from 'react-router-dom';

function Cart() {
  const items = [
    {
      id: "1",
      nombre: "Nike Air Force 1 '07",
      categoria: "Calzado de hombre",
      precio: 2399,
      talla: "27.5",
      cantidad: 1,
      img: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png"
    },
    {
      id: "2",
      nombre: "Adidas Samba OG",
      categoria: "Originals",
      precio: 2199,
      talla: "28",
      cantidad: 1,
      img: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/3bb35945121a47bea3c7f99949358932_9366/Tenis_Samba_OG_Blanco_B75806_01_standard.jpg"
    }
  ];

  const subtotal = items.reduce((acc, item) => acc + item.precio, 0);
  const envio = 0; // Envío gratis estilo Nike Members

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <div className="max-w-[1100px] mx-auto pt-10 pb-20 px-6 lg:flex lg:gap-16">
        
        {/* Columna Izquierda: Lista de Productos */}
        <div className="lg:w-[65%]">
          <h1 className="text-2xl font-medium mb-8">Carrito</h1>
          
          <div className="space-y-8">
            {items.map((item) => (
              <div key={item.id} className="flex gap-6 pb-8 border-b border-gray-100">
                <div className="w-40 h-40 bg-[#f6f6f6] flex-shrink-0">
                  <img src={item.img} alt={item.nombre} className="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <h2 className="font-medium text-lg uppercase tracking-tight">{item.nombre}</h2>
                    <p className="font-medium">${item.precio}</p>
                  </div>
                  <p className="text-gray-500 text-sm">{item.categoria}</p>
                  <p className="text-gray-500 text-sm">Talla: {item.talla}</p>
                  <p className="text-gray-500 text-sm">Cantidad: {item.cantidad}</p>
                  
                  <div className="pt-4 flex gap-4">
                    <button className="text-sm underline hover:text-gray-500">Eliminar</button>
                    <button className="text-sm underline hover:text-gray-500">Guardar para después</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
            <button className="w-full border border-gray-300 py-5 rounded-full font-bold uppercase text-sm flex items-center justify-center gap-2 hover:border-black transition-colors">
              PayPal
            </button>
          </div>
          
          <p className="text-[10px] text-gray-400 mt-6 text-center leading-relaxed">
            Al continuar con el pago, aceptas nuestros Términos y Condiciones y la Política de Privacidad.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Cart;