import Categorias from '../../components/categorias/Categorias'
import Layout from '../../components/layout/Layout'
import PublicationForm from '../../components/publicationForm/PublicationForm'

const PageCrearPublicacion = () => {
  return (
    <Layout title="Crear publicación" meta_title="Crear publicación en club2ruedas.com" meta_url="https://club2ruedas.com/publicacion/crear">
      <div id="_crearPublicacion">
        <Categorias />
        <PublicationForm />
      </div>
    </Layout>
  )
}

export default PageCrearPublicacion