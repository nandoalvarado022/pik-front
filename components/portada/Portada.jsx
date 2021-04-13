import date from 'date-and-time'
import Funciones from '../../lib/functions'
import PortadaInterface from './PortadaInterface'
import 'date-and-time/locale/es'

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

  componentDidMount() {
    if (this.props.category) this.filtrarRodadas(this.props.category)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.category != this.props.category) this.filtrarRodadas(this.props.category)
  }

  filtrarRodadas = (type) => {
    debugger
    let feed = null
    if (type) feed = this.state.feedOriginal.filter(item => item.type == type)
    else if (!type) feed = this.state.feedOriginal
    debugger
    this.setState({ feed })
  }

  render() {
    return <PortadaInterface {...{ category: this.props.category, handleLike: this.handleLike, feed: this.state.feed }} />
  }
}