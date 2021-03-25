import Autocomplete from "@material-ui/lab/Autocomplete";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Router from "next/router";
import date from "date-and-time";
import toastr from "toastr";
import Btn from "../../components/btn/Btn";
import TextField from "@material-ui/core/TextField";
import CardDetalleProducto from "../../components/card/CardDetalleProducto";
import React from "react";
import Layout from "../../components/layout/Layout";
import PuedeInteresarte from "../../components/puedeInteresarte/PuedeInteresarte";
import { getFeed, transformarFeed } from "../../lib/functions";

export default class PublicacionPage extends React.Component {
  static async getInitialProps({ req, query }) {
    let slug = query.id;
    let partner = null;
    if (req) {
      partner = req.headers.host.split(".")[0];
    } else {
      partner = window.location.host.split(".")[0];
    }
    const is_partner = ["juanchofenix"].includes(partner);
    let feed = await getFeed(is_partner ? partner : null);
    const datosPublicacion = feed.find((x) => x.slug == slug);
    return { datosPublicacion, feed, is_partner, partner: is_partner ? partner : false };
  }

  state = {
    modalIngresoCedula: false,
    labelPagar: "Hablar con el vendedor",
    cuponDigitado: "",
  };

  onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  enviarWhatsapp() {
    const url = window.location;
    const texto = `Hola mi *nombre* es ${this.state.nombre_completo}, estoy interesado en este producto ${url} para enviarlo a la *dirección* ${this.state.direccion} en la *ciudad* de ${this.state.str_ciudad} *observaciones* ${this.state.observaciones}`;
    window.open(
      "https://api.whatsapp.com/send?phone=" +
      this.props.datosPublicacion.seller_phone +
      "&text=" +
      texto
    );
    this.setState({ modalIngresoCedula: false });
  }

  handleComprar = () => {
    /*const user = localStorage.getItem("user")
    if (!user) {
      const mensaje = toastr;
      mensaje.options.onclick = () => Router.push("/login")
      mensaje.warning("Debes ingresar para poder comprar")
      return false
    }*/

    // const identificacion = JSON.parse(localStorage.getItem("user")).identificacion
    // const direccion = JSON.parse(localStorage.getItem("user")).direccion
    this.setState({
      // identificacion,
      // direccion,
      modalIngresoCedula: true,
    });
  };

  handleCupon = () => {
    this.setState({ logIngresarCupon: true });
  };

  handleValidarCupon = async () => {
    const cuponDigitado = this.state.cuponDigitado;
    const id_publicacion = this.props.datosPublicacion.id;
    const res = await instanciaFunc.validarCupon({
      id_publicacion,
      cuponDigitado,
    });
    if (!res.estado) {
      toastr.warning("No se pudo validar el cupón 😕");
      this.setState({ logIngresarCupon: false, cuponDigitado: "" });
    } else {
      const valorCupon = res.valor;
      toastr.info("Para tí el precio más bajo 😋");
      const nuevoPrecio = this.props.datosPublicacion.precio - valorCupon;
      this.setState({
        logIngresarCupon: false,
        nuevoPrecio,
        precio: nuevoPrecio,
      });
    }
  };

  mostrarAlerta(mensaje) {
    toastr.warning(mensaje);
    return false;
  }

  handleResponder = async () => {
    const data = {
      comentario: {
        descripcion: document.getElementById("comentarPublicacion").value,
        id_usuario: JSON.parse(localStorage.getItem("user")).email,
      },
      id_publicacion: this.props.datosPublicacion.id,
    };
    const res = await instanciaFunc.saveRespuesta(data);
    return;
  };

  validarAntesPagar() {
    let result = true;
    if (!this.state.talla && this.state.tallas)
      result = this.mostrarAlerta("Debes seleccionar una talla");
    if (!this.state.identificacion)
      result = this.mostrarAlerta("Debe ingresar su número de identificación");
    if (!this.state.direccion)
      result = this.mostrarAlerta("Debe ingresar su dirección");
    if (!this.state.ciudad || !this.state.pais)
      result = this.mostrarAlerta("Debe configurar su ubicación");
    return result;
  }

  handlePagar = async () => {
    this.enviarWhatsapp();
    return;

    const validaciones = this.validarAntesPagar();
    if (!validaciones) return false;
    this.setState({
      labelPagar: "Cargando...",
    });

    // Validando si hay cupon y validando para cangear el cupon
    if (this.state.cuponDigitado) {
      const cuponDigitado = this.state.cuponDigitado;
      const id_publicacion = this.props.datosPublicacion.id;
      const res = await instanciaFunc.canjearCupon({
        id_publicacion,
        cuponDigitado,
      });
      debugger;
      if (!res.encontroCupon) {
        toastr.warning("Lo siento, el cupón ya se utilizo");
        this.setState({
          cuponDigitado: "",
          precio: this.props.datosPublicacion.precio,
          nuevoPrecio: null,
          labelPagar: "Pagar",
        });
        return false;
      }
    }

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

    const resCompra = await instanciaFunc.saveCompra(compra);
    // Pasarela de pagos
    const handler = ePayco.checkout.configure({
      key: "b5bb21e660ef8dd79d82af917fd5ff89",
      test: false,
    });

    const descripcion = `Usuario ${name_usuario} ${id_usuario} ${identificacion} ${email_usuario} compra ${short_name} talla ${this.state.talla} ${textoCuponPago} en la fecha ${fecha}`;

    handler.open({
      //Parametros compra (obligatorio)
      name: descripcion.substr(0, 15),
      description: descripcion,
      currency: "cop",
      amount: precio,
      tax_base: "0",
      invoice: id_compra,
      tax: "0",
      country: "co",
      lang: "es",
      external: "true",
      response: "https://club2ruedas.com/gracias-por-tu-compra",
    });
  };

