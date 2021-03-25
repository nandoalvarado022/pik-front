import Link from 'next/link'
import Snackbar from '@material-ui/core/Snackbar'
import TextField from '@material-ui/core/TextField'
import Btn from '../btn/Btn'
import Layout from '../layout/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import Pregunta from './Pregunta'
import Functions from '../../lib/functions'

export default class DetallePregunta extends React.Component{
    preguntaDetalle = this.props.preguntaDetalle
    state = {
        respuestas: this.preguntaDetalle.respuestas ? this.preguntaDetalle.respuestas : [],
    }
    
    handleResponder = async() => {
        const data = {
            respuesta: {
                respuesta: document.getElementById("txtSendMessage").value,
                id_usuario: JSON.parse(localStorage.getItem("user")).email
            },
            idPregunta: this.preguntaDetalle.id
        }
        const res = await Functions.saveRespuesta(data);
        document.getElementById("txtSendMessage").value = ""
        const respuestas = this.state.respuestas;
        respuestas.push(data.respuesta);
        this.setState(state => ({
            respuestas,
            showNoty: true
        }))
        return 
    }

    handleClick = () => {
        this.setState(state => ({
            showNoty: !state.showNoty
        }))
    }

    componentDidMount(){
        this.userInfo = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
        if(!this.userInfo.hasOwnProperty("id_usuario")){
            this.setState({
                logueado: false
            })
        } else{
            this.setState({
                logueado: true
            })
        }
    }

    render(){
        return <Layout title="¿?">
            <div id="view_DeallePregunta">
                <Pregunta preguntaDetalle={this.preguntaDetalle} />
                {
                    this.state.respuestas && this.state.respuestas.map(node => {
                        return <div className="respuestas">
                            <div className="Card">
                                <div>{node.id_usuario}</div>
                                {node.respuesta}
                            </div>
                        </div>
                    })
                }

                {
                    // Caja para escribir comentario
                    this.state.logueado &&
                        <div id="to_write" className="Card">
                            <div className="caja_texto">
                                <TextField
                                    autoComplete="off"
                                    id="txtSendMessage"
                                    label="Dí algo"
                                    margin="normal"
                                    fullWidth={true}
                                />
                            </div>
                            <Btn className="blue small" text={<FontAwesomeIcon onClick={this.handleResponder} className="fas fa-feather" icon={faPaperPlane} />} />
                        </div>
                }
            </div>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={this.state.showNoty}
                autoHideDuration={2000}
                className="notySuccess"
                onClose={() => this.setState({showNoty: false})}
                message={<span id="message-id">Listo! respuesta añadida</span>}
            />
        </Layout>
    }
}