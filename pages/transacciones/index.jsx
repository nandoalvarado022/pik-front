import Layout from "../../components/layout/Layout"
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { useContext, useEffect, useState } from "react"
import { PikContext } from "../../states/PikState"
import styles from "./styles.module.scss"
import moment from "moment"

moment.locale('es')

const TransaccionesContainer = () => {
  const url = "https://pikajuegos.com/transacciones"
  const meta_title = "Pikajuegos | Mis Transacciones"
  const descripcion = "Pikajuegos | Mis Transacciones"
  return <Layout meta_url={url} meta_descripcion={descripcion} meta_title={meta_title} title={meta_title}>
    <Transacciones />
  </Layout>
}

const Transacciones = () => {
  const [transactions, setTransactions] = useState([])
  const context = useContext(PikContext)
  // Mutation confirmar transacción
  const MUTATION_TRANSACTION = gql`
  mutation transactionConfirmed($id: Int){
      transactionConfirmed(id: $id)
  }`
  const [dispatchConfirmarTransaccion, { }] = useMutation(MUTATION_TRANSACTION, {
    onCompleted() {
      getTransactions()
      dispatchCreateNotification({ variables: { user: context.user.id, detail: "Han confirmado una transaccion", coins: 2 } })
    }
  });
  // Mutation crear notificación
  const MUTATION_NOTIFICATION = gql`
  mutation createNotification($user: Int, $detail: String, $coins: Int){
      createNotification(user: $user, detail: $detail, coins: $coins)
  }`
  const [dispatchCreateNotification, { }] = useMutation(MUTATION_NOTIFICATION, {
    onCompleted() {
      context.gettingNotifications()
    }
  });
  // Query transacciones
  const GET_TRANSACTIONS = gql`
  query getTransactions($user: Int){
    getTransactions(user: $user){
      created
      detail
      id
      status
      type
      type
      u_name
      user
    }
  }`
  const [getTransactions] = useLazyQuery(GET_TRANSACTIONS, { // Obteniendo notificaciones
    fetchPolicy: "no-cache",
    variables: {
      user: context.user.id
    },
    onCompleted: ({ getTransactions }) => {
      setTransactions(getTransactions)
    }
  })
  //

  useEffect(() => {
    getTransactions()
  }, [])

  const handleConfirmarTransaccion = (id) => {
    dispatchConfirmarTransaccion({ variables: { id } });
  }

  return <div>
    <ul className={`${styles.Transactions} Card`}>
      {transactions && transactions.map(({ created, detail, id, status, type, u_name, user }) => <ol style={{ display: "flex" }}>
        <div>
          <div className={styles.id}>ID</div>
          {id}
        </div>
        <div>
          <div className={styles.user}>Usuario</div>
          {u_name}
        </div>
        <div>
          <div className={styles.type}>Tipo</div>
          {type}
        </div>
        <div>
          <div className={styles.detail}>Detalles</div>
          {detail}
        </div>
        <div>
          <div className={styles.type}></div>
          {type}
        </div>
        <div>
          <div className={styles.status}>Estado</div>
          {status == 0 && "En conversación"}
          {status == 1 && "Transacción realizada y confirmada"}
          {status == 2 && "Transacción cancelada"}
        </div>
        <div>
          <div className={styles.created}>
            Fecha
          </div>
          <div>
            {moment(parseInt(created)).format("MMMM DD YYYY, h:mm:ss a")}
          </div>
        </div>
        <div className={styles.actions}>
          {status == 0 && <button onClick={() => handleConfirmarTransaccion(id)}>Confirmar transacción</button>}
        </div>
      </ol>
      )}
    </ul>
  </div>
}

export default TransaccionesContainer