import React from 'react'
import { Button as ButtonMat } from '@material-ui/core'
import styles from './button.module.scss'

export default function Button({ animation, id, children, blockClick, color, className, onClick, databutton }) {
    className = `${className} ${animation ? styles.animation : null}`
    return <ButtonMat id={id} databutton={databutton} onClick={blockClick ? null : onClick} className={`${styles.btn} ${styles[color]} ${className}`}>
        <span className={styles.text}>{children}</span>
    </ButtonMat>

}