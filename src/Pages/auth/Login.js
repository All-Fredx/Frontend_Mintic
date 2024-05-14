import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import APIInvoke from "../../val/APIInvoke.js";
import swal from "sweetalert";

const Login = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });
  const { email, password } = usuario;
  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    document.getElementById("email").focus();
  }, []);
  const IniciarSesion = async () => {
    if (password.length < 10) {
      const men = "La contrasea debe tener minimo 10 caracteres";
      swal({
        title: "Error",
        text: men,
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
      const data = {
        email: usuario.email,
        password: usuario.password,
      };
      const response = await APIInvoke.invokePOST("/api/auth", data);
      const mensaje = response.msg;

      if (mensaje === "El usuario no existe") {
        const msg = "El usuario ingresado no existe, verifique el usuario";
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
      } else if (mensaje === "Contraseña incorrecta") {
        const msg =
          "La contraseña es incorrecta, por favor, vuelva a intentarlo.";
        swal({
          title: "Error",
          text: msg,
          icon: "error",
          buttons: {
            confirm: {
              text: "OK",
              value: true,
              visible: true,
              className: "btn btn-danger",
              closeModal: true,
            },
          },
        });
      } else {
        swal({
          title: "Inicio de sesión exitoso",
          text: "¡Bienvenido!",
          icon: "success",
          button: false,
          timer: 1000,
        });
        const jwt = response.token;
        const mail = usuario.email;
        localStorage.setItem("token", jwt);
        localStorage.setItem('mail', mail);
        
        const GuardarIDUser = async () => {
          const response = await APIInvoke.invokeGET(`/api/usuarios/mail/${mail}`, {});
          console.log(response)
          localStorage.setItem('id', response._id);
        };
        GuardarIDUser();
        navigate("/home");
      }
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    IniciarSesion();
  };
  
  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <Link to={"#"} className="text-decoration-none">
            <b>Iniciar</b> Sesión
          </Link>
        </div>
        <div className="card">
          <div className="card login-card-body">
            <p className="login-box-msg">Bienvenido, puede loguearse</p>
            <form onSubmit={onSubmit}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="E-mail"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="social-auth-links text-center mb-3">
                <button type="submit" className="btn btn-block btn-primary">
                  Ingresar
                </button>
                <Link to={"/register"} className="btn btn-block btn-danger">
                  Crear Cuenta
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
