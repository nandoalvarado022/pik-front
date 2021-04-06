import React from 'react'
import Button from '@material-ui/core/Button'

import './style.module.scss'

const Jmaury = () => {
    return (
        <div className="flex">
            <button className="btn1" >Botón 1</button>
            <button className="btn2">Botón 2</button>
            <button className="btn3">Botón 3</button>
            <Button variant="outlined" color="primary">Enviar</Button>
        </div>
    )
}

export default Jmaury