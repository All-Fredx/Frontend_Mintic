import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContentHeader from "../../Componentes/ContentHeader.js";
import Footer from "../../Componentes/Footer.js";
import Navbar from "../../Componentes/Navbar.js";
import SidebarContainer from "../../Componentes/SidebarContainer.js";
import APIInvoke from "../../val/APIInvoke.js";
import swal from "sweetalert";

const ModificarUsuario = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("id")
  const [nombres, setNombres] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getUsuariosByEmail();
    //eslint-disable-next-line
  }, []);
  const irAUsuario = () => {
    navigate("/usuario");
  };
  const getUsuariosByEmail = async () => {
    const response = await APIInvoke.invokeGET(`/api/usuarios/${id}`, {});
    if (response.msg === "Hubo un error al buscar el usuario") {
      const msg = "Hubo un error al buscar el usuario, para actualizarlo";
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
      setNombres(response.nombres);
      setEmail(response.email);
    }
  };
  const guardarUsuario = async (e) => {
    e.preventDefault();
    const response = await APIInvoke.invokePUT(`/api/usuarios/${id}`, {
      nombres,
      email,
    });
    if (response.msg === "Usuario actualizado correctamente") {
      localStorage.setItem("mail", email);
      const msg = "El usuario fue actualizado correctamente";
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
    } else if (
      response.msg === "Ya existe un usuario con ese correo electrónico"
    ) {
      const msg = `¡Ya existe un usuario con este E-mail, valida por favor!`;
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
    } else if (response.msg === "Hubo un error al actualizar el usuario") {
      const msg = "Hubo un error al actualizar el usuario";
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
          titulo={"Modificar Usuario"}
          breadCrumb1={"Usuario"}
          breadCrumb2={"Modificar"}
          ruta1={"/usuario"}
        />
        <div
          className="container contenedor mx-auto"
          style={{ maxWidth: "400px" }}
        >
          <h3 className="text-center">Modificar Usuario</h3>
          <div className="card register-card-body">
            <form onSubmit={guardarUsuario}>
              <div className="mb-3">
                <label className="form-label">Nombres</label>
                <input
                  value={nombres}
                  onChange={(e) => setNombres(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Ingrese los nombres"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">E-mail</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control"
                  placeholder="Ingrese el correo electrónico"
                  required
                />
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

export default ModificarUsuario;
