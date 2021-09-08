import moment from "moment"
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { useContext, useEffect, useState } from "react"
import { PikContext } from "../../states/PikState"
import styles from "./styles.module.scss"
// import pagar from "./scriptPagarTransaccion.jsx";

moment.locale('es')

const Transacciones = () => {
  const [transactions, setTransactions] = useState([])
  const context = useContext(PikContext)
  // Mutation confirmar transacción
  const TRANSACTION_CONFIRMED = gql`
    mutation transactionConfirmed($id: Int){
      transactionConfirmed(id: $id)
    }`
  const [transactionConfirmed, { }] = useMutation(TRANSACTION_CONFIRMED, {
    onCompleted() {
      getTransactions()
    }
  });
  // Mutation crear notificación
  const MUTATION_NOTIFICATION = gql`
    mutation createNotification($user: Int, $detail: String, $coins: Int){
        createNotification(user: $user, detail: $detail, coins: $coins)
    }`
  const [createNotification, { }] = useMutation(MUTATION_NOTIFICATION, {
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
        user_to
      }
    }`
  const [getTransactions] = useLazyQuery(GET_TRANSACTIONS, { // Obteniendo notificaciones
    fetchPolicy: "no-cache",
    variables: {
      user: context.user.id
    },
    onCompleted: ({ getTransactions }) => {
      const _transactions = getTransactions && getTransactions.map(t => {
        if (t.type == "Compra" && t.user_to == context.user.id) {
          t.type = "Venta"
        }
        return t
      })
      setTransactions(_transactions)
    }
  })
  //

  useEffect(() => {
    getTransactions()
  }, [])

  const handlePagarTransaccion = (id) => {
    window.open("https://checkout.wompi.co/l/ZCdlVO")
    // pagar({ idTransaccion: id })
  }

  const handleConfirmarTransaccion = (id) => {
    transactionConfirmed({ variables: { id } });
  }

  return <div>
    <ul className={`${styles.Transactions} Card`}>
      {transactions && transactions.map(({ created, detail, id, status, type, u_name, user }) => <ol style={{ display: "flex" }}>
        <div>
          <div className={styles.id}>ID</div>
          #{id}
        </div>
        <div>
          <div className={styles.user}><b>Usuario</b></div>
          {u_name}
        </div>
        <div>
          {type}
        </div>
        <div>
          <div className={styles.detail}><b>Detalles</b></div>
          {detail}
        </div>
        <div>
          <div className={styles.status}>
            <b>Estado</b></div>
          {status == 0 && "En conversación"}
          {status == 1 && "Transacción realizada y confirmada"}
          {status == 2 && "Transacción cancelada"}
        </div>
        <div>
          <div>
            {moment(parseInt(created)).format("MMMM DD YYYY, h:mm:ss a")}
          </div>
        </div>
        <div className={styles.actions}>
          {type == "Venta" && status == 0 && <button onClick={() => handleConfirmarTransaccion(id)}>Confirmar transacción</button>}
          {type == "Venta" && status == 0 && <button onClick={() => handleConfirmarTransaccion(id)} title="El cliente podrá pagar en linea">Habilitar pago en linea</button>}
          {type == "Compra" && status == 0 && <button onClick={() => handlePagarTransaccion(id)}>Pagar</button>}
        </div>
      </ol>
      )}
    </ul>
  </div>
}

export default Transacciones