import date from 'date-and-time'
import Link from 'next/link'
import toastr from "toastr"
import React, { Component } from 'react'
import Layout from '../layout/Layout'
import Btn from "../btn/Btn"
import Card from "@material-ui/core/Card"
import TextField from '@material-ui/core/TextField'
import Funciones from '../../lib/functions'
import Router from 'next/router'
import { slugify } from '../../lib/utilidades'

const instanciaFunc = new Funciones

class CrearPregunta extends Component {
    state = {
        id_usuario: null,
        image: false,
        uploadingImage: false,
        btnCrear: "Crear",
        logueado: false
    }
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (localStorage.getItem("user")) {
            this.setState({
                id_usuario: JSON.parse(localStorage.getItem("user")).email,
                logueado: true
            })
        }
    }

    handleCrear = async () => {
        if (!localStorage.getItem("user")) {
            const errorInicio = toastr;
            errorInicio.options.onclick = () => Router.push("/login")
            errorInicio.warning("Debes ingresar para poder crear preguntas")
            return false
        }

        this.setState({ btnCrear: "Cargando..." });
        const now = new Date();
        const fecha = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        const id_usuario = JSON.parse(localStorage.getItem("user")).id_usuario;
        const short_name = slugify(this.state.descripcion, 30)
        const data = await instanciaFunc.savePregunta({ likes: [], id_usuario, descripcion: this.state.descripcion, fecha, short_name })
        toastr.success('Se ha creado tu pregunta, en breve verá reflejada')
        setTimeout(() => Router.push("/"), 1000)
    }

    render() {
        return (<Layout title="Crear pregunta">
            <div id="_addRodada" className="h-100vh">
                <div className="content">
                    <Card className="Card">
                        <TextField
                            fullWidth={true}
                            id="outlined-textarea"
                            label="Escribe aquí tu pregunta"
                            placeholder=""
                            multiline
                            name="descripcion"
                            margin="normal"
                            variant="outlined"
                            onChange={e => this.setState({ descripcion: e.target.value })}
                        />
                        <div className="actions">
                            <Btn onClick={this.handleCrear}
                                className={"green small m-l-10 " + (!this.state.logueado ? " disabled" : "")} text={this.state.btnCrear} />
                        </div>
                    </Card>
                </div>
            </div>
        </Layout>
        )
    }
}

export default CrearPregunta;