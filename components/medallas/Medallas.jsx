import Functions from '../../lib/functions'

export default class Medallas extends React.Component {
	state = {
		listadoMedallas: null
	}
	getMedallas() {
		Functions.getMedallas().then((result) => {
			const medallas = result
			Functions.getMedallasUsuario().then((medallas_usuario) => {
				medallas;
				const listadoMedallas = medallas.map(item => {
					return {
						...item,
						state: !!medallas_usuario.find(node => node.id_medalla == item.id)
					}
				})
				this.setState({listadoMedallas})
			})
		})
	}

	componentDidMount() {
		this.getMedallas()
	}

	render() {
		return <div className="_Medallas">
			<ul>
				{
					!this.state.listadoMedallas && <div>Cargado medallas...</div>
				}
				{					
					this.state.listadoMedallas && this.state.listadoMedallas.map(item => {
						return <li className={String(item.state)}>
							<div className="content">
								{item.titulo}
								{/* <span>120</span> */}
							</div>
							<div className="sombra"></div>
						</li>
					})
				}
			</ul>
		</div>
	}
}