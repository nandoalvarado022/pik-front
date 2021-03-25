import Layout from '../layout/Layout'

export default class Home extends React.Component{
    render(){
        return <div>
            <Layout title="Ingresar">
                <div className="avatar">
                    <img src="/images/profiles/example.png" />
                </div>
            </Layout>
        </div>
    }
}