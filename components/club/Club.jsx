import Router from 'next/router'
import toastr from "toastr"
import Snackbar from '@material-ui/core/Snackbar';
import Ayuda from "../ayuda/Ayuda"
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCameraRetro, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faWhatsapp, faFacebook } from '@fortawesome/free-brands-svg-icons'
import Btn from "../btn/Btn"
import Layout from "../layout/Layout"
import Funciones from '../../lib/functions'
import Rodadas from '../rodadas/Rodadas'
import TopNavbar from '../topNavbar/TopNavbar'
import WrapperConsumer from "../store";

const instanciaFunc = new Funciones

class Club extends React.Component {
    constructor(props) {
        super(props);
    }

    userInfo = {}
    state = {
        classBotonIngreso: ""
    }
    stepsAyuda = [
        <div>
        </div>
    ]

    handleUnirme = async (e) => {
        const context = this.props.context
        if (!localStorage.getItem("user")) {
            Router.push("/login")
            return false
        }
        const club_short_name = this.props.club.short_name
        const club_imagen = this.props.club.imagen
        const data = {
            id_usuario: JSON.parse(localStorage.getItem("user")).id_usuario,
            club_short_name
        }
        const result = await instanciaFunc.updateUsuario(data)
        this.userInfo.club_short_name = club_short_name
        this.userInfo.club_imagen = club_imagen
        localStorage.setItem("user", JSON.stringify(this.userInfo))
        this.setState({
            classBotonIngreso: "remove"
        })
        toastr.success('Listo, ahora haces parte del club, que lo disfrutes y a rodar!')

        // Guardando notificacion
        const notificacionNueva = `¡Hola!, bienvenido al club ${this.props.club.nombre}, esperamos conocerte y compartir muchos viajes contigo, por favor presentate en una publicación para que todos te conozcan`
        instanciaFunc.saveNotificacion({ notificacionNueva })
        const id_club = this.props.club.id_club
        instanciaFunc.saveMiembroClub({ id_club })

        // Actualizando state global notificaciones
        const { notificaciones, changeValor } = context
        notificaciones.listado.push(notificacionNueva)
        changeValor('notificaciones', notificaciones)
    }

    componentDidMount() {
        window.scrollTo(500, 0);
        this.userInfo = JSON.parse(localStorage.getItem("user"))
        if (!localStorage.getItem("user")) {
            this.setState({
                classBotonIngreso: "disabled"
            })
        } else {
            // Si el usuario             
            const club_short_name = JSON.parse(localStorage.getItem("user")).club_short_name ? JSON.parse(localStorage.getItem("user")).club_short_name : null
            if (this.userInfo && this.userInfo.club_short_name != this.props.club.short_name) {
                this.setState({
                    classBotonIngreso: ""
                })
            } else {
                this.setState({
                    classBotonIngreso: "remove"
                })
            }
        }
    }

    render() {
        return <Layout title={this.props.club.nombre}>
            <div id="view_Club">
                <header>
                    <img src={"/images/clubs/portadas/" + this.props.club.short_name + ".jpg"} alt="" />
                    <img className="profileImagen" src={"/images/clubs/logos/" + this.props.club.short_name + ".jpg"} />
                    <div className="actions">
                        {/* <Link>
                            <a className="font-b" href="#">
                                <FontAwesomeIcon icon={faCameraRetro} />&nbsp;Fotos
                            </a>
                        </Link>

                        <a className="font-b" href="#">
                            <FontAwesomeIcon icon={faUsers} />&nbsp;Unirme
                        </a> */}

                        {
                            this.state.classBotonIngreso != "remove" &&
                            <span onClick={this.handleUnirme} className={" pertenecer green small m-l-10 " + this.state.classBotonIngreso}>
                                INGRESAR AL CLUB
                                </span>
                        }

                        <a className="icon" href="#">
                            <img src="/images/icons/whatsapp.svg" />
                        </a>
                        <a className="icon" href="#">
                            <img src="/images/icons/instagram.svg" />
                        </a>
                        <a className="icon" href="#">
                            <img src="/images/icons/facebook.svg" />
                        </a>
                    </div>
                </header>

                <div className="content">
                    <div className="Card cardTitle">
                        <h2>Conócenos</h2>
                        <p>
                            {this.props.club.conocenos}
                        </p>
                    </div>

                    {/* <div className="Card cardTitle">
                        <h2>tablero</h2>
                        <div className="content">
                            {
                                this.props.club.tablero && this.props.club.tablero.map(item => {
                                    return <div>{item}</div>
                                })
                            }

                            {
                                !this.props.club.tablero && <p>Todavia no hay nada por aquí</p>
                            }
                        </div>
                    </div> */}

                    <div className="Card cardTitle">
                        <h2>Últimos miembros</h2>
                        {!this.props.club.usuarios && <span>Aun no hay miembros</span>}
                        { // Nuevos usuarios
                            // this.props.club.usuarios && <TopNavbar data={this.props.club.usuarios} descripcion='nuevo_usuario' club={"casaciclistasmedellin"} />
                        }
                    </div>

                    <div className="Card cardTitle rodadas">
                        <h2>Rodadas y publicaciones</h2>
                        <div className="content">
                            <Rodadas feed={this.props.feed} club={this.props.club.short_name} />
                        </div>
                    </div>

                </div>
            </div>

            {/* <Ayuda nombreAyuda="club" background={true} steps={this.stepsAyuda}></Ayuda> */}
        </Layout>
    }
}

export default WrapperConsumer(Club)