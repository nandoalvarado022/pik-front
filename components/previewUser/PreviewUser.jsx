import { gql, useLazyQuery } from '@apollo/client'
import Link from "next/link"
import { useContext, useEffect, useState } from 'react'
import { PikContext } from "../../states/PikState"
import styles from "./styles.module.scss"

export const PreviewUser = ({ showPreview }) => {
  const context = useContext(PikContext)
  const [coins, setCoins] = useState([])
  const GET_COINS = gql`
	query getCoins($user: Int){
		getCoins(user: $user){
      id
      user
      detail
      value
      created
    }
	}`

  const [getCoins] = useLazyQuery(GET_COINS, {
    fetchPolicy: "no-cache",
    variables: {
      user: JSON.parse(localStorage.getItem("user")).id
    },
    onCompleted: ({ getCoins }) => {
      const coins = getCoins.reduce((total, coin) => coin.value + total, 0)
      setCoins(coins)
    }
  })

  useEffect(() => {
    getCoins()
  }, [])

  return <div className={`${styles.PreviewUser} PreviewUser ${context.isOpenPreviewProfile ? styles.actived : null}`}>
    <ol>
      <Link href="/perfil" as="/perfil">
        Mi cuenta
      </Link>
    </ol>
    <ol>
      <Link href="/transacciones" as="/transacciones">
        Mis compras
      </Link>
    </ol>
    <ol>
      <Link href="/transacciones" as="/transacciones">
        Mis ventas
      </Link>
    </ol>
    <ol>
      <Link href="/transacciones" as="/transacciones">
        Mis cambios
      </Link>
    </ol>
    <ol>
      <Link href="/publicaciones" as="/publicaciones">
        <a>Mis publicaciones</a>
      </Link>
    </ol>
    <ol>
      <div className={styles.flex}>
        <span className={styles.number}>
          {context.coins}
        </span>
        <span>x</span>
        <picture className={styles.coin} />
      </div>
      <div className={styles.text} title="Aún estan en proceso las transacciones por las cuales ganastes estas monedas. Una vez se validen estas tus monedas se confirmaran">¡tienes 14 monedas <br />en espera!</div>
    </ol>
  </div>
}