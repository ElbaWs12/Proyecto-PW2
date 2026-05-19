import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const [isLogin, setIsLogin] = useState(null);
  const navigate = useNavigate();

  // Creamos estados para guardar lo que el usuario escribe - Orué
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Función que se ejecuta al darle clic al botón "Registrarse" o "Iniciar Sesión"
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitamos que la página se recargue

    if (!isLogin) {
      // --- FLUJO DE REGISTRO (SIGN UP) ---
      try {
        const respuesta = await fetch('http://localhost:5000/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, apellido, username, email, password }) // Mandamos los datos
        });

        const data = await respuesta.json();

        if (respuesta.ok) {
          alert('¡Cuenta creada con éxito! Ahora inicia sesión.');
          setNombre('');
          setApellido('');
          setUsername('');
          setEmail('');
          setPassword('');
          setIsLogin(true);
        } else {
          // Si el correo ya existe, el backend nos mandará el mensaje de error aquí
          alert(`Error: ${data.mensaje}`);
        }
      } catch (error) {
        console.error("Error al registrar:", error);
        alert("Hubo un error al conectar con el servidor.");
      }
    } else {
      // --- LÓGICA DE LOGIN ---
      try {
        const respuesta = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await respuesta.json();

        if (respuesta.ok) {
          // Aquí guardamos el ID en localStorage para que toda la app sepa quién es el usuario
          localStorage.setItem('userId', data.usuario._id);
          alert('Bienvenido de nuevo');
          navigate(`/profile/${data.usuario._id}`);
          setIsLogin(true);

        } else {

          alert(data.mensaje); // "Credenciales inválidas"
        }
      } catch (error) {

        alert("Error al conectar con el servidor");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f6f6] px-6">
      <div className="max-w-[400px] w-full p-10 rounded-xl">
        
        {/* Logo o Icono Abstracto */}
        <div className="flex justify-center mb-6">
           <div className="text-3xl font-black tracking-tighter uppercase">CASSIE'S</div>
        </div>

        {/* Encabezado */}
        <h1 className="text-2xl font-bold text-center uppercase tracking-tight mb-8">
          {isLogin ? 'TU CUENTA PARA TODO LO QUE TE GUSTA' : 'ÚNETE A NOSOTROS'}
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <input 
              type="text" 
              placeholder="Nombre" 
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required={!isLogin}
              className="w-full p-4 border border-gray-200 rounded-sm focus:border-black outline-none transition-colors placeholder:text-gray-400 text-sm"
            />
          )}
          
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-4 border border-gray-200 rounded-sm focus:border-black outline-none transition-colors placeholder:text-gray-400 text-sm"
          />
          
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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

          <button 
            type="submit"
            className="w-full bg-black text-white py-4 rounded-full font-bold uppercase text-xs hover:bg-gray-800 transition-colors"
          >
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <span className="text-gray-500">
            {isLogin ? '¿No eres miembro? ' : '¿Ya eres miembro? '}
          </span>
          <button 
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              // Limpieza
              setPassword(''); 
            }}
            className="font-bold underline uppercase text-xs ml-1 text-white"
          >
            {isLogin ? 'Únete a nosotros' : 'Inicia Sesión'}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Auth;