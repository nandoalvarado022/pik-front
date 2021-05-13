import Autocomplete from "@material-ui/lab/Autocomplete";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Router from "next/router";
import date from "date-and-time";
import toastr from "toastr";
import Button from "../../components/button/Button"
import TextField from "@material-ui/core/TextField"
import CardDetalleProducto from "../../components/card/CardDetalleProducto"
import React from "react"
import Layout from "../../components/layout/Layout"
// import PuedeInteresarte from "../../components/puedeInteresarte/PuedeInteresarte"
import { getFeed, transformarFeed } from "../../lib/utils"
import styles from "../../public/css/modalIngresoInfo.module.scss"

export default class PublicacionPage extends React.Component {
  static async getInitialProps({ req, query }) {
    let slug = query.id
    let datosPublicacion = await getFeed({ slug })
    return { datosPublicacion: datosPublicacion[0] }
  }

  state = {
    modalIngresoCedula: false,
    labelPagar: "Hablar con el vendedor",
    cuponDigitado: "",
    loadingProductPage: false
  };

  onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  enviarWhatsapp() {
    debugger
    const url = window.location
    const texto = `Hola mi *nombre* es ${this.state.nombre_completo}, estoy interesado en este producto ${url} para envío a ${this.state.str_ciudad}`
    window.open("https://api.whatsapp.com/send?phone=" + this.props.datosPublicacion.user_phone + "&text=" + texto)
    this.setState({ modalIngresoCedula: false })
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
  }

  handleCupon = () => {
    this.setState({ logIngresarCupon: true });
  }

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
  }

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
  }

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
    // if (!this.state.nombre_completo || !this.state.str_ciudad) return
    this.enviarWhatsapp();
    return

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
  }

  handleLike = async (params = {}) => {
    const elemento = params.event.currentTarget;
    const obj = {
      docID: elemento.getAttribute("doc_id"),
      tipo_coleccion: elemento.getAttribute("tipo_coleccion"),
      elemento,
    };
    const result = await instanciaFunc.handleLike(obj);
    if (!result) return;
  }

  configUbicacion() {
    localStorage.setItem("url_pendiente", window.location.pathname);
    Router.push("/ubicacion");
  }

  componentDidMount() {
    /*if (localStorage.getItem("user")) {
      const { pais, ciudad } = JSON.parse(localStorage.getItem("user"));
      this.setState({
        pais,
        ciudad,
      });
    }*/
    // if (this.props.datosPublicacion.length == 0) Router.push("/404")
    setTimeout(() => {
      this.setState({ loadingProductPage: true })
    }, 10000)
  }

  render() {
    const datosPublicacion = this.props?.datosPublicacion
    if (!datosPublicacion) return <div>Not found</div>

    const { description, title, slug } = datosPublicacion
    const { pais, ciudad } = this.state
    const listadoCiudades = ["Bogota", "Medellín", "Barranquilla", "Cali", "Bucaramanga", "Pasto", "Barrancabermeja", "Monteria", "Cartagena", "Santa Marta", "Manizales", "Cucuta", "Pereira", "Ibague", "Maicao", "Rioacha"];

    return <Layout meta_image={datosPublicacion} meta_title={title} title={title} descripcion={description} meta_url={slug}>
      <div className="_publicacion">
        <CardDetalleProducto meta_url={slug} handleResponder={this.handleResponder} nuevoPrecio={this.state.nuevoPrecio} handleCupon={this.handleCupon} handleComprar={this.handleComprar} doc_id={datosPublicacion} handleLike={this.handleLike} logDetalle={true} {...datosPublicacion} />
        {
          // Modal para confirmar cédula y dirección
          this.state.modalIngresoCedula && (
            <div className={styles._modalIngresoInfo}>
              <div className={styles.background}></div>
              <div className={`Card ${styles.Card}`}>
                <h2>Tus datos para la entrega y pago</h2>
                <TextField autoComplete="nombre" name="nombre_completo" fullWidth={true} onChange={this.onChange} label="Nombre" margin="normal" size={25} />

                <div className="contentCiudad">
                  <Autocomplete name="str_ciudad" options={listadoCiudades} onInputChange={(event, str_ciudad) => {
                    this.setState({ str_ciudad });
                  }}
                    getOptionLabel={(option) => option}
                    style={{ width: "100%" }}
                    renderInput={(params) => <TextField {...params} label="Ciudad en la que te encuentras" />} />
                </div>

                <div className={styles.actions}>
                  <Button onClick={() => this.setState({ modalIngresoCedula: false })} color="normal">Cancelar</Button>
                  <Button onClick={this.handlePagar} color="blue">{this.state.labelPagar}</Button>
                </div>
              </div>
            </div>
          )
        }
        {
          // Modal para ingresar cupón
          // this.state.logIngresarCupon && (
          //   <div className="_modalIngresoInfo">
          //     <div className="background"></div>
          //     <div className="Card">
          //       <TextField
          //         value={this.state.cuponDigitado}
          //         name="cuponDigitado"
          //         fullWidth={true}
          //         onChange={this.onChange}
          //         label="Cupón"
          //         margin="normal"
          //         size={25}
          //       />

          //       <div className="actions">
          //         <Button onClick={() => this.setState({ logIngresarCupon: false })} className="yellow small m-l-10" text="Cancelar" />
          //         <Button onClick={this.handleValidarCupon} className="green small m-l-10" text="Validar cupón" />
          //       </div>
          //     </div>
          //   </div>
          // )
        }
      </div>
    </Layout>
  }
}