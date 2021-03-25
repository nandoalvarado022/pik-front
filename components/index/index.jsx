import Layout from "../layout/Layout";
import { getFeed } from "../../lib/functions";
import Rodadas from "../rodadas/Rodadas";
import RodadasPartner from "../rodadas/RodadasPartner";

class EnteratePage extends React.Component {
  partners = ["juanchofenix"];
  static async getInitialProps({ req, query }) {
    const category = query.id ? query.id : null
    let partner = null
    if (req) partner = req.headers.host.split(".")[0];
    else partner = window.location.host.split(".")[0];
    const is_partner = ["juanchofenix"].includes(partner);
    let feed = await getFeed(is_partner ? partner : null);
    return { category, feed, is_partner, partner: is_partner ? partner : false };
  }

  capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  render() {
    const { category } = this.props
    const url = category ? "https://pikajuegos.com/category/" + category : "https://pikajuegos.com"
    const meta_title = `${category ? this.capitalize(category) + " | " : ''} Videojuegos, artículos y consolas de Playstation, Xbox y Nintendo Switch al mejor precio del mercado`
    const descripcion = "Pikajuegos es un sitio web de comercio electrónico, un marketplace donde se encuentran tiendas de venta de videojuegos, artículos y consolas de Playstation, Xbox y Nintendo Switch de alto prestigio en Colombia"
    return this.props.is_partner ? (<Layout
      {...this.props}
      meta_url={url}
      meta_descripcion={descripcion}
      meta_title={meta_title}
      title={meta_title}>
      <RodadasPartner
        {...this.props}
        clubs={this.props.clubs}
        feed={this.props.feed}
      />
    </Layout>
    ) : (<Layout
      {...this.props}
      meta_url={url}
      category={category}
      meta_descripcion={descripcion}
      meta_title={meta_title}
      title={meta_title}>
      <Rodadas {...this.props} feed={this.props.feed} />
    </Layout>)
  }
}

export default EnteratePage
