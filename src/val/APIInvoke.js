import config from "../config.js";

class APIInvoke {
  async invokeGET(resource, queryParams) {
    queryParams = queryParams || [];
    if (!Array.isArray(queryParams)) {
      // Si no es un array, conviértelo en un array de pares clave-valor
      queryParams = Object.entries(queryParams);
    }
    const queryString = queryParams.reduce(
      (last, q, i) => last + `${i === 0 ? "?" : "&"}${q}`,
      ""
    );

    const token = localStorage.getItem("token");
    let bearer;
    if (token === "") {
      bearer = "";
    } else {
      bearer = `${token}`;
    }

    const data = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": bearer,
      },
    };
    const url = `${config.api.URL}${resource}${queryString}`;
    let response = await (await fetch(url, data)).json();
    return response;
  }

  async invokePUT(resource, body) {
    const token = localStorage.getItem("token");
    let bearer;
    if (token === "") {
      bearer = "";
    } else {
      bearer = `${token}`;
    }

    const data = {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": bearer,
      },
    };
    const url = `${config.api.URL}${resource}`;
    let response = await (await fetch(url, data)).json();
    return response;
  }

  async invokePOST(resource, body) {
    const token = localStorage.getItem("token");
    let bearer;
    if (token === "") {
      bearer = "";
    } else {
      bearer = `${token}`;
    }

    const data = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": bearer,
      },
    };
    const url = `${config.api.URL}${resource}`;
    let response = await (await fetch(url, data)).json();
    return response;
  }

  async invokeDELETE(resource) {
    const token = localStorage.getItem("token");
    let bearer;
    if (token === "") {
      bearer = "";
    } else {
      bearer = `${token}`;
    }

    const data = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": bearer,
      },
    };
    const url = `${config.api.URL}${resource}`;
    let response = await (await fetch(url, data)).json();
    return response;
  }
}
// eslint-disable-next-line
export default new APIInvoke();
