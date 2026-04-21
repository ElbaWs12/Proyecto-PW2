import React from 'react';

function UserProfile() {
  // Datos estáticos para la entrega
  const usuario = {
    nombre: "ADRIAN ALBA",
    miembroDesde: "Abril 2026",
    email: "elialba@uanl.edu.mx",
  };

  const historialCompras = [
    { id: "3421", fecha: "15 Abr 2026", total: 2399, estatus: "Entregado", item: "Nike Air Force 1 '07" },
    { id: "2988", fecha: "02 Mar 2026", total: 2199, estatus: "En camino", item: "Adidas Samba OG" },
    { id: "1544", fecha: "20 Feb 2026", total: 1399, estatus: "Entregado", item: "Vans Old Skool" }
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <div className="max-w-[1200px] mx-auto pt-10 pb-20 px-6">
        
        {/* Encabezado de Perfil */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-10 mb-10">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tighter uppercase">{usuario.nombre}</h1>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">Miembro desde {usuario.miembroDesde}</p>
          </div>
          <div className="mt-6 md:mt-0 flex gap-4">
            <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
              Editar Perfil
            </button>
            <button className="border border-gray-300 px-6 py-2 rounded-full text-sm font-medium hover:border-black transition-colors">
              Cerrar Sesión
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Columna Izquierda: Datos de Cuenta */}
          <div className="lg:col-span-1 space-y-10">
            <section>
              <h2 className="text-lg font-bold uppercase mb-4 tracking-tight">Información de contacto</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-400 uppercase text-xs font-bold mb-1">Email</p>
                  <p className="font-medium">{usuario.email}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Columna Derecha: Historial de Compras */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold uppercase mb-6 tracking-tight italic">Historial de pedidos recientes</h2>
            
            <div className="space-y-4">
              {historialCompras.map((pedido) => (
                <div key={pedido.id} className="border border-gray-100 p-6 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-sm transition-shadow cursor-pointer">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400 font-bold uppercase">Pedido #{pedido.id}</p>
                    <h3 className="font-semibold text-base">{pedido.item}</h3>
                    <p className="text-sm text-gray-500 italic">{pedido.fecha}</p>
                  </div>
                  <div className="mt-4 md:mt-0 text-left md:text-right">
                    <p className="font-black text-lg">${pedido.total}</p>
                    <span className={`text-[10px] px-2 py-1 uppercase font-bold tracking-tighter rounded-sm ${
                      pedido.estatus === 'Entregado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {pedido.estatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-8 border-b border-black pb-2 text-sm font-bold uppercase hover:text-gray-500 hover:border-gray-500 transition-colors">
              Ver todos los pedidos
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default UserProfile;