import Layout from "../../components/layout/Layout"
import { getFeed, capitalize } from "../../lib/functions"
import Portada from "../../components/portada/Portada"

class CategoryPage extends React.Component {
  static async getInitialProps({ req, query }) {
    const category = query.id
    let feed = await getFeed({ category })
    return { category, feed };
  }

  render() {
    const { category } = this.props
    const url = "https://pikajuegos.com/category/" + category
    const meta_title = capitalize(category) + " | "
    const descripcion = "Pikajuegos es un sitio web de comercio electrónico, un marketplace donde se encuentran tiendas de venta de videojuegos, artículos y consolas de Playstation, Xbox y Nintendo Switch de alto prestigio en Colombia"
    return <Layout meta_url={url} category={category} meta_descripcion={descripcion} meta_title={meta_title} title={meta_title}>
      <Portada category={category} feed={this.props.feed} />
    </Layout>
  }
}

export default CategoryPage