import React from 'react'
import { Button as ButtonMat } from '@material-ui/core'
import styles from './button.module.scss'

export default function Button({ id, children, blockClick, color, className, onClick, databutton }) {
    return (
        <ButtonMat id={id} databutton={databutton} onClick={blockClick ? null : onClick} className={`${styles.btn} ${styles[color]}`}>
            <span className="text">{children}</span>
        </ButtonMat>
    )
}