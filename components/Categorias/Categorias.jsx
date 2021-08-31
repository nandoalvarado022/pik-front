import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import React, { useContext, useState } from "react"
import Link from "next/link"
import Router from "next/router"
import Login from "../login/Login"
import styles from "./categorias.module.scss"
import { getCategories, slugify } from "../../lib/utils"
import { PreviewUser } from "../previewUser/PreviewUser"
import { PikContext } from '../../states/PikState'
import UserNotifications from '../userNotifications/UserNotifications'
import ImageProfile from '../../pages/perfil/ImageProfile'

const Categorias = ({ scroll }) => {
  const [isOpenPreviewProfile, setIsOpenPreviewProfile] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const picture = typeof localStorage != "undefined" && localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).picture
  const context = useContext(PikContext)
  return <div className={styles.Categorias}>
    <ul>
      {/* <li filter="game">
        <Link scroll={scroll} href="/">
          Ver todo
        </Link>
      </li> */}
      <li className={styles["crear-publicacion"]} >
        <Link href="/publicacion/crear" as="/publicacion/crear">
          <a>
            {/* <img src="/images/icons/mas.svg" alt="Crear publicacion" /> */}
            Vender
          </a>
        </Link>
      </li>
      {
        getCategories().map((category) => {
          const image = category.image ? category.image : "/images/icons/" + category.id + ".png"
          return <li filter="game">
            <Link scroll={scroll} href="/category/[id]" as={"/category/" + slugify(category.name)}>
              <a>
                <img src={image} alt={category.name} />
                {category.name}
              </a>
            </Link>
          </li>
        })
      }

      {/* <li filter="game">
        <Link scroll={scroll} href="/category/[id]" as="/category/suscripciones">
          <a>
            <img src="/images/icons/subscription.png" alt="suscripciones" />
            Subscripciones
          </a>
        </Link>
      </li>
      <li filter="game">
        <Link scroll={scroll} href="/category/[id]" as="/category/nintendo">
          <a>
            <img src="/images/icons/nintendo-switch.png" alt="nintendo (switch)" />
            Nintendo (Switch)
          </a>
        </Link>
      </li>
      <li filter="game">
        <Link scroll={scroll} href="/category/[id]" as="/category/playstation">
          <a>
            <img src="/images/icons/ps4.png" alt="playstation" />
            Playstation
          </a>
        </Link>
      </li>
      <li filter="game">
        <Link scroll={scroll} href="/category/[id]" as="/category/microsoft">
          <a>
            <img src="/images/icons/xbox.png" alt="Microsoft (PC, XBOX)" />
            Microsoft (PC, XBOX)
          </a>
        </Link>
      </li>
      <li filter="game">
        <Link scroll={scroll} href="/category/[id]" as="/category/otros">
          <a>
            Otros
          </a>
        </Link>
      </li>
      */}
      {
        typeof localStorage != "undefined" && localStorage.getItem("user") ? <React.Fragment>
          <li className={styles.perfil} onClick={() => setIsOpenPreviewProfile(!isOpenPreviewProfile)} title={`Nivel actual ${context.user.category}`}>
            <ImageProfile />
            {/* Perfil <FontAwesomeIcon className={`${styles.arrow} ${isOpenPreviewProfile ? styles.actived : null}`} icon={faArrowDown} /> */}
            <PreviewUser {...{ isOpenPreviewProfile }} />
          </li>
        </React.Fragment>
          :
          <Login />
      }
      <UserNotifications />
    </ul>
  </div >
}

export default Categorias