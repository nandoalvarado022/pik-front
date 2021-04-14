import Link from "next/link"
import Router from "next/router"
import Login from "../login/Login"
import style from "./categorias.module.scss"

const handleLogout = () => {
  localStorage.removeItem("user")
  localStorage.removeItem("token")
  Router.push("/?logout")
}

const Categorias = ({ scroll }) => {
  return <div className={style.Categorias}>
    <ul>
      <li filter="game">
        <Link scroll={scroll} href="/">
          Ver todo
        </Link>
      </li>
      <li filter="game">
        <Link scroll={scroll} href="/category/[id]" as="/category/accesorios">
          <a>
            <img src="/images/icons/accesories.png" alt="accesorios" />
            Accesorios
          </a>
        </Link>
      </li>
      <li filter="game">
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
      <li className={style["crear-publicacion"]}>
        <Link href="/publicacion/crear" as="/publicacion/crear">
          <a>
            <b>¡Crear Publicación!</b>
          </a>
        </Link>
      </li>
      {
        typeof localStorage != "undefined" && localStorage.getItem("user") ? <>
          <li>
            <Link href="/publicaciones" as="/publicaciones">
              <a>Mis publicaciones</a>
            </Link>
          </li>
          <li className={style.logout} onClick={handleLogout}>
            <a>
              Salir
            </a>
          </li>
        </>
          :
          <Login />
      }
    </ul>
  </div>
}

export default Categorias