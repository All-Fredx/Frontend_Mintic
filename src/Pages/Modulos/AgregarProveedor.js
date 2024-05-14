import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentHeader from "../../Componentes/ContentHeader.js";
import Footer from "../../Componentes/Footer.js";
import Navbar from "../../Componentes/Navbar.js";
import SidebarContainer from "../../Componentes/SidebarContainer.js";
import APIInvoke from "../../val/APIInvoke.js";
import swal from "sweetalert";

const AgregarProveedor = () => {
  const [razonSocial, setRazonSocial] = useState("");
  const [NIT, setNIT] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const navigate = useNavigate();

  const guardarProveedor = async (e) => {
    e.preventDefault();
    const response = await APIInvoke.invokePOST("/api/proveedores/", {
      razonSocial,
      NIT,
      correo,
      telefono,
      direccion,
    });
    if (response.msg === "El proveedor fue agregado") {
      const msg = "El proveedor fue agregado correctamente";
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
    } else if (response.msg === "Hubo un error al agregar el proveedor") {
      const msg = "Hubo un error al agregar el proveedor";
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
    limpiarCampos();
  };

  const limpiarCampos = () => {
    setRazonSocial("");
    setNIT("");
    setCorreo("");
    setTelefono("");
    setDireccion("");
  };
  const irAProveedores = () => {
    navigate("/proveedores");
  };

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidebarContainer></SidebarContainer>
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Agregar Proveedor"}
          breadCrumb1={"Proveedores"}
          breadCrumb2={"Agregar"}
          ruta1={"/proveedores"}
        />
        <div
          className="container contenedor mx-auto"
          style={{ maxWidth: "600px" }}
        >
          <h3 className="text-center">Agregar Proveedor</h3>
          <form onSubmit={guardarProveedor}>
            <div className="mb-3">
              <label className="form-label">Razon Social</label>
              <input
                value={razonSocial}
                onChange={(e) => setRazonSocial(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Ingrese la razón social"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">NIT</label>
              <input
                value={NIT}
                onChange={(e) => setNIT(e.target.value)}
                type="number"
                className="form-control"
                placeholder="Ingrese el NIT"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Correo</label>
              <input
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                type="email"
                className="form-control"
                placeholder="Ingrese el correo electrónico"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                type="number"
                className="form-control"
                placeholder="Ingrese el número de teléfono"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Dirección</label>
              <input
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Ingrese la dirección"
                required
              />
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={irAProveedores}
                className="btn btn-secondary me-2"
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AgregarProveedor;
