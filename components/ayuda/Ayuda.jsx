import Typist from 'react-typist'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import Funciones from '../../lib/functions'

const instanciaFunc = new Funciones

export default class Ayuda extends React.Component {
    pasosAyuda = []
    logAyuda = false
    state = {
        showAyuda: false,
        actualStep: 0,
        background: this.props.background ? this.props.background : false,
        mostrarAyuda: false
    }

    handleAyuda = () => this.handleSiguiente()

    componentDidMount() {
        let { logAyuda } = this
        const done_tips = localStorage.getItem("done_tips") ? JSON.parse(localStorage.getItem("done_tips")) : []
        logAyuda = done_tips.filter(item => item == this.props.nombreAyuda).length
        if (logAyuda == 0) {
            done_tips.push(this.props.nombreAyuda)
            instanciaFunc.saveTip(done_tips)
        }
        localStorage.setItem("done_tips", JSON.stringify(done_tips))
        if (logAyuda == 0) this.setState({ mostrarAyuda: true })

        setTimeout(() => {
            this.setState({
                showAyuda: true
            })
        }, 300);
    }

    handleSiguiente() {
        this.setState({ showAyuda: false })

        if (this.state.actualStep < this.props.steps.length - 1) {
            setTimeout(() => {
                this.setState(state => ({
                    actualStep: state.actualStep + 1,
                    showAyuda: true
                }))
            }, 400)
        } else {
            this.setState({
                background: false
            })
        }
    }

    mostrarMensaje = (html) => {
        if (this.state.showAyuda == false) return html
        return <Typist avgTypingDelay={20}>
            {html}
        </Typist>
    }

    render() {
        return <React.Fragment>
            {
                this.state.mostrarAyuda
                    ?
                    <div className={"view_Ayuda font-a " + this.state.showAyuda}>
                        <div className={"background " + (this.state.background ? "" : "remove")}></div>
                        <div className="content">
                            <div onClick={this.handleAyuda} className="cerrar">Cerrar</div>
                            {
                                this.mostrarMensaje(this.props.steps[this.state.actualStep])
                            }
                        </div>
                    </div>
                    :
                    <React.Fragment></React.Fragment>
            }
        </React.Fragment>
    }
}