import Badge from '@material-ui/core/Badge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser, faUsers, faBell, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import Router from 'next/router'
import WrapperConsumer from '../store'

const BottomNavbar = ({ context: { notificaciones = {}, scrollHeader } }) => {
    let cantidadNotificaciones = notificaciones.listado ? notificaciones.listado.length : 0
    const redireccionar = (e) => {
        /*document.querySelector("#view_BottomNavBar a.active") && document.querySelector("#view_BottomNavBar a.active").classList.remove("active")*/
        let target = e.currentTarget.getAttribute("target")/*
        const element = document.querySelector(`[target="${target}"]`)
        element.className += "active"*/
        if (target == '/perfil' && !localStorage.getItem('user')) target = '/login'
        setTimeout(() => {
            Router.push({ pathname: target, query: {} })
        }, 500)
    }

    return <div id="view_BottomNavBar" className={(scrollHeader ? 'scroll' : '')}>
        <img className='pais' src="/images/ciudades/colombia.jpg" alt="Colombia" title='Colombia'/>
        <button onClick={redireccionar} target="/">
            <FontAwesomeIcon icon={faHome} />
            <span className="font-b">Entérate</span>
        </button>

        <button onClick={redireccionar} target="/notificaciones">
            <Badge /*anchorOrigin={{vertical: 'bottom', horizontal: 'right',}}*/ color="secondary" badgeContent={cantidadNotificaciones}>
                <FontAwesomeIcon icon={faBell} />
            </Badge>
            <span className="font-b">
                Notificaciones
            </span>
        </button>

        <button onClick={redireccionar} target="/clubes">
            <FontAwesomeIcon icon={faUsers} />
            <span className="font-b">Clubes</span>
        </button>

        <button onClick={redireccionar} target='/perfil'>
            <FontAwesomeIcon icon={faUser} />
            <span className="font-b">
                Perfil
            </span>
        </button>
    </div>
}

export default WrapperConsumer(BottomNavbar)