import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import swal from "sweetalert";

const RutaProtegida = ({ element }) => {
  const [redirect, setRedirect] = useState(false);
  // Función para verificar si el token ha expirado
  const checkTokenExpiration = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      // No hay token almacenado, redirigir a la página de inicio de sesión
      setRedirect(true);
      return;
    }

    // Decodificar el token para obtener la fecha de expiración
    const tokenData = JSON.parse(atob(token.split(".")[1]));
    const expirationTime = tokenData.exp * 1000; // Convertir a milisegundos

    // Obtener la hora actual
    const currentTime = Date.now();

    if (currentTime >= expirationTime) {
      swal({
        title: "¡Sesión Expirada!",
        text: "Tu sesión ha expirado. Vuelve a iniciar sesión.",
        icon: "warning",
        buttons: {
          confirm: {
            text: "OK",
            value: true,
            visible: true,
            closeModal: true,
          },
        },
      });
      setTimeout(() => {
        localStorage.removeItem("token");
        setRedirect(true);
      }, 1000);
      return;
    }
  };

  // Verificar el tiempo de expiración del token cuando el componente se monta
  useEffect(() => {
    const timeout = setInterval(checkTokenExpiration, 100); 
    return () => clearInterval(timeout); // Limpiar el intervalo al desmontar el componente
  }, []); // Llamada a useEffect sin dependencias

  if (redirect) {
    return <Navigate to="/login" />;
  }
  // Renderizar el elemento de la ruta
  return element;
};

export default RutaProtegida;
