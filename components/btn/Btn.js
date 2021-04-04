import React from 'react'
import Button from '@material-ui/core/Button'
import './btn.module.scss'

export default function Btn({ blockClick, className, text, onClick, databutton }) {
    return (
        <Button databutton={databutton} onClick={blockClick ? null : onClick} className={"btn " + className}>
            <span className="text">{text}</span>
        </Button>
    )
}