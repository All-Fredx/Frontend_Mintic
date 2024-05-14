import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentHeader from "../../Componentes/ContentHeader.js";
import Footer from "../../Componentes/Footer.js";
import Navbar from "../../Componentes/Navbar.js";
import SidebarContainer from "../../Componentes/SidebarContainer.js";
import APIInvoke from "../../val/APIInvoke.js";
import swal from "sweetalert";

const MostrarProveedor = () => {
  const [proveedores, setProveedor] = useState([]);

  const getProveedores = async () => {
    const response = await APIInvoke.invokeGET("/api/proveedores/");
    setProveedor(response.proveedores);
  };

  useEffect(() => {
    getProveedores();
  }, []);

  const eliminarProveedor = async (e, id) => {
    e.preventDefault();
    const response = await APIInvoke.invokeDELETE(`/api/proveedores/${id}`);
    if (response.msg === "El proveedor ha sido eliminado") {
      const msg = "El proveedor ha sido eliminado correctamente";
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
    } else if (response.msg === "Hubo un error al eliminar el proveedor") {
      const msg = "Hubo un error al eliminar el proveedor";
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
    getProveedores();
    //eslint-disable-next-line
  };

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidebarContainer></SidebarContainer>
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Proveedores"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"Proveedores"}
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
                          Razon Social
                        </th>
                        <th className="border" scope="col">
                          NIT
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
                      {proveedores.map((proveedor, index) => (
                        <tr key={index}>
                          <td className="table-dark ">
                            {proveedor.razonSocial}
                          </td>
                          <td className="table-dark ">{proveedor.NIT}</td>
                          <td className="table-dark ">{proveedor.correo}</td>
                          <td className="table-dark ">{proveedor.telefono}</td>
                          <td className="table-dark ">{proveedor.direccion}</td>
                          <td className="table-dark bg-transparent border-0">
                            <Link
                              to={`editar/${proveedor._id}`}
                              className="btn btn-success mb-1 ms-2 me-2"
                            >
                              <i className="fa-solid fa-file-pen"></i>
                            </Link>
                            <button
                              onClick={(e) =>
                                eliminarProveedor(e, proveedor._id)
                              }
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

export default MostrarProveedor;
