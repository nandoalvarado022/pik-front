import Layout from "../components/layout/Layout"
import Clubs from '../components/clubs/Clubs'

export default class Clubes extends React.Component{
    static async getInitialProps(context, Funciones){
        const clubs = await Funciones.getClubs({})
        return { clubs }
    }

    render(){    
        return <Layout title="Clubes">
            <Clubs clubs={this.props.clubs} />
        </Layout>
    }
}