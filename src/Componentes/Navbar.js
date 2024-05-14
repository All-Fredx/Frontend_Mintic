import React from "react";
import { Link, useNavigate } from "react-router-dom";
//import APIInvoke from "../val/APIInvoke.js";
import swal from "sweetalert";

const Navbar = () => {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    swal({
      title: "Cierre de sesión exitoso",
      text: "¡Hasta Pronto!",
      icon: "success",
      button: false,
      timer: 2000,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("mail");
    localStorage.removeItem("id");
    navigate("/");
  };

  return (
    <nav className="main-header navbar navbar-expand navbar-dark">
      <ul className="navbar-nav ">
        <li className="nav-item">
          <Link
            to={"#"}
            className="nav-link"
            data-widget="pushmenu"
            role="button"
          >
            <i className="fas fa-bars text-light" />
          </Link>
        </li>
        <li className="nav-item">
          <Link to={`/usuario`} className="nav-link">
            <i className="fa-solid fa-user-pen"></i>
          </Link>
        </li>
        <li className="nav-item">
          <strong
            onClick={cerrarSesion}
            className="nav-link text-light"
            style={{ cursor: "pointer" }}
          >
            <i className="fa-solid fa-arrow-right-from-bracket" style={{color: '#c70000'}}/>
          </strong>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto ">
        <li className="nav-item">
          <Link
            to={"#"}
            className="nav-link"
            data-widget="fullscreen"
            role="button"
          >
            <i className="fas fa-expand-arrows-alt text-light" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
