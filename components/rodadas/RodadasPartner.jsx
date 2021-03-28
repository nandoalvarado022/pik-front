import date from "date-and-time";
import "date-and-time/locale/es";
import Funciones from "../../lib/functions";
import Card from "../card/Card";
import Categorias from "../categorias/Categorias";
import Footer from "../footer/Footer";
import Newsletter from "../newsletter/Newsletter";
import ImageGallery from "react-image-gallery";

const instanciaFunc = new Funciones();

date.locale("es");

export default class Rodadas extends React.Component {
  state = {
    feed: this.props.feed,
    feedOriginal: this.props.feed,
  };

  async handleLike(params = {}) {
    const elemento = params.event.currentTarget;
    const obj = {
      docID: elemento.getAttribute("doc_id"),
      tipo_coleccion: elemento.getAttribute("tipo_coleccion"),
      elemento,
    };

    const result = await instanciaFunc.handleLike(obj);
    if (!result) return;
  }

  obtenerNuevosUsados(feed) {
    const obj = {
      nuevos: feed.map((item) => {
        if (item.condition == "new") return item;
        else return false;
      }),
      usados: feed.map((item) => {
        if (item.condition == "used") return item;
        else return false;
      }),
      without_box: feed.map((item) => {
        if (item.condition == "without_box") return item;
        else return false;
      }),
    };
    this.setState({ ...obj, feed });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.obtenerNuevosUsados(this.state.feedOriginal);
  }

  filtrarRodadas = (type) => {
    window.scrollTo(0, 0);
    this.setState({
      feed: [],
    });
    let feed = null;
    if (type)
      feed = this.state.feedOriginal.filter((item) => item.type == type);
    else if (!type) feed = this.state.feedOriginal;
    // setTimeout(() => {
    this.obtenerNuevosUsados(feed);
    // });
  };

  render() {
    let indice_item = 0;
    return (
      <React.Fragment>
        <div className="view_Rodadas">
          <div>
            {/* NUEVOS */}

            <div className="listadoRodadas">
              {this.state.feed &&
                this.state.feed.map((item, ind) => {
                  return (
                    item && (
                      <React.Fragment key={ind}>
                        <Card
                          special_title="Más vendido"
                          destacada={true}
                          logDetalle={false}
                          doc_id={item.id}
                          handleLike={this.handleLike}
                          permitirLink={true}
                          {...item}
                          coleccion={item.coleccion}
                          indice_item={ind}
                        />
                      </React.Fragment>
                    )
                  );
                })}
            </div>
            <Newsletter />
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
