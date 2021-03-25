import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser, faUsers, faBell, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import Ayuda from "../ayuda/Ayuda"
import Card from "@material-ui/core/Card"
import Layout from "../layout/Layout"
import Destino from './Destino'
import Btn from '../btn/Btn'
import React from 'react'
import Chat from "./Chat"

export default class Plan extends React.Component {
	stepsAyuda = [
		<div><span className="emoji">😁</span>Acá puedes ver informacion del evento, incluso hablar con los participantes!</div>
	]

	state = {
	}

	handleChange = (event, newValue) => {
		this.setState({
			value: newValue
		})
    }

	componentDidMount() {
		this.userInfo = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
		if (!this.userInfo.hasOwnProperty("email")) {
			this.setState({ logueado: false })
		} else {
			this.setState({ logueado: true })
		}
		window.scrollTo(500, 0);
	}

	render() {
		const { title, image, by, date, descripcion, short_name } = this.props.dataPlan
		const url = "https://club2ruedas.com/" + short_name
		const meta_title = "Club2ruedas: " + title
		return (
			<Layout meta_url={url} meta_descripcion={descripcion} meta_title={meta_title} title="Rodada">
				<div id="view_Plan">
					<div className="content">
						<div className="Card cardTitle content_destino">
							<h2>Nos fuimos</h2>
							<Destino dataPlan={this.props.dataPlan} image={image} by={by} fecha={date} />
						</div>
						<br />
						<Card className="Card cardTitle CardChat">
							<h2>Chat</h2>
							<div id="online_users">
								<Chat id_actividad={this.props.dataPlan.id} eventName="Salida a cocorollo" />
							</div>
						</Card>
					</div>
				</div>
				<Ayuda nombreAyuda="plan" background={true} steps={this.stepsAyuda}></Ayuda>
			</Layout>
		);
	}
}