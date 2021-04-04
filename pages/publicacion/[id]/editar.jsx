import PublicationForm from '../../../components/publicationForm/PublicationForm'
import Layout from '../../../components/layout/Layout'
import Categorias from '../../../components/categorias/Categorias'

const PageCrearPublicacion = () => {
  return (
    <Layout title="Crear publicación" meta_title="Crear publicación en club2ruedas.com" meta_url="https://club2ruedas.com/publicacion/crear">
      <Categorias />
      <PublicationForm />
    </Layout>
  )
}

export default PageCrearPublicacion