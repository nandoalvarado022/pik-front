import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell, faTimesCircle } from "@fortawesome/free-regular-svg-icons"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect, useState } from 'react'
import { PikContext } from "../../states/PikState"
import styles from "./styles.module.scss"
import { gql, useMutation } from '@apollo/client'

const UserNotifications = () => {
  const context = useContext(PikContext)
  const notifications = context.notifications
  const [isOpenNotifications, setIsOpenNotifications] = useState(false)
  const DELETE_NOTIFICATION = gql`
	mutation deleteNotification($id: Int){
		deleteNotification(id: $id)
	}`

  const [deleteNotificationGraph] = useMutation(DELETE_NOTIFICATION);

  const reclamarCoins = (coins, idNotification) => {
    context.customDispatch({ type: "RECLAMAR_COINS", payload: { coins } })
    deleteNotification(idNotification)
  }

  const deleteNotification = (idNotification) => {
    const _notifications = notifications.filter(item => item.id != idNotification)
    deleteNotificationGraph({ variables: { id: idNotification } })
    context.customDispatch({ type: "CHANGE_PROPERTY", payload: { property: "notifications", value: _notifications } })
  }

  return <li className={styles.UserNotifications}>
    <button onClick={() => setIsOpenNotifications(!isOpenNotifications)}>
      <FontAwesomeIcon className={styles.bell} icon={faBell} />
      <span className={styles.notyQuantity}>
        {notifications.length}
      </span>
    </button>
    <ul className={`${isOpenNotifications ? styles.actived : null}`}>
      {notifications && notifications.map(({ coins, detail, id }) => <ol>
        {!!coins && <span>{coins} &nbsp; X &nbsp; <img className={styles.coin} src="/images/gifs/coin.png" /></span>}
        <span>&nbsp; {detail}</span>
        {!!coins && <button onClick={() => { reclamarCoins(coins, id) }}>Reclamar</button>}
        <div className={styles.content_close}>
          <FontAwesomeIcon onClick={() => deleteNotification(id)} icon={faTimes} />
        </div>
      </ol>
      )}
      {notifications.length < 1 && <ol>
        <span>No tienes notificaciones 😯</span>
      </ol>}
    </ul>
  </li>
}

export default UserNotifications