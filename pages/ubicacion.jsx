import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import Router from 'next/router'
import Btn from "../components/btn/Btn"
import Card from "@material-ui/core/Card"
import Layout from "../components/layout/Layout"
import Funciones from "../lib/functions"
import { getCiudades, getPaises } from "../lib/utilidades";

const InstanciaFunc = new Funciones

class SeleccionarCiudad extends React.Component {
    static async getInitialProps(context) {
        const ciudades = await getCiudades()
        const paises = await getPaises()
        return {
            ciudades,
            paises
        }
    }

    state = {
        pais_seleccionado: null
    }
    
    stepsAyuda = [<div>
        ✅ Termina de completar tu perfil para recomendarte consejos apropiados a tu tipo de moto
        </div>
    ]

    ciudades = this.props.ciudades
    paises = this.props.paises
    
    componentDidMount() {
        window.scrollTo(500, 0);
    }

    handleGuardar = (event) => {
        const data = {
            id_usuario: JSON.parse(localStorage.getItem("user")).id_usuario,
            ciudad: event.currentTarget.getAttribute("id_ciudad"),
            pais: this.state.pais_seleccionado
        }
        InstanciaFunc.updateUsuario(data).then((result) => {
            const url = localStorage.getItem('url_pendiente') ? localStorage.getItem('url_pendiente') : '/perfil'
            localStorage.removeItem('url_pendiente')
            Router.push(url)
        })
    }

    render() {
        let ciudades = this.ciudades
        const paises = this.paises
        return (
            <Layout title="Ubicación">
                <div id="view_Ubicacion">
                    <div className="content">
                        {
                            // Seleccionar pais
                            !this.state.pais_seleccionado && paises.map((pais, ind) => {
                                return <Card key={ind} onClick={(e) => {
                                        this.setState({pais_seleccionado: pais.id})
                                    }} 
                                    className={'pais' + (pais.id == this.state.pais_seleccionado ? 'active' : '') + ` Card cardTitle`}>
                                    <h2>{pais.nombre}</h2>
                                    <img key={ind} src={`/images/ciudades/${pais.id}.jpg`} />
                                </Card>
                            })
                        }

                        {
                            // Seleccionar ciudad
                            this.state.pais_seleccionado && ciudades.filter((ciudad) => ciudad.pais == this.state.pais_seleccionado).map((ciudad, ind) => {
                                return <Card key={ind}
                                    className={(ciudad.id == this.state.ciudad_seleccionada ? 'active' : '') + ` Card cardTitle`}>
                                    <h2>{ciudad.nombre}</h2>
                                    <img id_ciudad={ciudad.id} onClick={this.handleGuardar} key={ind} src={`/images/ciudades/${ciudad.id}.jpg`} />
                                </Card>
                            })
                        }
                    </div>
                </div>
            </Layout>
        )
    }
}

export default SeleccionarCiudad
