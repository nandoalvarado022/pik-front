import React from "react"
import { useState } from "react"
import styles from "./notificacion.module.scss"

const Notification = ({ message }) => {
    const [showNotification, setShowNotification] = useState(true)
    const handleClose = () => {
        setShowNotification(false)
    }

    return <React.Fragment>
        {
            showNotification && <div className={styles.Notificacion}>
                <img src="" alt="" />
                {message}
                <div className={styles.close} onClick={handleClose}>Cerrar</div>
            </div>
        }
    </React.Fragment>
}

export default Notification