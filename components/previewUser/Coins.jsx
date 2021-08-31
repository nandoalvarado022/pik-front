import { gql, useLazyQuery } from '@apollo/client'
import { useContext, useEffect, useState } from "react"
import { format_number } from "../../lib/utils"
import { PikContext } from "../../states/PikState"
import styles from "./coins.module.scss"

const Coins = () => {
  const context = useContext(PikContext)

  useEffect(() => {
    getCoins()
  }, [])

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
      const coins = getCoins ? getCoins.reduce((total, coin) => coin.value + total, 0) : 0
      setCoins(coins)
    }
  })

  return <div className={styles.Coins}>
    <img src="/images/icons/moneda2.svg" className={styles.coin} />
    <span className={`f-s-14 ${styles.number}`}>
      {format_number(context.coins)}
    </span>
  </div>
}


export default Coins