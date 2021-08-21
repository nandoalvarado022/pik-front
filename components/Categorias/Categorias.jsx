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

const Categorias = ({ scroll }) => {
  const [showPreview, setShowPreview] = useState(false)
  const picture = typeof localStorage != "undefined" && localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).picture
  const context = useContext(PikContext)
  return <div className={styles.Categorias}>
    <ul>
      <li filter="game">
        <Link scroll={scroll} href="/">
          Ver todo
        </Link>
      </li>
      {
        getCategories().map((category) => <li filter="game">
          <Link scroll={scroll} href="/category/[id]" as={"/category/" + slugify(category.name)}>
            <a>
              <img src={"/images/icons/" + category.id + ".png"} alt={category.name} />
              {category.name}
            </a>
          </Link>
        </li>)
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
      <li className={styles["crear-publicacion"]}>
        <Link href="/publicacion/crear" as="/publicacion/crear">
          <a>
            <b>¡Crear Publicación!</b>
          </a>
        </Link>
      </li>
      {
        typeof localStorage != "undefined" && localStorage.getItem("user") ? <React.Fragment>
          <li className={styles.logout}>
            <a className={styles.perfil} onClick={() => context.dispatch({ type: "IS_OPEN_PREVIEW_PROFILE", payload: !context.isOpenPreviewProfile }) /*setShowPreview(!showPreview)*/}>
              <span className={styles.picture} style={{ "background-image": `url(${picture})` }} />
              Perfil <FontAwesomeIcon className={`${styles.arrow} ${showPreview ? styles.actived : null}`} icon={faArrowDown} />
            </a>
            <PreviewUser {...{ showPreview }} />
          </li>
        </React.Fragment>
          :
          <Login />
      }
    </ul>
  </div >
}

export default Categorias