//Orué 
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams(); // Obtenemos el ID de la URL
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`) 
    .then(res => {
    if (!res.ok) throw new Error('No se encontró el producto en el servidor');
    return res.json();
    })
    .then(data => setProducto(data))
    .catch(err => console.error("Error en la petición:", err));
    }, [id]);

  if (!producto) return <div className="p-20 text-center">Cargando...</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1200px] mx-auto pt-10 pb-20 px-6 lg:flex lg:gap-12">
        
        {/* Columna Izquierda: Imágenes */}
        <div className="lg:w-[65%]">
          <div className="bg-[#f6f6f6] aspect-square overflow-hidden rounded-sm">
            <img 
              src={producto.imagenUrl} 
              alt={producto.nombre} 
              className="w-full h-full object-cover mix-blend-multiply"
            />
          </div>
          {/* Aquí podrías poner más fotos si tuvieras un arreglo de imágenes */}
        </div>

        {/* Columna Derecha: Información (Sticky) */}
        <div className="lg:w-[35%] mt-8 lg:mt-0 lg:sticky lg:top-24 h-fit">
          <div className="space-y-1 mb-6">
            <h1 className="text-2xl font-medium uppercase tracking-tight">{producto.nombre}</h1>
            <p className="text-gray-600">{producto.categoria}</p>
            <p className="text-lg font-semibold pt-2">${producto.precio}</p>
          </div>

          <div className="py-6 border-t border-gray-100">
            <p className="text-sm leading-relaxed text-gray-800">
              {producto.descripcion || "Diseño innovador con materiales premium para un confort excepcional durante todo el día."}
            </p>
          </div>

          {/* Botones de acción */}
          <div className="space-y-3 pt-6">
            <button className="w-full bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 transition-colors">
              Añadir al carrito
            </button>
            <button className="w-full border border-gray-300 py-4 rounded-full font-medium hover:border-black transition-colors">
              Favorito ♡
            </button>
          </div>

          {/* Detalles adicionales estilo acordeón */}
          <div className="mt-10 pt-6 border-t border-gray-100 text-sm">
            <details className="cursor-pointer py-4 border-b border-gray-50">
              <summary className="font-medium list-none flex justify-between">
                Envío y Devoluciones <span>↓</span>
              </summary>
              <p className="pt-2 text-gray-500">Envío estándar gratuito para miembros.</p>
            </details>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetail;