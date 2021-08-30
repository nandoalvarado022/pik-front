// Descripción: Notificaciones generalesen la aplicacion

import React from "react"
import { useState } from "react"
import styles from "./notificacion.module.scss"

const Notification = ({ message, isOpen, setIsOpen }) => {
    return <React.Fragment>
        {
            <div className={`${styles.Notificacion} ${isOpen && styles.active}`}>
                <div className={styles.content}>
                    {/* <div dangerouslySetInnerHTML={{ __html: message }} /> */}
                    {message}
                    <div className={styles.close} onClick={() => setIsOpen(!isOpen)}>Cerrar</div>
                </div>
            </div>
        }
    </React.Fragment>
}

export default Notification