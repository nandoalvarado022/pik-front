import Layout from "../../components/layout/Layout"
import Transacciones from "../../components/transacciones/Transacciones"

const TransaccionesContainer = () => {
  const url = "https://pikajuegos.com/transacciones"
  const meta_title = "Pikajuegos | Mis Transacciones"
  const descripcion = "Pikajuegos | Mis Transacciones"
  return <Layout meta_url={url} meta_descripcion={descripcion} meta_title={meta_title} title={meta_title}>
    <Transacciones />
  </Layout>
}

export default TransaccionesContainer