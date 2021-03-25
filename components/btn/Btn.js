// Prop className: green, blue, small

import React from 'react'
import './btn.scss'
import Button from '@material-ui/core/Button'

export default function Btn({ blockClick, className, text, onClick, databutton }) {
    return (
        <Button databutton={databutton} onClick={blockClick ? null : onClick} className={"btn " + className}>
            <span className="text">{text}</span>
        </Button>
    )
}