import Layout from '../../components/layout/Layout'
import { useQuery, gql } from '@apollo/client'
import Router from 'next/router'
import Categorias from '../../components/categorias/Categorias'
import Card from '../../components/card/Card'
import styles from './publicaciones.module.scss'

export default function MyPublications(props) {
	const publicationsQuery = gql`
		query Publications($phone: String){
			publications(phone: $phone){
				image_link
				slug
				title
			}
		}`

	const { loading, error, data: reqPublications } = useQuery(publicationsQuery, {
		variables: { phone: "3187414972" }
	})

	const handleEditar = (slug) => {
		Router.push("/publicacion/" + slug + "/editar")
	}

	return <Layout title="Crear publicación" meta_title="Crear publicación en club2ruedas.com" meta_url="https://club2ruedas.com/publicacion/crear">
		<div>
			<Categorias scroll={false} />
			<div className={styles.content}>
				{
					reqPublications && reqPublications.publications.map(item => {
						return <div className={styles["wrapper-card"]}>
							<Card {...item} />
							<div className={styles.actions}>
								<button>Editar</button>
								<button>Desactivar</button>
							</div>
						</div>
					})
				}
			</div>
		</div>
	</Layout >
}