import date from 'date-and-time'
import 'date-and-time/locale/es'
import Funciones from '../../lib/functions'
import Card from '../card/Card'
import Categorias from '../categorias/Categorias'
import Footer from '../footer/Footer'
import ImageGallery from 'react-image-gallery'
import styles from "./portada.module.scss";

const instanciaFunc = new Funciones

date.locale('es');

export default class Portada extends React.Component {
  state = {
    feed: this.props.feed,
    feedOriginal: this.props.feed,
  }

  async handleLike(params = {}) {
    const elemento = params.event.currentTarget
    const obj = {
      docID: elemento.getAttribute("doc_id"),
      tipo_coleccion: elemento.getAttribute("tipo_coleccion"),
      elemento
    }

    const result = await instanciaFunc.handleLike(obj)
    if (!result) return
  }

  obtenerNuevosUsados(feed) {
    const obj = {
      nuevos: feed.filter(item => item.is_new == 1),
      usados: feed.filter(item => item.is_new == 0),
    }
    this.setState({ ...obj, feed })
  }

  componentDidMount() {
    if (this.props.category) this.filtrarRodadas(this.props.category)
    else this.obtenerNuevosUsados(this.state.feedOriginal)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.category != this.props.category) this.filtrarRodadas(this.props.category)
  }

  filtrarRodadas = (type) => {
    this.setState({
      feed: []
    })
    let feed = null
    if (type) feed = this.state.feedOriginal.filter(item => item.type == type)
    else if (!type) feed = this.state.feedOriginal
    this.obtenerNuevosUsados(feed)
  }

  renderSpecialBanner() {
    if (!this.props.category) {
      const items = [
        this.state.feedOriginal[0],
        this.state.feedOriginal[1],
      ]

      return <div id={styles.specialBanner}>
        <div className={styles.box}>
          <div className={styles.title}>Lo más popular</div>
          <Card key={items[0].id} handleLike={this.handleLike} permitirLink={true} {...items[0]} />
        </div>
        <img src="/images/banners/banner-varios-juegos.png" alt="Juegos SSwitch en promoción" />
        <div className={styles.box}>
          <div className={styles.title}>Lo más vendido</div>
          <Card key={items[1].id} handleLike={this.handleLike} permitirLink={true} {...items[1]} />
        </div>
      </div>
    } else {
      switch (this.props.category) {
        case "ps4":
          return <img className="block-center" src="https://www.combogamer.com/wp-content/uploads/2014/05/ps4-launch-banner.png" />
        default:
          return <img className="block-center" src="https://switchplayer.net/wp-content/uploads/2017/03/Nintendo-Switch-List-Banner-1-820x171.png" />
      }
    }
  }

  render() {
    return <React.Fragment>
      {this.renderSpecialBanner()}
      <div className={styles.view_Rodadas}>
        <div className={styles.main}>
          <Categorias scroll={false} />
          {/* NUEVOS */}
          {this.state.nuevos && this.state.nuevos.length > 0 && <React.Fragment>
            <img src="/images/banners/sellados-nuevos.png" alt="Juegos nuevos, sellados" />
            <div className="listadoRodadas sellados">
              {this.state.nuevos && this.state.nuevos.map((item, ind) => {
                return <Card itemId={item.id} special_title="Más vendido" destacada={true} logDetalle={false} handleLike={this.handleLike} permitirLink={true} {...item} coleccion={item.coleccion} indice_item={ind} />
              })}
            </div>
          </React.Fragment>}

          {/* USADOS */}
          {this.state.usados && this.state.usados.length > 0 && <React.Fragment>
            <img src="/images/banners/usados.png" alt="Juegos usados" />
            <div className="listadoRodadas usados">
              {
                this.state.usados && this.state.usados.map((item, ind) => {
                  return <Card itemId={item.id} special_title={ind == 0 ? 'Más vendido de la semana' : null} logDetalle={false} handleLike={this.handleLike} permitirLink={true} {...item} coleccion={item.coleccion} indice_item={ind} />
                })
              }
            </div>
          </React.Fragment>}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  }
}