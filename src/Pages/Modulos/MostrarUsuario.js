import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContentHeader from "../../Componentes/ContentHeader.js";
import Footer from "../../Componentes/Footer.js";
import Navbar from "../../Componentes/Navbar.js";
import SidebarContainer from "../../Componentes/SidebarContainer.js";
import APIInvoke from "../../val/APIInvoke.js";
import swal from "sweetalert";

const MostrarUsuario = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const [nombres, setNombres] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getUsuariosByEmail();
    //eslint-disable-next-line
  }, []);
  const irAHome = () => {
    navigate("/home");
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

  const eliminarUsuario = async (e, correo) => {
    e.preventDefault();
    const response = await APIInvoke.invokeDELETE(`/api/usuarios/${correo}`);
    if (response.msg === "Usuario eliminado correctamente") {
      const msg = "El usuario ha sido eliminado correctamente";
      swal({
        title: "Información",
        text: msg,
        icon: "info",
        buttons: false,
        timer: 2000,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("mail");
      localStorage.removeItem("id");
      navigate("/");
    } else if (response.msg === "Hubo un error al eliminar el usuario") {
      const msg = "Hubo un error al eliminar el usuario";
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
    //eslint-disable-next-line
  };

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidebarContainer></SidebarContainer>
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Usuario"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"Usuario"}
          ruta1={"/home"}
        />
        <div
          className="container contenedor mx-auto"
          style={{ maxWidth: "400px" }}
        >
          <h3 className="text-center">Usuario</h3>
          <div className="card register-card-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Nombres</label>
                <input
                  value={nombres}
                  onChange={(e) => setNombres(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Ingrese los nombres"
                  required
                  readOnly
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
                  readOnly
                />
              </div>
              <div className="row mt-3 mb-3">
                <div className="col-md-12 text-center">
                  <Link to="editar" className="btn btn-success mb-1 ms-1 me-1">
                    <i className="fa-solid fa-file-pen"></i>
                  </Link>
                  <Link
                    to="password"
                    className="btn btn-success mb-1 ms-1 me-1"
                  >
                    <i className="fa-solid fa-unlock-keyhole"></i>
                  </Link>
                  <button
                    onClick={(e) => eliminarUsuario(e, email)}
                    className="btn btn-danger mb-1 ms-1 me-1"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
                <div className="col-md-12 text-center mt-3 mb-3">
                  <button
                    type="button"
                    onClick={irAHome}
                    className="btn btn-secondary me-2"
                  >
                    Inicio
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

export default MostrarUsuario;
