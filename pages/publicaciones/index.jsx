import Layout from '../../components/layout/Layout'
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import Router from 'next/router'
import Categorias from '../../components/categorias/Categorias'
import Card from '../../components/card/Card'
import styles from './publicaciones.module.scss'
import Button from '../../components/button/Button'
import { useEffect } from 'react'

export default function MyPublications(props) {
	const phone = typeof window != "undefined" ? JSON.parse(localStorage.getItem("user")).phone : null
	const UPDATE_MUTATION = gql`
	mutation ChangeStatePublication($id: Int!, $status: Boolean!){
		changeStatePublication(id: $id, status: $status)
	}`


	const [changeStatePublication, { loading: loadingUpdate }] = useMutation(UPDATE_MUTATION);

	const PUBLICATIONS_QUERY = gql`
	query Publications($phone: String){
		publications(phone: $phone){
			id
			image_link
			slug
			title
			sale_price
			status
		}
	}`

	const [getPublications, { loading: loadingPublications, error, data: reqPublications }] = useLazyQuery(PUBLICATIONS_QUERY, {
		variables: { phone }
		// fetchPolicy: "network-only"
	})

	const handleDesactive = (id, status) => {
		changeStatePublication({
			variables: { id, status }
		});
		getPublications()
	}

	const handleEdit = (slug) => {
		Router.push("/publicacion/" + slug + "/editar")
	}

	useEffect(() => {
		getPublications()
		return () => {
			getPublications()
		}
	}, [])

	return <Layout title="Crear publicación" meta_title="Crear publicación en club2ruedas.com" meta_url="https://club2ruedas.com/publicacion/crear">
		<div>
			<Categorias scroll={false} />
			<div className={styles.content}>
				{
					reqPublications && reqPublications.publications.map((item, ind) => {
						return <div className={`${styles["wrapper-card"]} ${item.status ? '' : styles.disabled}`}>
							<Card key={item.id} {...item} />
							<div className={styles.actions}>
								<Button onClick={() => handleEdit(item.slug)} color="blue">Editar</Button>
								<Button onClick={() => handleDesactive(item.id, !item.status)} color="red">
									{
										item.status == true ? <>Desactivar</> : <>Activar</>
									}
								</Button>
							</div>
						</div>
					})
				}
			</div>
		</div>
	</Layout >
}