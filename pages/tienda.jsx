import Layout from '../components/layout/Layout'

class TiendaPage extends React.Component {
    render() {
        const meta_title = "Tienda"
        const descripcion = "Club2ruedas - Tienda: La comunidad de compra y venta de articulos de motos y bicis más grande a América Latina";
        const url = "https://club2ruedas.com/tienda"
        return <Layout meta_url={url} meta_descripcion={descripcion} meta_title={meta_title} title="Tienda">
            <div>
                Hola a todos
            </div>
        </Layout>
    }
}

export default TiendaPage