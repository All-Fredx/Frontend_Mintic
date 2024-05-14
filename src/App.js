import React from "react";
import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate,} from "react-router-dom";
import RutaProtegida from "./Pages/auth/RutaProtegida";
import Login from "./Pages/auth/Login";
import Registro from "./Pages/auth/Registro";
import Home from "./Pages/Home";
import MostrarCliente from "./Pages/Modulos/MostrarClientes";
import AgregarCliente from "./Pages/Modulos/AgregarCliente";
import ModificarCliente from "./Pages/Modulos/ModificarCliente";
import MostrarProveedor from "./Pages/Modulos/MostrarProveedor";
import AgregarProveedor from "./Pages/Modulos/AgregarProveedor";
import ModificarProveedor from "./Pages/Modulos/ModificarProveedor";
import MostrarUsuario from "./Pages/Modulos/MostrarUsuario";
import ModificarUsuario from "./Pages/Modulos/ModificarUsuario";
import CambiarPassword from "./Pages/Modulos/CambiarPassword";

function App() {
  return (
    <div className="App">
      <Fragment>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registro />} />
            <Route
              path="/usuario"
              element={<RutaProtegida element={<MostrarUsuario />} />}
            />
            <Route
              path="/usuario/editar"
              element={<RutaProtegida element={<ModificarUsuario />} />}
            />
            <Route
              path="/usuario/password"
              element={<RutaProtegida element={<CambiarPassword />} />}
            />
            <Route
              path="/clientes"
              element={<RutaProtegida element={<MostrarCliente />} />}
            />
            <Route
              path="/clientes/agregar"
              element={<RutaProtegida element={<AgregarCliente />} />}
            />
            <Route
              path="/home"
              element={<RutaProtegida element={<Home />} />}
            />
            <Route
              path="/clientes/editar/:id"
              element={<RutaProtegida element={<ModificarCliente />} />}
            />
            <Route
              path="/proveedores"
              element={<RutaProtegida element={<MostrarProveedor />} />}
            />
            <Route
              path="/proveedores/agregar"
              element={<RutaProtegida element={<AgregarProveedor />} />}
            />
            <Route
              path="/proveedores/editar/:id"
              element={<RutaProtegida element={<ModificarProveedor />} />}
            />
          </Routes>
        </Router>
      </Fragment>
    </div>
  );
}

export default App;
