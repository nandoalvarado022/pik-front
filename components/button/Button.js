import React from 'react'
import { Button as ButtonMat } from '@material-ui/core'
import styles from './button.module.scss'

export default function Button({ children, blockClick, color, className, onClick, databutton }) {
    return (
        <ButtonMat databutton={databutton} onClick={blockClick ? null : onClick} className={`${styles.btn} ${styles[color]}`}>
            <span className="text">{children}</span>
        </ButtonMat>
    )
}