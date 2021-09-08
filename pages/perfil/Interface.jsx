import { scrollTo } from 'scroll-js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuestionCircle, faUser, faNewspaper, faBell } from "@fortawesome/free-regular-svg-icons"
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons"
import { TextField } from "@material-ui/core"
import { useContext } from "react"
import Button from "../../components/button/Button"
import CiudadControl from "../../components/ciudadControl/CiudadControl"
import Coins from "../../components/previewUser/Coins"
import ImageProfile from "./ImageProfile"
import styles from "./perfil.module.scss"
import { PikContext } from "../../states/PikState"
import UserNotifications from "../../components/userNotifications/UserNotifications"
import Transacciones from '../../components/transacciones/Transacciones'
import Publicaciones from '../../components/publicaciones/Publicaciones'

const Interface = ({ userData, isSaving, handleSave, handleLogout, setUserData }) => {
    const context = useContext(PikContext)
    const goTo = (value) => {
        const top = document.body.getElementsByClassName(value)[0].offsetTop
        scrollTo(window, { top }).then(() => { })
    }

    return <section className={styles.perfil}>
        <h2>
            Perfil
            <FontAwesomeIcon className="svg-question" icon={faQuestionCircle} onClick={() => {
                const htmlMessage = <div>
                    <h2>Perfil</h2>
                    <p>
                        <h3>Coins</h3>
                        <p>En Pikajuegos te premiamos por cada cosa que haces, por eso cada vez que realices una venta recibiras 1 moneda</p>
                    </p>
                    <p>
                        Puedes comprar el pase ORO el cual es una suscripcion mensual que te otorga los siguientes beneficios:
                        <ul>
                            <ol>No tienes límite de publicaciones diarias</ol>
                            <ol>Con el pase ORO puedes participar en <b>todos</b> sorteos que hacemos vía instagram</ol>
                        </ul>
                    </p>
                    <p>🤝 Juntos somos mejor</p>
                </div>
                const message = { id: "perfil", message: htmlMessage }
                context.customDispatch({ type: "SET_MESSAGE", payload: { message } })
            }} />
        </h2>

        <div className={styles.tabs}>
            <ol className={styles.active}>
                <FontAwesomeIcon icon={faUser} onClick={() => goTo("profile-content")} />
            </ol>
            <ol>
                <FontAwesomeIcon icon={faBell} onClick={() => goTo("notifications-content")} />
            </ol>
            <ol>
                <FontAwesomeIcon icon={faNewspaper} onClick={() => goTo("publications-content")} />
            </ol>
            <ol>
                <FontAwesomeIcon icon={faShoppingBasket} onClick={() => goTo("transactions-content")} />
            </ol>
        </div>

        <div className={styles.content}>
            <div className={`Card ${styles.imageAndLevel}`}>
                <label>{userData?.category}</label>
                <ImageProfile {...{ userData }} />
                <div className={styles.coins}>
                    <Coins />
                </div>
            </div>

            <div className="Card profile-content">
                <TextField fullWidth={true} label="Tú nombre o el nombre de tu tienda" margin="normal" value={userData?.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                <TextField fullWidth={true} label="Correo electrónico" margin="normal" value={userData?.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                <TextField disabled={true} fullWidth={true} label="Número registrado" margin="normal" value={userData?.phone} />
                <CiudadControl />
                <p>
                    <label>Cambiar imagen de perfil</label>
                    <div>
                        <input type='file' id="profileElement" />
                    </div>
                </p>
                <div className="f-r">
                    <Button color={!isSaving ? "blue" : "disabled"} onClick={handleSave}>
                        {isSaving ? "Gaurdando..." : "Guardar"}
                    </Button>
                    {/* <Button color="red" onClick={handleLogout}>Salir</Button> */}
                </div>
            </div>

            <div className="Card notifications-content">
                <h3>Notificaciones</h3>
                <UserNotifications />
            </div>

            <div className="Card publications-content">
                <h2>Publicaciones</h2>
                <Publicaciones />
            </div>

            <div className="Card transactions-content">
                <h2>Transacciones</h2>
                <Transacciones />
            </div>
        </div>
    </section>
}

export default Interface