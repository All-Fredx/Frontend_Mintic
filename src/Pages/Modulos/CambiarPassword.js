import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentHeader from "../../Componentes/ContentHeader.js";
import Footer from "../../Componentes/Footer.js";
import Navbar from "../../Componentes/Navbar.js";
import SidebarContainer from "../../Componentes/SidebarContainer.js";
import APIInvoke from "../../val/APIInvoke.js";
import swal from "sweetalert";

const CambiarPassword = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const [contrasenaAnterior, setContrasenaAnterior] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const irAUsuario = () => {
    navigate("/usuario");
  };

  const guardarContraseña = async (e) => {
    e.preventDefault();
    if (nuevaContrasena !== confirmar) {
      swal({
        title: "Error",
        text: "Las nuevas contraseñas no coinciden",
        icon: "error",
        buttons: {
          confirm: {
            text: "OK",
            className: "btn btn-danger",
          },
        },
      });
      return;
    }
    const data = {
      contrasenaAnterior,
      nuevaContrasena,
    };
    const response = await APIInvoke.invokePUT(
      `/api/usuarios/password/${id}`,
      data
    );
    if (response.msg === "Contraseña actualizada correctamente") {
      const msg = "La Contraseña fue actualizada correctamente";
      swal({
        title: "Información",
        text: msg,
        icon: "success",
        buttons: {
          confirm: {
            text: "ok",
            value: true,
            visible: true,
            className: "btn btn-primary",
            closeModal: true,
          },
        },
      });
      navigate("/usuario");
    } else if (response.msg === "La contraseña anterior es incorrecta") {
      const msg = "La contraseña anterior es incorrecta";
      swal({
        title: "Error",
        text: msg,
        icon: "error",
        buttons: {
          confirm: {
            text: "ok",
            value: true,
            visible: true,
            className: "btn btn-danger",
            closeModal: true,
          },
        },
      });
    } else {
      const msg = "Hubo un error al actualizar la contraseña";
      swal({
        title: "Error",
        text: msg,
        icon: "error",
        buttons: {
          confirm: {
            text: "ok",
            value: true,
            visible: true,
            className: "btn btn-danger",
            closeModal: true,
          },
        },
      });
    }
  };

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidebarContainer></SidebarContainer>
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Modificar Contraseña"}
          breadCrumb1={"Usuario"}
          breadCrumb2={"Contraseña"}
          ruta1={"/usuario"}
        />
        <div
          className="container contenedor mx-auto"
          style={{ maxWidth: "400px" }}
        >
          <h3 className="text-center">Modificar Contraseña</h3>
          <div className="card register-card-body">
            <form onSubmit={guardarContraseña}>
              <label className="form-label">Contraseña Anterior</label>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Old Password"
                  value={contrasenaAnterior}
                  onChange={(e) => setContrasenaAnterior(e.target.value)}
                  id="password"
                  name="password"
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <label className="form-label">Nueva Contraseña</label>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="New Password"
                  value={nuevaContrasena}
                  onChange={(e) => setNuevaContrasena(e.target.value)}
                  id="newpassword"
                  name="newpassword"
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <label className="form-label">Confirmar Nueva Contraseña</label>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Retype New Password"
                  value={confirmar}
                  onChange={(e) => setConfirmar(e.target.value)}
                  id="confirmar"
                  name="confirmar"
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row mt-3 mb-3">
                <div className="col-md-12 text-center">
                  <button
                    type="button"
                    onClick={irAUsuario}
                    className="btn btn-secondary me-2"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default CambiarPassword;
