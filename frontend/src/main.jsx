import React from 'react' //Cambié strictmode por React - Orué
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Importé esto - Orué
import './index.css'
import App from './App.jsx' 

// Cambié esto. Todo el sitio es envuelto en un navegador - Orué
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/*Envoltura*/}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)