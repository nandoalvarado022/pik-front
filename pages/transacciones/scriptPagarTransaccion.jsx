const pagar = ({ idTransaccion }) => {
  // const validaciones = this.validarAntesPagar();
  // if (!validaciones) return false;
  // this.setState({
  //   labelPagar: "Cargando...",
  // });

  // Validando si hay cupon y validando para cangear el cupon
  // if (this.state.cuponDigitado) {
  //   const cuponDigitado = this.state.cuponDigitado;
  //   const id_publicacion = this.props.datosPublicacion.id;
  //   const res = await instanciaFunc.canjearCupon({
  //     id_publicacion,
  //     cuponDigitado,
  //   });
  //   debugger;
  //   if (!res.encontroCupon) {
  //     toastr.warning("Lo siento, el cupón ya se utilizo");
  //     this.setState({
  //       cuponDigitado: "",
  //       precio: this.props.datosPublicacion.precio,
  //       nuevoPrecio: null,
  //       labelPagar: "Pagar",
  //     });
  //     return false;
  //   }
  // }
  /*
  const { identificacion, direccion, talla = null } = this.state;
  const id_usuario = JSON.parse(localStorage.getItem("user")).id_usuario;
  const email_usuario = JSON.parse(localStorage.getItem("user")).email;
  const name_usuario = JSON.parse(localStorage.getItem("user")).name;
  const data = {
    identificacion,
    direccion,
    id_usuario,
  };
  await instanciaFunc.savePerfil(data); // Guardando identificacion y dirección
  const now = new Date();
  const fecha = date.format(now, "YYYY-MM-DD HH:mm:ss");
  const resultNumCompra = await instanciaFunc.getVariable_global({
    clave: "numero_compras",
  });
  const id_compra = resultNumCompra.docs[0].data().valor + 1;
  const short_name = this.props.datosPublicacion.short_name;
  const { precio } = this.state;
  const textoCuponPago = this.state.cuponDigitado
    ? ` cupón ${this.state.cuponDigitado}`
    : "";
  const compra = {
    talla,
    id_usuario,
    email_usuario,
    identificacion,
    direccion,
    short_publicacion: short_name,
    fecha,
    id_compra,
    precio,
    textoCuponPago,
  };

  const resCompra = await instanciaFunc.saveCompra(compra);*/
  // Pasarela de pagos
  const handler = ePayco.checkout.configure({
    key: "b5bb21e660ef8dd79d82af917fd5ff89",
    test: true,
  });

  /*const descripcion = `Usuario ${name_usuario} ${id_usuario} ${identificacion} ${email_usuario} compra ${short_name} talla ${this.state.talla} ${textoCuponPago} en la fecha ${fecha}`;*/

  handler.open({
    //Parametros compra (obligatorio)
    name: "nombre",
    description: "descripcion",
    currency: "cop",
    amount: "2000",
    tax_base: "0",
    invoice: 1234,
    tax: "0",
    country: "co",
    lang: "es",
    external: "true",
    response: "http://localhost/gracias-por-tu-compra",
  });
}

export default pagar