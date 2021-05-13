
import React from "react"
import Link from "next/link"
import Router from "next/router"
import Login from "../login/Login"
import styles from "./categorias.module.scss"
import { getCategories, slugify } from "../../lib/utils"

const Categorias = ({ scroll }) => {
  const picture = typeof localStorage != "undefined" && localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).picture
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
          <li>
            <Link href="/publicaciones" as="/publicaciones">
              <a>Mis publicaciones</a>
            </Link>
          </li>
          <li className={styles.logout}>
            <Link href="/perfil" as="/perfil">
              <a className={styles.perfil}>
                <span className={styles.picture} style={{ "background-image": `url(${picture})` }} />
                Perfil
              </a>
            </Link>
          </li>
        </React.Fragment>
          :
          <Login />
      }
    </ul>
  </div >
}

export default Categorias