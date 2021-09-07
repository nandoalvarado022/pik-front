import Link from "next/link"
import { useContext } from "react"
import { PikContext } from "../../states/PikState"
import styles from "./holaJuanito.module.scss"

const HolaJuanito = () => {
    const context = useContext(PikContext)
    const name = context.user.name ? context.user.name : "Invitado"

    return <div className={styles.HolaJuanito}>
        <div className="content">
            <div className={styles.banners}>
                <div className={`Card ${styles.texts}`}>
                    <div className={`${styles.text1} font-c`}>
                        Hola,
                        <div>
                            <b className="font-a">{name}</b>
                        </div>
                    </div>
                    <div className={`${styles.text2} font-c`}>
                        Recuerda que puedes confiar <span style={{ color: "green" }}>100%</span> en los aliados de <b>PikaPlay</b>.
                        Entregamos garantia por las compras que hagas a nuestros aliados certificados así que no te preocupes por estafas en tus compras.

                        {context.user.id && <p>
                            <Link href="/perfil"><i>Puedes completar tu perfil aquí</i></Link>
                        </p>}
                    </div>
                </div>
                <ol>
                    <Link href="/publicacion/[id]" as="/publicacion/bandeja-paisa-prueba-384">
                        <a>
                            <img src="/images/banners/1.jpg" alt="" />
                        </a>
                    </Link>
                </ol>
                <ol>
                    <Link href="/publicacion/[id]" as="/publicacion/bandeja-paisa-prueba-384">
                        <a>
                            <img src="/images/banners/2.jpg" alt="" />
                        </a>
                    </Link>
                </ol>
                <ol>
                    <Link href="/publicacion/[id]" as="/publicacion/bandeja-paisa-prueba-384">
                        <a>
                            <img src="/images/banners/3.jpg" alt="" />
                        </a>
                    </Link>
                </ol>
            </div>
        </div>
    </div >
}

export default HolaJuanito