import React, { useState } from 'react';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white text-black font-sans px-6">
      <div className="max-w-[380px] w-full py-10">
        
        {/* Logo o Icono Abstracto */}
        <div className="flex justify-center mb-6">
           <div className="text-3xl font-black tracking-tighter uppercase">CASSIE'S</div>
        </div>

        {/* Encabezado */}
        <h1 className="text-2xl font-bold text-center uppercase tracking-tight mb-8">
          {isLogin ? 'TU CUENTA PARA TODO LO QUE TE GUSTA' : 'ÚNETE A NOSOTROS'}
        </h1>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {!isLogin && (
            <input 
              type="text" 
              placeholder="Nombre completo" 
              className="w-full p-4 border border-gray-200 rounded-sm focus:border-black outline-none transition-colors placeholder:text-gray-400 text-sm"
            />
          )}
          
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            className="w-full p-4 border border-gray-200 rounded-sm focus:border-black outline-none transition-colors placeholder:text-gray-400 text-sm"
          />
          
          <input 
            type="password" 
            placeholder="Contraseña" 
            className="w-full p-4 border border-gray-200 rounded-sm focus:border-black outline-none transition-colors placeholder:text-gray-400 text-sm"
          />

          {isLogin && (
            <div className="flex justify-between items-center text-[12px] text-gray-500 pb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-black" /> Mantener sesión iniciada
              </label>
              <a href="#" className="underline hover:text-black">¿Olvidaste tu contraseña?</a>
            </div>
          )}

          <p className="text-[12px] text-gray-500 text-center leading-relaxed py-2">
            Al continuar, aceptas la <span className="underline cursor-pointer">Política de privacidad</span> y los <span className="underline cursor-pointer">Términos de uso</span> de nuestra tienda.
          </p>

          <button className="w-full bg-black text-white py-4 rounded-full font-bold uppercase text-xs hover:bg-gray-800 transition-colors">
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <span className="text-gray-500">
            {isLogin ? '¿No eres miembro? ' : '¿Ya eres miembro? '}
          </span>
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="font-bold underline uppercase text-xs ml-1 hover:text-gray-600"
          >
            {isLogin ? 'Únete a nosotros' : 'Inicia Sesión'}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Auth;