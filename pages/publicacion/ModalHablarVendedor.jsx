import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "../../components/button/Button"
import TextField from "@material-ui/core/TextField"
import { gql, useMutation } from '@apollo/client'
import { useContext, useEffect, useState } from 'react';
import styles from "../../public/css/modalIngresoInfo.module.scss"
import { PikContext } from "../../states/PikState";

const ModalHablarVendedor = ({ datosPublicacion, onChange, setIsModalHablarVendedor }) => {
  const context = useContext(PikContext)
  const listadoCiudades = ["Bogota", "Medellín", "Barranquilla", "Cali", "Bucaramanga", "Pasto", "Barrancabermeja", "Monteria", "Cartagena", "Santa Marta", "Manizales", "Cucuta", "Pereira", "Ibague", "Maicao", "Rioacha"]
  const [ciudad, setCiudad] = useState()
  const LOGIN_MUTATION = gql`
    mutation createTransaction($user: Int, $publication: Int){
        createTransaction(user: $user, publication: $publication)
    }`

  const [dispatchLogin, { }] = useMutation(LOGIN_MUTATION);

  useEffect(() => {
  }, [])

  const createTransaction = () => {
    // Mutation para registrar la pre orden    
    debugger
    dispatchLogin({ variables: { user: context.user.id, publication: datosPublicacion.id } });

    const user = localStorage.getItem("user")
    if (!user) {
      const mensaje = toastr;
      mensaje.options.onclick = () => Router.push("/login")
      mensaje.warning("Debes ingresar para poder comprar")
      return false
    }

    // const identificacion = JSON.parse(localStorage.getItem("user")).identificacion
    // const direccion = JSON.parse(localStorage.getItem("user")).direccion
  }

  const enviarWhatsapp = () => {
    const url = window.location
    const texto = `Hola mi *nombre* es xxx, estoy interesado en este producto ${url} para envío a ${ciudad}`
    window.open("https://api.whatsapp.com/send?phone=" + datosPublicacion.user_phone + "&text=" + texto)
  }

  const handlePagar = async () => {
    // if (!this.state.nombre_completo || !this.state.str_ciudad) return
    createTransaction()
    // enviarWhatsapp()
    return
    /*
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
    });*/
  }

  return <div className={styles._modalIngresoInfo}>
    <div className={styles.background}></div>
    <div className={`Card ${styles.Card}`}>
      <h2>Tus datos para la entrega y pago</h2>
      <TextField autoComplete="nombre" name="nombre_completo" fullWidth={true} onChange={onChange} label="Nombre" margin="normal" size={25} />

      <div className="contentCiudad">
        <Autocomplete name="str_ciudad" options={listadoCiudades} onInputChange={(event, str_ciudad) => { setCiudad({ str_ciudad }) }}
          getOptionLabel={(option) => option}
          style={{ width: "100%" }}
          renderInput={(params) => <TextField {...params} label="Ciudad en la que te encuentras" />} />
      </div>

      <div className={styles.actions}>
        <Button onClick={() => { setIsModalHablarVendedor() }} color="normal">Cancelar</Button>
        <Button onClick={handlePagar} color="blue">Pagar</Button>
      </div>
    </div>
  </div>
}

export default ModalHablarVendedor