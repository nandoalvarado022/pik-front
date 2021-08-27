import Link from "next/link"
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Layout from '../../components/layout/Layout'
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import Router from 'next/router'
import Card from '../../components/card/Card'
import styles from './publicaciones.module.scss'
import Button from '../../components/button/Button'
import { useEffect, useState } from 'react'
import { format_number } from '../../lib/utils'
import moment from "moment"
import Notification from "../../components/notification"

moment.locale('es')

export default function MyPublications(props) {
	const [showDescription, setShowDescription] = useState(false)
	const phone = typeof window != "undefined" ? JSON.parse(localStorage.getItem("user")).phone : null
	const UPDATE_MUTATION = gql`
	mutation ChangeStatePublication($id: Int!, $status: Boolean!){
		changeStatePublication(id: $id, status: $status)
	}`


	const [changeStatePublication, { loading: loadingUpdate }] = useMutation(UPDATE_MUTATION);

	const PUBLICATIONS_QUERY = gql`
	query Publications($phone: String, $order: Boolean){
		publications(phone: $phone, order: $order){
			accept_changues
			created
			id
			image_link
			sale_price
			slug
			status
			title
		}
	}`

	const [getPublications, { loading: loadingPublications, error, data: reqPublications }] = useLazyQuery(PUBLICATIONS_QUERY, {
		variables: { phone, order: true },
		fetchPolicy: "no-cache"
	})

	const handleChangeState = (id, status) => {
		changeStatePublication({
			variables: { id, status }
		});
		setTimeout(() => {
			getPublications()
		}, 1000)
	}

	const handleEdit = (slug) => {
		Router.push("/publicacion/" + slug + "/editar")
	}

	useEffect(() => {
		getPublications()
	}, [])

	const message = <div>
		<p>🔵 Bienvenido al panel de tus publicaciones</p>
		<p>💙 En Pikajuegos te premiamos por cada cosa que haces, por eso cada vez que realices una venta recibiras 1 moneda</p>
		<p>🤝 Juntos somos mejor</p>
	</div>

	return <Layout title="Crear publicación" meta_title="Crear publicación en club2ruedas.com" meta_url="https://club2ruedas.com/publicacion/crear">
		<div className={styles.content}>
			<h2>
				Publicaciones
				<FontAwesomeIcon icon={faQuestionCircle} onClick={() => { setShowDescription(true) }} />
			</h2>
			<Notification isOpen={showDescription} setIsOpen={setShowDescription} message={message} />
			<ul className="Card">
				{
					reqPublications && reqPublications.publications.map((item, ind) => {
						return <li className={`${styles["wrapper-card"]} ${item.status ? '' : styles.disabled}`}>
							<div><img src={item.image_link} /></div>
							<div>{item.title}</div>
							<div>${format_number(item.sale_price)}</div>

							<div>{moment(parseInt(item.created)).format("MMMM DD YYYY, h:mm:ss a")}</div>
							<div>Vistas: 15</div>
							<div>{item.status ? "Activa" : "Pausada"}</div>
							<div className={styles.actions}>
								<Link href="/publicacion/[id]" as={`/publicacion/${item.slug}`}>
									<a>Ver</a>
								</Link>
								<Button onClick={() => handleEdit(item.slug)} color="blue">Editar</Button>
								<Button onClick={() => handleChangeState(item.id, !item.status)} color={item.status ? "red" : "green"}>
									{
										item.status == true ? <>Desactivar</> : <>Activar</>
									}
								</Button>
							</div>
						</li>
					})
				}
			</ul>
		</div>
	</Layout>
}