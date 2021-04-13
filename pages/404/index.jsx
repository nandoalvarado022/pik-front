import Link from "next/link"
import Button from "../../components/button/Button"
import Layout from "../../components/layout/Layout"

const Page404 = () => {
  return <Layout meta_image="" meta_title="404" title="404" descripcion="Pagina no encontrada" meta_url="404">
    <p>No se encontro la página</p>
    <Link href="/">
      <Button color="blue">
        Ver productos
      </Button>
    </Link>
  </Layout>
}

export default Page404