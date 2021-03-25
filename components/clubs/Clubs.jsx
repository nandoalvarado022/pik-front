import TextField from '@material-ui/core/TextField'
import moment from 'moment'
import Typist from 'react-typist'
import Grow from "@material-ui/core/Grow"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faHeart } from '@fortawesome/free-solid-svg-icons'
import Ayuda from "../ayuda/Ayuda"
import Btn from "../btn/Btn"
import Link from 'next/link'
import { format_number } from '../../lib/utilidades'

moment.locale("es");

export default class Clubs extends React.Component {
    constructor(props){
        super(props)
    }

    state = {
        nameBuscadorClub: "",
        log_buscador: true,
        clubs: this.props.clubs
    }

    stepsAyuda = []

    onChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    componentDidMount() {
        window.scrollTo(500, 0);
        this.setState({
            log_buscador: this.props.log_buscador == false ? this.props.log_buscador : true
        })
    }

    render() {
        return <div id="view_Clubs">
            {
                // Buscador
                this.state.log_buscador && <div className="buscador">
                    <TextField name="nameBuscadorClub" fullWidth={true} onChange={this.onChange} label="Busca tu club" margin="normal" size={25} />
                </div>
            }

            <div className="listado">
                {
                    this.state.clubs && this.state.clubs.filter(club => {
                        return club.nombre.toLowerCase().includes(this.state.nameBuscadorClub.toLowerCase())
                    }).map((club, ind) => {
                        club.haceCuanto = club.ultima_actividad ? moment.unix(club.ultima_actividad.seconds).fromNow() : null
                        const id = club.short_name
                        return <Grow
                            key={ind}
                            in={true}
                            style={{ transformOrigin: "0 0 0" }}
                            timeout={ind * 500}>
                            <div className="item" idclub={club.id}>
                                <h2>{club.nombre}</h2>
                                <img src={"/images/clubs/logos/" + club.short_name + ".jpg"} alt="" />
                                <div className="contentBoton">
                                    <Link href="/club/[id]" as={"/club/" + id}>
                                        <a>
                                            <Btn className="blue small m-l-10" text="Abrir" />
                                        </a>
                                    </Link>
                                </div>
                                <div className="miembros">
                                    <FontAwesomeIcon icon={faUsers} />
                                    &nbsp;
                                    {club.miembros && format_number(club.miembros)}
                                    &nbsp;
                                    Miembros
                                </div>
                                <div className="seguidores">
                                    <FontAwesomeIcon icon={faHeart} />
                                    &nbsp;
                                    {club.seguidores && format_number(club.seguidores)}
                                    &nbsp;
                                    Seguidores
                                </div>
                                {
                                    club.haceCuanto && <div className="ultima_actividad">
                                        Última actividad hace&nbsp; {club.haceCuanto}
                                    </div>
                                }
                            </div>
                        </Grow>
                    })
                }
            </div>
        </div>
        {/* <Ayuda nombreAyuda="clubs" background={true} steps={this.stepsAyuda}></Ayuda> */ }
    }
}