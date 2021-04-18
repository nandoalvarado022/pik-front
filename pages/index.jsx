import Layout from "../components/layout/Layout"
import { getFeed } from "../lib/functions"
import Portada from "../components/portada/Portada"

// export const config = { unstable_runtimeJS: false }

class Index extends React.Component {
  static async getInitialProps({ req, query }) {
    let feed = await getFeed({})
    return { feed }
  }

  render() {
    const url = "https://pikajuegos.com"
    const meta_title = "Videojuegos, artículos y consolas de Playstation, Xbox y Nintendo Switch al mejor precio del mercado"
    const descripcion = "Pikajuegos es un sitio web de comercio electrónico, un marketplace donde se encuentran tiendas de venta de videojuegos, artículos y consolas de Playstation, Xbox y Nintendo Switch de alto prestigio en Colombia"
    return <Layout meta_url={url} meta_descripcion={descripcion} meta_title={meta_title} title={meta_title}>
      <Portada feed={this.props.feed} />
    </Layout>
  }
}

export default Index