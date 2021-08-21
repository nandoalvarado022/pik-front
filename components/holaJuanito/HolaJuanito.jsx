import styles from "./holaJuanito.module.scss";

const HolaJuanito = () => {
    const frases = [
        "Recuerda que solo tienes 1 publicacion al día, aprovechala compartiendo consejos, ganar puntos y redimirlos 🛍",
        "Reducir la velocidad al acercarse a transportes escolares o cualquier vehículos que se hayan detenido",
        "Reducir la velocidad si hay trabajos en la vía",
    ]

    return <div className={styles.HolaJuanito}>
        <div className="content">
            <div className={styles.texts}>
                <div className={`${styles.text1} font-c`}>
                    Hola,
                    <div>
                        <b className="font-a">Nando</b>
                    </div>
                </div>
                <div className={`${styles.text2} font-c`}>
                    Recuerda que puedes confiar en los aliados de Pikajuegos al 100%. Entregamos garantia de los aliados certificados así que no te preocupes por estafaas en tus compras.
                </div>
            </div>
            {/* <div className={styles.categories}>
                <ol>
                    <span>
                        Playstation
                    </span>
                </ol>
                <ol>
                    <span>
                        XBOX
                    </span>
                </ol>
                <ol>
                    <span>
                        Switch
                    </span>
                </ol>
            </div> */}
            {/* <img src="/images/general/chica_motera.png" alt="" /> */}
        </div>
    </div >
}

export default HolaJuanito