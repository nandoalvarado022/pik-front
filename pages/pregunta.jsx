import Layout from '../components/layout/Layout'
import Funciones from '../lib/functions'
import Card from '../components/card/Card'

const instanciaFunc = new Funciones

export default class extends React.Component {
    id_pregunta = null
    constructor() {
        super();
    }

    static async getInitialProps(context) {
        this.id_pregunta = context.query.pregunta
        const id_pregunta = this.id_pregunta
        const pregunta_detalle = await instanciaFunc.getPreguntas({ id_pregunta })
        return { pregunta_detalle: pregunta_detalle[0] }
    }

    handleResponder = async () => {
        console.log(this.props)
        const data = {
            respuesta: {
                respuesta: document.getElementById("txtSendMessage").value,
                id_usuario: JSON.parse(localStorage.getItem("user")).email
            },
            idPregunta: this.id_pregunta
        }
        const res = await instanciaFunc.saveRespuesta(data);
        document.getElementById("txtSendMessage").value = ""
        /*const respuestas = this.state.respuestas;
        respuestas.push(data.respuesta);
        this.setState(state => ({
            respuestas,
            showNoty: true
        }))*/
        return
    }

    render() {
        const { descripcion } = this.props.pregunta_detalle
        const title = descripcion.substr(0, 20)
        return <Layout title={title} descripcion={descripcion}>
            <Card permitirLink={false} handleResponder={this.handleResponder} {...this.props.pregunta_detalle} />
        </Layout>
    }
}