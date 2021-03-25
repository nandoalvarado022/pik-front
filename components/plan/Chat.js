import date from 'date-and-time'
import Btn from '../btn/Btn'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Funciones from '../../lib/functions'

date.locale('es')
const instanciaFunc = new Funciones
export default class Chat extends React.Component {
    usuarios = []
    id_actividad = this.props.id_actividad
    state = {
        conversation_list: [],
        listUsers: [],
        logueado: false
    }

    /*startChat = () => {
        let name = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).name : "Invitado"
        this.socket.emit('signIn', {
            userName: name,
            channelName: this.props.eventName
        });
        
        this.socket.on('signIn', (params) => {
            let newArray = this.state.listUsers;
            newArray.push(params);
            this.setState({listUsers: newArray})
        });

        this.socket.on('reciveMessage', (params) => { // Recibiendo mensaje
            let obj_message = {...params, className: "bounce"};
            let conversation_list = this.state.conversation_list;
            let arr = Array.prototype.slice.call(conversation_list);
            arr.push(obj_message)
            this.setState({conversation_list: arr}, () => {
                document.getElementById("conversation_list").scrollTop = document.getElementById("conversation_list").scrollHeight
                document.getElementById("txtSendMessage").value = ""
                // document.getElementById("txtSendMessage").focus();
            })
        });
    }*/

    oldHandleSendMessage = () => {
        // Enviando mensaje al server
        const data = {
            name: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).name : "Invitado",
            message: document.getElementById("txtSendMessage").value,
            picture: JSON.parse(localStorage.getItem("user")).picture
        }
        this.socket.emit('sendMessage', data);
    }

    handleSendMessage = () => {
        // Enviando mensaje al server
        const now = new Date();
        const fecha = date.format(now, 'YYYY/MM/DD HH:mm:ss');
        const infoMensaje = {
            id_usuario: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).email : "",
            mensaje: document.getElementById("txtSendMessage").value,
            fecha,
            usuario: JSON.parse(localStorage.getItem("user")).name
        }
        const id_actividad = this.id_actividad
        instanciaFunc.enviarMensajeChat({ id_actividad, infoMensaje })
        document.getElementById("txtSendMessage").value = "" // Limpiando cuadro de mensaje
        setTimeout(() => { // Ajustando el scroll al nuevo mensaje
            document.querySelector("#conversation_list").scrollTo(0, document.querySelector("#conversation_list").scrollHeight);
        }, 100)
    }

    async componentDidMount() {
        if (localStorage.getItem("user")) {
            this.setState({
                logueado: true
            })
        }

        this.usuarios = await instanciaFunc.getUsuarios({})

        const usuarios = this.usuarios
        const data = []
        const id_actividad = this.id_actividad
        const result = instanciaFunc.db.collection('actividades').doc(id_actividad).onSnapshot((doc) => {
            let conversation_list = doc.data().hasOwnProperty("chat") ? doc.data().chat : []
            conversation_list = conversation_list.map(item => {
                let usuario = usuarios.find(usuario => usuario.email == item.id_usuario)
                let imagen = usuario && usuario.hasOwnProperty("picture") ? usuario.picture : ""
                return {
                    ...item,
                    imagen
                }
            })
            this.setState({
                conversation_list: [
                    { imagen: "", name: "C2R", mensaje: "Bienvenido, por favor se respetuoso." },
                    ...conversation_list
                ]
            })
        })
        // Recuperando chat
        // Functions.getChatActividad();
    }

    render() {
        return (<div id="view_Chat">
            <div id="conversation_list">
                {
                    this.state.conversation_list.map(({ usuario, mensaje, imagen, fecha }, ind) => {
                        return <p key={ind} className={"message"}>
                            <span className="fecha_sistema">
                                {
                                    ind != 0 ? date.format(new Date(fecha), 'MMM D hh:mm') : ''
                                }
                            </span>
                            <img src={`${imagen}_400x400.jpg?alt=media`} alt="" />
                            {/* <i>{usuario}</i>&nbsp; */}
                            <span className="text">{mensaje}</span>
                        </p>
                    })
                }
            </div>
            <div id="to_write">
                <div className="caja_texto">
                    <TextField
                        autoComplete="off"
                        id="txtSendMessage"
                        label="Dí algo"
                        margin="normal"
                        fullWidth={true}
                    // autoComplete={false}
                    />
                </div>
                <Btn className={"blue small" + (!this.state.logueado ? " disabled" : "")}
                    blockClick={!this.state.logueado}
                    text={<FontAwesomeIcon onClick={this.handleSendMessage} className="fas fa-feather" icon={faPaperPlane} />} />
            </div>
        </div>
        )
    }
}