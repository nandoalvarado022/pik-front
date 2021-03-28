import Layout from '../components/layout/Layout'
import { useQuery, gql } from '@apollo/client'
import Router from 'next/router'
import '../scss/publicaciones.scss'

export default function MyPublications(props) {
	const publicationsQuery = gql`
		query Publications($phone: String){
			publications(phone: $phone){
				title
				slug
			}
		}`

	const { loading, error, data: reqPublications } = useQuery(publicationsQuery, {
		variables: { phone: "3187414972" }
	})

	const handleEditar = (slug) => {
		Router.push("/publicacion/" + slug + "/editar")
	}

	return <Layout title="Crear publicación" meta_title="Crear publicación en club2ruedas.com" meta_url="https://club2ruedas.com/publicacion/crear">
		<div id="_MisPublicaciones">
			<div className="content">
				<div className="Card">
					{
						reqPublications && reqPublications.publications.map(item => {
							return <div>
								{item.title}
								<button onClick={() => handleEditar(item.slug)}>Editar</button>
								<button>Desactivar</button>
							</div>
						})
					}
				</div>
			</div>
		</div>
	</Layout>
}