// Descripción: Notificaciones generales en la aplicacion

import React, { useContext } from "react"
import { useState } from "react"
import { PikContext } from "../../states/PikState"
import styles from "./notificacion.module.scss"

const Notification = ({ }) => {
    const context = useContext(PikContext)
    const isOpen = context.messageModal.id == "empty" ? false  : true
    const { id = null, message: htmlMessage = null } = context?.messageModal
    const handleClose = () => {
        context.customDispatch({ type: "SET_MESSAGE", payload: null })
    }
    const isNotificationChecked = context.checkedNotifications && !context.checkedNotifications.find(item => item == id)

    return <div className={`${styles.Notificacion} ${(isOpen && isNotificationChecked) && styles.active} ID-${id}`}>
        <div className={styles.bg}></div>
        <div className={styles.content}>
            {htmlMessage}
            <div className={styles.close} onClick={handleClose}>Cerrar</div>
        </div>
    </div>
}

export default Notification