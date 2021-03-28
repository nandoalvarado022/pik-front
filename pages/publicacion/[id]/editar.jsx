import PublicationForm from '../../../components/publicationForm/PublicationForm'
import Layout from '../../../components/layout/Layout'

const PageCrearPublicacion = () => {
  return (
    <Layout title="Crear publicación" meta_title="Crear publicación en club2ruedas.com" meta_url="https://club2ruedas.com/publicacion/crear">
      <div id="_crearPublicacion">
        <PublicationForm />
      </div>
    </Layout>
  )
}

export default PageCrearPublicacion