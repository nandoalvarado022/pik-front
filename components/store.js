import { createContext } from 'react';
import Funciones from '../lib/utils'

const { Provider, Consumer } = createContext();

class ContextStore extends React.Component {
	constructor() {
		super()
		this.instanciaFunciones = new Funciones
	}

	changeValor = (key, valor) => {
		this.setState({
			[key]: valor
		})
	}

	state = {
		nombre: "usuario",
		notificaciones: [],
		changeValor: this.changeValor
	}

	async componentDidMount() {
		const notificaciones = await this.instanciaFunciones.getNotificaciones({})
		this.setState({
			notificaciones
		})
	}

	render() {
		const { store } = this.props
		// return <Provider value={store ? {[store] : this.state[store]} : this.state}>
		// Pendiente este código de arriba para solo enviar la propiedad del estado necesitado y no enviar todo el estado
		return <Provider value={this.state}>
			{this.props.componente}
		</Provider>
	}
}

const WrapperConsumer = (Component) => {
	return (props) => {
		return (
			<Consumer>
				{
					context => {
						return <Component {...props} context={context} />
					}
				}
			</Consumer>
		)
	}
}



export default WrapperConsumer;
export { ContextStore }