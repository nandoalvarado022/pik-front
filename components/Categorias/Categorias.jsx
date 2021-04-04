import Link from "next/link"
import Router from "next/router"
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
            <img src="/images/icons/accesories.png" alt="" />
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
        <Link scroll={scroll} href="/category/[id]" as="/category/switch">
          <a>
            <img src="/images/icons/nintendo-switch.png" alt="switch" />
            Switch
          </a>
        </Link>
      </li>
      <li filter="game">
        <Link scroll={scroll} href="/category/[id]" as="/category/ps5">
          <a>
            <img src="/images/icons/ps5.png" alt="ps5" />
            PS5
          </a>
        </Link>
      </li>
      <li filter="game">
        <Link scroll={scroll} href="/category/[id]" as="/category/ps4">
          <a>
            <img src="/images/icons/ps4.png" alt="ps4" />
            PS4
          </a>
        </Link>
      </li>
      <li filter="game">
        <Link scroll={scroll} href="/category/[id]" as="/category/ps3">
          <a>
            <img src="/images/icons/ps3.png" alt="ps3" />
            PS3
          </a>
        </Link>
      </li>
      <li filter="game">
        <Link scroll={scroll} href="/category/[id]" as="/category/xbox">
          <a>
            <img src="/images/icons/xbox.png" alt="xbox" />
            XBOX
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
        typeof localStorage != "undefined" && localStorage.getItem("user") && <>
          <li>
            <Link href="/publicaciones" as="/publicaciones">
              <a>Mis publicaciones</a>
            </Link>
          </li>
          <li className={style.logout} onClick={handleLogout}>
            Salir
        </li>
        </>
      }
    </ul>
  </div>
}

export default Categorias