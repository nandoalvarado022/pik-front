import Layout from '../components/layout/Layout'
import Perfil from '../components/perfil/Perfil'

export default class extends React.Component{
    render(){
        return <Layout {...this.props} title="Perfil">
            <Perfil />
        </Layout>
    }
}