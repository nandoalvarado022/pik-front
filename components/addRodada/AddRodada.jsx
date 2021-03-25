import date from 'date-and-time'
import Router from 'next/router'
import toastr from "toastr";
import React, { Component } from 'react'
import Layout from '../layout/Layout'
import Btn from '../btn/Btn'
import Card from '@material-ui/core/Card'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import Funciones from '../../lib/functions'
import { slugify } from "../../lib/utilidades";

const instanciaFunc = new Funciones

class AddRodada extends Component {
    state = {
        image: false,
        uploadingImage: false,
        btnCrear: "Crear",
        logueado: false
    }
    constructor(props) {
        super(props);
    }

    /*handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };*/

    onChange = async (e) => {
        const imagenes = await instanciaFunc.subirImagen({ tipoArchivo: "actividad" })
        this.setState({ uploadingImage: false, imagenes })
        /*
        return
        const files = Array.from(e.target.files)
        this.setState({ uploadingImage: true, image: "loading" })
        const formData = new FormData()
    
        files.forEach((file, i) => {
            formData.append(i, file)
        })
    
        fetch("/rodadas/crear/uploadImage", {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(res => {
            this.setState({ 
                image: res.url,
                uploadingImage: false
            })
        })*/
    }

    componentDidMount() {
        if (localStorage.getItem("user")) {
            this.setState({
                logueado: true
            })
        }
    }

    handleCrear = () => {
        if (!localStorage.getItem("user")) {
            const errorInicio = toastr;
            errorInicio.options.onclick = () => Router.push("/login")
            errorInicio.warning("Debes ingresar para poder crear preguntas")
            return false
        }

        this.setState({ btnCrear: "Cargando..." });
        const usuario = JSON.parse(localStorage.getItem("user"))
        const { id_usuario, club_short_name, pais = "", ciudad = "" } = usuario
        let { place, title, descripcion, fecha_rodada, imagenes } = this.state;        
        const now = new Date();
        const fecha = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        let short_name = slugify(title);
        let nuevoPlan = {
            pais,
            ciudad,
            fecha,
            place,
            title,
            descripcion,
            id_usuario,
            fecha_rodada,
            imagenes,
            avalible: false,
            creation_user_type: "user",
            short_name,
            chat: [],
            club: club_short_name ? club_short_name : null,
            likes: []
        }

        instanciaFunc.db.collection('actividades').add(nuevoPlan)
        .then(() => {
            toastr.success('Se ha creado el evento, en breve se verá reflejado');
            setTimeout(() => Router.push("/"), 1000)
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
        
    }

    render() {
        return (
            <Layout title="Crear rodada">
                <div id="_addRodada" className="h-100vh">
                    <div className="content">
                        <Card className="Card">
                            <TextField
                                fullWidth={true}
                                id="outlined-textarea"
                                label="Nombre de la rodada"
                                placeholder=""
                                multiline
                                name="nombre"
                                // value={this.state.nuevoPlan.nombre}
                                // className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                onChange={e => this.setState({ title: e.target.value })}
                            />

                            <TextField
                                fullWidth={true}
                                id="outlined-textarea"
                                label="Lugar de la rodada"
                                multiline
                                name="lugar"
                                margin="normal"
                                variant="outlined"
                                onChange={e => this.setState({ place: e.target.value })}
                            />

                            <TextField
                                fullWidth={true}
                                id="outlined-textarea"
                                label="Detalles de la rodada"
                                multiline
                                margin="normal"
                                variant="outlined"
                                onChange={e => this.setState({ descripcion: e.target.value })}
                            />

                            <TextField
                                id="date"
                                label="Fecha de salida"
                                type="date"
                                className="fechaSalida"
                                onChange={e => this.setState({ fecha_rodada: e.target.value + ":00:00:00" })}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                            {/* <Checkbox
                            checked={this.state.false}
                            onChange={this.handleChange}
                            value="private"
                            />
                            */}

                            {
                                !this.state.image && this.state.logueado && <div>
                                    <div id="progressUploadImage"></div>
                                    <input multiple style={{ margin: "10px 0" }} type='file' id='subir_imagen' onChange={this.onChange} />
                                </div>
                            }

                            {
                                this.state.uploadingImage && <div style={{ textAlign: "center" }}>Cargando...</div>
                            }

                            {
                                // this.state.image && <img className="imageRodada" src={this.state.image} />
                            }

                            <div className="actions">
                                <Btn
                                    onClick={this.handleCrear} className={"green small m-l-10" + (!this.state.logueado ? " disabled" : "")} text={this.state.btnCrear} />
                            </div>
                        </Card>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default AddRodada