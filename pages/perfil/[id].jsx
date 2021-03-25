import Layout from '../../components/layout/Layout'
import PerfilVisitante from '../../components/perfil/PerfilVisitante'

export default class VisitantePage extends React.Component {
    static async getInitialProps(context, Funciones) {
        let param = context.query.id
        const info_usuario = await Funciones.getInfoUsuario({ id_usuario: param })
        const productos = await Funciones.getPublicaciones({ id_usuario: info_usuario.id_usuario })
        return { info_usuario, productos }
    }

    render() {
        return <Layout title={this.props.info_usuario.name}>
            <PerfilVisitante {...this.props} />
        </Layout>
    }
}