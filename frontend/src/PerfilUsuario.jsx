import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PerfilUsuario() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Historial de compras simulado (puedes dejarlo estático para el avance de la entrega)
  const historialCompras = [
    
  ];

  useEffect(() => {
    // Obtener el ID del usuario desde el localStorage
    const userId = localStorage.getItem('userId');

    if (!userId) {
      navigate('/login');
      return;
    }

    // Hacer la petición a la API con el ID real del usuario activo
    fetch(`http://localhost:5000/api/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener los datos del usuario');
        return res.json();
      })
      .then((data) => {
        setUsuario(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error(err);
        alert('Sesión expirada o inválida.');
        localStorage.removeItem('userId'); // Limpiamos por seguridad
        navigate('/login');
      });
  }, [navigate]);

  // 3. Función para destruir la sesión activa
  const handleLogout = () => {
    localStorage.removeItem('userId'); // Borra el ID del navegador
    alert('Sesión cerrada correctamente');
    navigate('/login'); // Redirige a la pantalla de entrada
  };

  // Pantalla de carga limpia mientras responde la base de datos
  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f6f6] text-black">
        <p className="font-bold tracking-widest uppercase text-sm animate-pulse">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f6f6] text-black font-sans">
      <div className="max-w-[1200px] mx-auto pt-10 pb-20 px-6">

        {/* Encabezado de Perfil */ }
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-10 mb-10">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tighter uppercase">{usuario.nombre}</h1>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">
              Cuenta de Socio Activa
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex gap-4">
            <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
              Editar Perfil
            </button>
            {/* Conectamos la función de cierre de sesión aquí */}
            <button
              onClick={handleLogout}
              className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Columna Izquierda: Datos de Cuenta */}
          <div className="lg:col-span-1 space-y-10">
            <section className="bg-white p-6 rounded-sm shadow-sm">
              <h2 className="text-lg font-bold uppercase mb-4 tracking-tight">Información de contacto</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-400 uppercase text-xs font-bold mb-1">Nombre Completo</p>
                  <p className="font-medium">{usuario.nombre}</p>
                </div>
                <div>
                  <p className="text-gray-400 uppercase text-xs font-bold mb-1">Email Registrado</p>
                  <p className="font-medium">{usuario.email}</p>
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-sm shadow-sm">
              <h2 className="text-lg font-bold uppercase mb-4 tracking-tight">Datos de Facturación</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-400 uppercase text-xs font-bold mb-1">RFC</p>
                  <p className="font-medium">
                    {usuario.infoFacturacion?.rfc || 'No registrado aún'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 uppercase text-xs font-bold mb-1">Dirección de Envío habitual</p>
                  <p className="font-medium leading-relaxed">
                    {usuario.infoFacturacion?.direccion || 'No registrada aún'}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Columna Derecha: Historial de Compras */}
          <div className="lg:col-span-2 bg-white p-6 rounded-sm shadow-sm">
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
                    <span className="text-[10px] px-2 py-1 uppercase font-bold tracking-tighter rounded-sm bg-green-100 text-green-700">
                      {pedido.estatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
              Ver todos los pedidos
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PerfilUsuario;