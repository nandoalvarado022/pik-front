import date from 'date-and-time'
import 'date-and-time/locale/es'
import Funciones from '../../lib/functions'
import Card from '../card/Card'
import Categorias from '../categorias/Categorias'
import Footer from '../footer/Footer'
import ImageGallery from 'react-image-gallery'

const instanciaFunc = new Funciones

date.locale('es');

export default class Rodadas extends React.Component {
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

      return <div id="specialBanner">
        <div className="box">
          <div className="title">Lo más popular</div>
          <Card key={items[0].id} handleLike={this.handleLike} permitirLink={true} {...items[0]} coleccion={items[0].coleccion} indice_item={0} />
        </div>
        <img src="/images/banners/banner-varios-juegos.png" alt="Juegos SSwitch en promoción" />
        <div className="box">
          <div className="title">Lo más vendido</div>
          <Card key={items[1].id} handleLike={this.handleLike} permitirLink={true} {...items[1]} coleccion={items[1].coleccion} indice_item={1} />
        </div>
      </div>
    } else {
      return <img className="block-center" src="https://switchplayer.net/wp-content/uploads/2017/03/Nintendo-Switch-List-Banner-1-820x171.png" />
    }
  }

  render() {
    return <React.Fragment>
      {this.renderSpecialBanner()}
      <div className="view_Rodadas">
        <div className="left">
          <p>
            <div className="Card">

            </div>
          </p>
          <img src="/images/banners/descuentos-exclusivos.png" alt="Descuentos en Paper Mario" />
          <p>
            <div className="Card">
              <h3>Referencias de clientes</h3>
              <ImageGallery
                items={[
                  { original: '/images/referencias/1.jfif' },
                  { original: '/images/referencias/2.jfif' },
                  { original: '/images/referencias/3.jfif' },
                ]}
                showThumbnails={false}
                lazyLoad={false}
                showPlayButton={false}
                showBullets={false}
                showFullscreenButton={false}
                autoPlay={true}
              />
            </div>
          </p>
          <img src="/images/banners/banner-3-espacios.png" alt="Descuentos en Paper Mario" />
        </div>

        <div className="main">
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