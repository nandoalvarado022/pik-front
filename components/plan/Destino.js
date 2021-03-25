import Swiper from 'react-id-swiper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faEnvelopeOpen, faHandPointUp, faCalendarAlt, faUserFriends, faMapMarkerAlt, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import date from 'date-and-time'
import 'date-and-time/locale/es'
import Box from '@material-ui/core/Box'
import React from 'react'
import Btn from '../btn/Btn'
import Funciones from '../../lib/functions'

const instanciaFunc = new Funciones

export default class Destino extends React.Component{
    params_galeria = {
        navigation: {
            nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev'
        }
    }
    state = {        
        value: 2,
        btnIrePermitir: true,
        logVerGaleria: false
    }
    
    listado = [
        {logo: "psmedellin.jpg", name: "Pasión Scooter Medellin", wsp: "3022600906"},
        {logo: "navimedellin.jpg", name: "Club Honda navi Medellín"}
    ];

    checkInscripcion(){
        // Buscando si se inscribio el usuario para ese plan
        const id_actividad = this.props.dataPlan.short_name
        instanciaFunc.getUsuariosActividad(id_actividad).then((result) => {
            const inscrito = !!result.find(item => item.id_usuario == JSON.parse(localStorage.getItem("user")).email)
            this.setState({
                inscrito
            })
        })
    }

    componentDidMount(){
        localStorage.getItem("user") && this.checkInscripcion()
        this.userInfo = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
        if(!this.userInfo.hasOwnProperty("email")){
            this.setState({logueado: false, btnIrePermitir: false})
        } else{
            this.setState({logueado: true})
        }
    }

    handleLogInfo = () => {
        this.setState({logVerGaleria: !this.state.logVerGaleria})
    }

    handleInscribirse = async () => {
        const data = {
            id_usuario: JSON.parse(localStorage.getItem("user")).email,
            id_actividad: this.props.dataPlan.short_name
        }
        const result = await instanciaFunc.saveUsuarioActivity(data)
        this.setState({
            inscrito: true,
            btnIrePermitir: false
        })
        // Se inscribio
    }

    render(){
        const { fecha_rodada, imagenes, by, place, author, descripcion, title } = this.props.dataPlan;

        return (<div className="Destino">
            <div className="sup">
                <Swiper {...this.params_galeria}>
                    {
                        imagenes.map(imagen => <img onClick={this.handleLogInfo} className="" src={`${imagen}_1200x1200.jpg?alt=media`} />)
                    }
                </Swiper>
                {/* <img src={`${imagenes[0]}_1200x1200.jpg?alt=media`} /> */}
                <div onClick={this.handleLogInfo} className={"aditionalInfo " + this.state.logVerGaleria}>
                    <li>
                        {/* <FontAwesomeIcon icon={faMapMarkerAlt} />&nbsp; */}
                        {title}
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faMapMarkerAlt} />&nbsp;
                        Lugar: {place}
                    </li>
                    {/* <li>
                        <FontAwesomeIcon icon={faDollarSign} />&nbsp;
                        Precio: Gratis
                    </li> */}
                    {/* <li>
                        <FontAwesomeIcon icon={faUserFriends} />&nbsp;
                        Dirigido a: Todo el público
                    </li> */}
                    <li>
                        <FontAwesomeIcon icon={faCalendarAlt} />&nbsp;
                        Fecha: { date.format(new Date(fecha_rodada), 'ddd MMM DD YYYY') }
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faEnvelopeOpen} />&nbsp;
                        {descripcion}
                    </li>
                </div>
                <div className="info">
                    <span className="date">
                        <FontAwesomeIcon icon={faCalendarAlt} />
                        &nbsp;
                        <span>
                            { date.format(new Date(fecha_rodada), 'ddd MMM DD YYYY') }
                        </span>
                    </span>
                    <span className="organiza">
                        
                        <span>Organiza: {author && author.name}</span>
                        <img className="radius" src={author && author.image} />
                    </span>
                </div>
            </div>

            <div className="actions">
                {
                    !this.state.inscrito 
                        ? 
                            <Btn text={
                                <span>
                                    {/* <FontAwesomeIcon icon={faHandPointUp} />&nbsp;*/}
                                    Unirse
                                </span>}
                                blockClick={!this.state.btnIrePermitir} 
                                onClick={this.handleInscribirse} 
                                className={"green small"+(!this.state.logueado ? " disabled" : "")}>
                            </Btn>
                        : 
                            <span>Contamos contigo!</span>
                }
                <div className="list caja_usuarios">
                    {
                        this.props.dataPlan.participantes.map((persona, ind) => {
                            return <img key={ind} className="radius" src={persona.picture} />				
                        })
                    }
                </div>
            </div>

            {/* <div className="weWereHere">
                <img className="icon" src="/images/icons/flag.png" alt=""/>
                <span className="title">Quienes han conquistado este lugar</span>
                <div className="listado">
                    {
                        this.listado.map((club, ind) => <img key={ind} alt="" className="radius" src={"/images/logos/"+club.logo} />)
                    }
                </div>
            </div> */}
        </div>)
    }
}