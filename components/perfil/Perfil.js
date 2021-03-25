import ParteSuperior from './ParteSuperior'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import toastr from "toastr"
import date from 'date-and-time'
import 'date-and-time/locale/es'
import Ayuda from "../ayuda/Ayuda"
import Link from 'next/link'
import Router from 'next/router'
import Card from "@material-ui/core/Card"
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Btn from "../btn/Btn"
import Medallas from "../medallas/Medallas"
import Funciones from '../../lib/functions'
import { slugify } from '../../lib/utilidades'

date.locale('es');

const instanciaFunc = new Funciones

export default class Perfil extends React.Component {
    stepsAyuda = [<div>
        ✅ Termina de completar tu perfil para recomendarte consejos apropiados a tu tipo de moto
        </div>
        // <div>
        //     <div className="emoji">🎁</div>   
        //     Las <b>Medallas</b> son logros conseguidos a lo largo de tu formación como motero en Club2ruedas, te iré premiando si consigues ayudar a otros por medio de respuestas a preguntas o conquistando lugares de tu ciudad y pais.</div>,
        // <div>
        //     <div className="emoji">🏍🛵</div>   
        //     <b>Mi moto</b> esta parte es muy importante, de acuerdo a la marca y referencia que coloques aquí te daré consejos sobre el cuidado de tu moto y recomendaciones de productos que otros moteros ya han testeado con sus motos.
        // </div>,
        // <div>
        //     <div className="emoji">🔧</div>   
        //     En las <b>revisiones</b> puedes colocar cada revisión que le hagas a tu moto, y así llevar un control de estas, puedes agregar soporte como facturas y calificar el taller donde hiciste la revisión (esto te dará puntos 💙).
        // </div>
    ]

    state = {
        name: "",
        marca_modelo: "",
        nickname: "",
        descripcion: "",
        kilometraje: "",
        ciudad: "",
        pais: ""
    }

    componentDidMount() {
        if (localStorage.getItem("user")) {
            this.setState({
                name: JSON.parse(localStorage.getItem("user")).name,
                nickname: JSON.parse(localStorage.getItem("user")).nickname,
                marca_modelo: JSON.parse(localStorage.getItem("user")).marca_modelo,
                tipoVehiculo: JSON.parse(localStorage.getItem("user")).vehiculo,
                revisiones: JSON.parse(localStorage.getItem("revisiones")),
                picture: JSON.parse(localStorage.getItem("user")).picture,
                alias: JSON.parse(localStorage.getItem("user")).alias,
                ciudad: JSON.parse(localStorage.getItem("user")).ciudad,
                kilometraje: JSON.parse(localStorage.getItem("user")).kilometraje,
                club: {
                    short_name: JSON.parse(localStorage.getItem("user")).club_short_name,
                }
            })
        } else{
            Router.push("/login")
        }
    }

    savePerfil = () => {
        const data = {
            ...JSON.parse(localStorage.getItem("user")),
            marca_modelo: this.state.marca_modelo ? this.state.marca_modelo : "",
            name: this.state.name ? this.state.name : "",
            picture: this.state.picture,
            nickname: this.state.nickname ? slugify(this.state.nickname.toLowerCase()) : "",
            descripcion: this.state.v ? this.state.descripcion : "",
            alias: this.state.v ? this.state.alias : "",
        }
        instanciaFunc.savePerfil(data).then((result) => {
            if(typeof result == "string") toastr.warning(result)
            else{
                toastr.success('Datos actualizados, en breve verás tus cambios reflejados');
            }
        })
    }

    onChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    onChangeImage = async () => {
        const nombreArchivo = await instanciaFunc.subirImagen({ tipoArchivo: "perfil" })
        this.setState({ uploadingImage: false, picture: nombreArchivo })
        this.savePerfil()
    }

    logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("revisiones");
        Router.push({ pathname: '/login', query: {} })
    }

    render() {
        // return <div></div>
        const estilosMoto = this.state.tipoVehiculo ? instanciaFunc.getVehiculos(this.state.tipoVehiculo).styles : {}
        return (<div className="_perfil">
                <ParteSuperior info_usuario={this.state} />
                <input type='file' id='subir_imagen' onChange={this.onChangeImage} />
                <Link href="/perfil/[id]" as={`/perfil/${this.state.nickname}`}>
                    <a className="como_visitante color-azul">
                        Ver perfil como visitante
                    </a>
                </Link>
                
                <div className="contenidoInferior">
                    <Card className="Card cardTitle">
                        <h2>Quien soy</h2>
                        <Link href="/ubicacion">
                            <a className="color-azul href_cambiar_ciudad">
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                                &nbsp;Cambiar ubicación
                            </a>
                        </Link>
                        <TextField value={this.state.name} autoComplete="name" name="name" fullWidth={true} onChange={this.onChange} label="Nombre para mostrar" margin="normal" size={25} />
                        <TextField value={this.state.nickname} name="nickname" fullWidth={true} onChange={this.onChange} label="Tu alias" margin="normal" size={25} />
                        <TextField multiline value={this.state.descripcion} autoComplete="descripcion" name="descripcion" fullWidth={true} onChange={this.onChange} label="Carta de presentación" margin="normal" size={25} />
                        <TextField
                            margin="normal"
                            value={this.state.marca_modelo}
                            name="marca_modelo"
                            onChange={this.onChange}
                            fullWidth={true} label="Marca y modelo de tu moto" />
                        <div className="actions">
                            <Btn
                                target={null}
                                className="green small"
                                text="Guardar"
                                onClick={this.savePerfil}
                            />
                        </div>
                    </Card>

                    <Card className="Card medallas cardTitle">
                        <h2>Medallas</h2>
                        <p>Pronto veras tus medallas aquí</p>
                        {/* <Medallas /> */}
                    </Card>

                    <Card className="Card miMoto cardTitle" id="revisiones">
                        <h2>Revisiones</h2>
                        {
                            this.state.revisiones && this.state.revisiones.length < 1 && <p>No tienes ninguna revisión hasta ahora</p>
                        }

                        {
                            this.state.revisiones && this.state.revisiones.map((revision, ind) => {
                                return <div className="revision" key={ind}>
                                    <b>{date.format(new Date(revision.fecha), 'ddd MMM DD YYYY')}<br />
                                        Lugar: {revision.lugar}<br />
                                        Kilometraje: {revision.kilometraje}</b><br />
                                    {revision.detalles}<br />
                                    {
                                        revision.adjunto && <React.Fragment>
                                            Archivo adjunto: <a target="_BLANK" href={revision.adjunto}>Descargar</a>
                                        </React.Fragment>
                                    }
                                </div>
                            })
                        }
                    </Card>
                </div>

                <div style={{ textAlign: "center" }}>
                    <Btn
                        onClick={this.logout}
                        target={null}
                        className="blue"
                        text="Salir de mi cuenta"
                    />
                </div>
                <Ayuda nombreAyuda="perfil" background={true} steps={this.stepsAyuda}></Ayuda>            
            </div>
        )
    }
}