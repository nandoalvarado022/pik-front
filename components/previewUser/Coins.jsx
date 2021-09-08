import { gql, useLazyQuery } from '@apollo/client'
import { useContext, useEffect, useRef, useState } from "react"
import { format_number, loadAudio } from "../../lib/utils"
import { PikContext } from "../../states/PikState"
import styles from "./coins.module.scss"

const Coins = () => {
  const [isAnimate, setIsAnimate] = useState(false)
  const context = useContext(PikContext)
  const [coins, setCoins] = useState(0)
  const prevCountCoins = useRef()
  const [playSound, setPlaySound] = useState(false)

  useEffect(() => {
    prevCountCoins.current = coins;
  });

  const previousCoins = prevCountCoins.current ? prevCountCoins.current : 0

  useEffect(() => {
    getCoins()
  }, [])

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
      user: typeof localStorage != "undefined" && JSON.parse(localStorage.getItem("user")).id
    },
    onCompleted: ({ getCoins }) => {
      const coins = getCoins ? getCoins.reduce((total, coin) => coin.value + total, 0) : 0
      context.customDispatch({ type: "CHANGE_PROPERTY", payload: { property: "coins", value: coins } })
    }
  })

  const animate = () => {
    setIsAnimate(true)
    setTimeout(() => {
      setIsAnimate(false)
    }, 2000)
  }

  const animateValue = (start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // obj.innerHTML = Math.floor(progress * (end - start) + start);
      setCoins(Math.floor(progress * (end - start) + start))
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  useEffect(() => {
    animateValue(previousCoins, context.coins, 1000)
    animate()
    playSound && loadAudio("/audios/coin.wav")
    setPlaySound(true)
  }, [context.coins])

  return <div className={`${styles.Coins} ${isAnimate ? styles.animated : ""}`} onClick={animate}>
    <picture className={styles.coin} />
    {/* <span>
      {previousCoins}
    </span> */}
    <span className={`f-s-14 ${styles.number} number-coins`}>
      {format_number(coins)}
    </span>
  </div>
}

export default Coins