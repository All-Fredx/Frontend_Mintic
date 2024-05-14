//import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentHeader from "../../Componentes/ContentHeader.js";
import Footer from "../../Componentes/Footer.js";
import Navbar from "../../Componentes/Navbar.js";
import SidebarContainer from "../../Componentes/SidebarContainer.js";
import APIInvoke from "../../val/APIInvoke.js";
import swal from "sweetalert";

const MostrarCliente = () => {
  const [clientes, setCliente] = useState([]);

  const getClientes = async () => {
    const response = await APIInvoke.invokeGET("/api/clientes/");
    setCliente(response.clientes);
  };

  useEffect(() => {
    getClientes();
  }, []);

  const eliminarCliente = async (e, id) => {
    e.preventDefault();
    const response = await APIInvoke.invokeDELETE(`/api/clientes/${id}`);
    if (response.msg === "El cliente ha sido eliminado") {
      const msg = "El cliente ha sido eliminado correctamente";
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
    } else if (response.msg === "Hubo un error al eliminar el cliente") {
      const msg = "Hubo un error al eliminar el cliente";
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
    getClientes();
    //eslint-disable-next-line
  };

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidebarContainer></SidebarContainer>
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Clientes"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"Clientes"}
          ruta1={"/home"}
        />
        <div>
          <div className="container">
            <div className="row text-center border">
              <div className="col">
                <Link to="agregar" className="btn btn-primary mt-2 mb-2">
                  <i className="fa-solid fa-file-circle-plus"></i>
                </Link>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="border" scope="col">
                          Nombres
                        </th>
                        <th className="border" scope="col">
                          Apellidos
                        </th>
                        <th className="border" scope="col">
                          Documento
                        </th>
                        <th className="border" scope="col">
                          Correo
                        </th>
                        <th className="border" scope="col">
                          Telefono
                        </th>
                        <th className="border" scope="col">
                          Direccion
                        </th>
                      </tr>
                    </thead>
                    <tbody className="tbody-dark text-light">
                      {clientes.map((cliente, index) => (
                        <tr key={index}>
                          <td className="table-dark ">{cliente.nombres}</td>
                          <td className="table-dark ">{cliente.apellidos}</td>
                          <td className="table-dark ">{cliente.documento}</td>
                          <td className="table-dark ">{cliente.correo}</td>
                          <td className="table-dark ">{cliente.telefono}</td>
                          <td className="table-dark ">{cliente.direccion}</td>
                          <td className="table-dark bg-transparent border-0">
                            <Link
                              to={`editar/${cliente._id}`}
                              className="btn btn-success mb-1 ms-2 me-2"
                            >
                              <i className="fa-solid fa-file-pen"></i>
                            </Link>
                            <button
                              onClick={(e) => eliminarCliente(e, cliente._id)}
                              className="btn btn-danger"
                            >
                              <i className="fa-solid fa-trash-can"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MostrarCliente;
