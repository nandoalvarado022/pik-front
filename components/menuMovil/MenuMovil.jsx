import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPercentage } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { useState } from "react"
import ImageProfile from "../../pages/perfil/ImageProfile"
import { PreviewUser } from "../previewUser/PreviewUser"
import UserNotifications from "../userNotifications/UserNotifications"
import styles from "./menuMovil.module.scss"

const MenuMovil = () => {
  const [isOpenPreviewProfile, setIsOpenPreviewProfile] = useState(false)
  return <div className={styles.MenuMovil}>
    <ol>
      <Link href="/publicacion/crear" as="/publicacion/crear">
        <a className={styles.vender}>
          Vender
        </a>
      </Link>
    </ol>
    <ol>
      <FontAwesomeIcon className={styles.bell} icon={faPercentage} />
    </ol>
    <ol onClick={() => setIsOpenPreviewProfile(!isOpenPreviewProfile)}>
      <Link href="/perfil" as="/perfil">
        <a>
          <ImageProfile />
        </a>
      </Link>
    </ol>
    <ol>
      <UserNotifications />
    </ol>
    <ol>
      <a target="_BLANK" href="https://api.whatsapp.com/send?phone=573052665725&text=Escribe%20aqu%C3%AD%20tu%20pregunta">
        <button className={styles["btn-whatsapp"]}>
          <img src="/images/icons/whatsapp.png" alt="Hablar con un asesor vía Whatsapp" />
        </button>
        {/* <label>Ayuda</label> */}
      </a>
    </ol>
  </div>
}

export default MenuMovil