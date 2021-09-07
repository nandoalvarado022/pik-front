import Link from "next/link"
import React from "react"
import { useContext, useEffect, useState } from 'react'
import { handleLogout } from '../../lib/utils'
import { PikContext } from "../../states/PikState"
import Coins from './Coins'
import styles from "./styles.module.scss"
import UserNotifications from '../userNotifications/UserNotifications'

export const PreviewUser = ({ isOpenPreviewProfile }) => {
  const context = useContext(PikContext)
  return <div className={`${styles.PreviewUser} PreviewUser ${isOpenPreviewProfile ? styles.actived : null}`}>
    <UserNotifications />
    <ol>
      <Link href="/perfil" as="/perfil">
        <a>
          Mi cuenta<br />
          <Coins />
        </a>
      </Link>
    </ol>
    <ol>
      <Link href="/transacciones" as="/transacciones">
        Transacciones
      </Link>
    </ol>
    <ol>
      <Link href="/publicaciones" as="/publicaciones">
        <a>Mis publicaciones</a>
      </Link>
    </ol>
    <ol onClick={() => handleLogout()}>
      Salir
    </ol>
  </div>
}