  handleLike = async (params = {}) => {
    const elemento = params.event.currentTarget;
    const obj = {
      docID: elemento.getAttribute("doc_id"),
      tipo_coleccion: elemento.getAttribute("tipo_coleccion"),
      elemento,
    };
    const result = await instanciaFunc.handleLike(obj);
    if (!result) return;
  };

  configUbicacion() {
    localStorage.setItem("url_pendiente", window.location.pathname);
    Router.push("/ubicacion");
  }

  componentDidMount() {
    if (localStorage.getItem("user")) {
      const { pais, ciudad } = JSON.parse(localStorage.getItem("user"));
      this.setState({
        pais,
        ciudad,
      });
    }
  }

  render() {
    if (!this.props.datosPublicacion) return <></>
    const description = this.props.datosPublicacion?.description
      ? this.props.datosPublicacion.description
      : "";
    const title = this.props.datosPublicacion?.title;
    const meta_url = this.props.datosPublicacion?.slug;
    const { pais, ciudad } = this.state;
    const listadoCiudades = [
      "Bogota",
      "Medellín",
      "Barranquilla",
      "Cali",
      "Bucaramanga",
      "Pasto",
      "Barrancabermeja",
      "Monteria",
      "Cartagena",
      "Santa Marta",
      "Manizales",
      "Cucuta",
      "Pereira",
      "Ibague",
      "Maicao",
      "Rioacha",
    ];

    return (
      <Layout
        {...this.props}
        meta_image={this.props.datosPublicacion.image_link}
        meta_title={title}
        title={title}
        descripcion={description}
        meta_url={meta_url}
      >
        <div className="_publicacion">
          <CardDetalleProducto
            feed={this.props.feed}
            meta_url={meta_url}
            handleResponder={this.handleResponder}
            nuevoPrecio={this.state.nuevoPrecio}
            handleCupon={this.handleCupon}
            handleComprar={this.handleComprar}
            doc_id={this.props.datosPublicacion.id}
            handleLike={this.handleLike}
            logDetalle={true}
            {...this.props.datosPublicacion}
          />
          {
            // Modal para confirmar cédula y dirección
            this.state.modalIngresoCedula && (
              <div className="_modalIngresoInfo">
                <div className="background"></div>
                <div className="Card">
                  {this.state.tallas && (
                    <>
                      <InputLabel id="label-talla">
                        Selecciona tú talla
                      </InputLabel>
                      <Select
                        labelId="label-talla"
                        placeholder="Seleccionar talla"
                        value={this.state.talla}
                        onChange={(e) =>
                          this.setState({ talla: e.target.value })
                        }
                      >
                        {this.state.tallas.map((talla, ind) => {
                          return (
                            <MenuItem value={String(talla).toLocaleLowerCase()}>
                              {talla}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </>
                  )}

                  <h2>Tus datos para la entrega y pago</h2>
                  <TextField
                    autoComplete="nombre"
                    name="nombre_completo"
                    fullWidth={true}
                    onChange={this.onChange}
                    label="Nombre completo"
                    margin="normal"
                    size={25}
                  />

                  <div className="contentCiudad">
                    <Autocomplete
                      name="str_ciudad"
                      options={listadoCiudades}
                      onInputChange={(event, str_ciudad) => {
                        this.setState({ str_ciudad });
                      }}
                      getOptionLabel={(option) => option}
                      style={{ width: "100%" }}
                      renderInput={(params) => {
                        return (
                          <TextField {...params} label="Seleccionar ciudad" />
                        );
                      }}
                    />
                  </div>

                  <TextField
                    value={this.state.direccion}
                    autoComplete="direccion"
                    name="direccion"
                    fullWidth={true}
                    onChange={this.onChange}
                    label="Dirección de entrega"
                    margin="normal"
                    size={25}
                  />

                  <TextField
                    value={this.state.observaciones}
                    name="observaciones"
                    fullWidth={true}
                    onChange={this.onChange}
                    label="Observaciones adicionales"
                    margin="normal"
                    size={25}
                  />

                  <div className="actions">
                    <Btn
                      onClick={() =>
                        this.setState({ modalIngresoCedula: false })
                      }
                      className="yellow small m-l-10"
                      text="Cancelar"
                    />
                    <Btn
                      onClick={this.handlePagar}
                      className="green small m-l-10"
                      text={this.state.labelPagar}
                    />
                  </div>
                </div>
              </div>
            )
          }

          {
            // Modal para ingresar cupón
            this.state.logIngresarCupon && (
              <div className="_modalIngresoInfo">
                <div className="background"></div>
                <div className="Card">
                  <TextField
                    value={this.state.cuponDigitado}
                    name="cuponDigitado"
                    fullWidth={true}
                    onChange={this.onChange}
                    label="Cupón"
                    margin="normal"
                    size={25}
                  />

                  <div className="actions">
                    <Btn
                      onClick={() => this.setState({ logIngresarCupon: false })}
                      className="yellow small m-l-10"
                      text="Cancelar"
                    />
                    <Btn
                      onClick={this.handleValidarCupon}
                      className="green small m-l-10"
                      text="Validar cupón"
                    />
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </Layout>
    );
  }
}