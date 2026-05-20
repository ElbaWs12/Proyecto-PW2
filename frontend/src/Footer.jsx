import React from 'react';

function Footer() {
  return (
    <footer className="w-full bg-white text-black border-t border-gray-100 py-8 px-6">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm tracking-tight">
        
        {/* Lado izquierdo: Marca y Dirección */}
        <div className="text-center md:text-left space-y-1">
          <p className="font-medium text-base">Cassie's Shop</p>
          <p className="text-gray-500 text-xs md:text-sm">Av. Pedro de Alba S/N</p>
        </div>

        {/* Lado derecho: Créditos */}
        <div className="text-center md:text-right">
          <p className="text-gray-400 text-xs">
            Creado por <span className="text-black font-medium">Cassie, Eli y Alejandro</span>
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;