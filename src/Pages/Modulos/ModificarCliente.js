import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContentHeader from "../../Componentes/ContentHeader.js";
import Footer from "../../Componentes/Footer.js";
import Navbar from "../../Componentes/Navbar.js";
import SidebarContainer from "../../Componentes/SidebarContainer.js";
import APIInvoke from "../../val/APIInvoke.js";
import swal from "sweetalert";

const ModificarCliente = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [documento, setDocumento] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  const guardarCliente = async (e) => {
    e.preventDefault();
    const response = await APIInvoke.invokePUT(`/api/clientes/${id}`, {
      nombres,
      apellidos,
      documento,
      correo,
      telefono,
      direccion,
    });
    if (response.msg === "Cliente actualizado correctamente") {
      const msg = "El cliente fue actualizado correctamente";
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
    } else if (response.msg === "Hubo un error al actualizar el cliente") {
      const msg = "Hubo un error al actualizar el cliente";
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
    navigate("/clientes");
  };
  useEffect(() => {
    getClientesByID();
    //eslint-disable-next-line
  }, []);
  const irAClientes = () => {
    navigate("/clientes");
  };
  const getClientesByID = async () => {
    const response = await APIInvoke.invokeGET(`/api/clientes/${id}`, {});
    if (response.msg === "Hubo un error al buscar el cliente") {
      const msg = "Hubo un error al buscar el cliente, para actualizarlo";
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
      setApellidos(response.apellidos);
      setDocumento(response.documento);
      setCorreo(response.correo);
      setTelefono(response.telefono);
      setDireccion(response.direccion);
    }
  };

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidebarContainer></SidebarContainer>
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Modificar Cliente"}
          breadCrumb1={"Cliente"}
          breadCrumb2={"Modificar"}
          ruta1={"/clientes"}
        />
        <div
          className="container contenedor mx-auto"
          style={{ maxWidth: "800px" }}
        >
          <h3 className="text-center">Modificar Cliente</h3>
          <form onSubmit={guardarCliente}>
            <div className="row">
              <div className="col-md-6">
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
                  <label className="form-label">Apellidos</label>
                  <input
                    value={apellidos}
                    onChange={(e) => setApellidos(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Ingrese los apellidos"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Documento</label>
                  <input
                    value={documento}
                    onChange={(e) => setDocumento(e.target.value)}
                    type="number"
                    className="form-control"
                    placeholder="Ingrese el número de documento"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
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
              </div>
            </div>
            <div className="row mt-3 mb-3">
              <div className="col-md-12 text-center">
                <button
                  type="button"
                  onClick={irAClientes}
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
      <Footer></Footer>
    </div>
  );
};

export default ModificarCliente;
