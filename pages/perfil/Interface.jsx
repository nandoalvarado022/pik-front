import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons"
import { Input, TextField } from "@material-ui/core"
import { useState } from "react"
import Button from "../../components/button/Button"
import CiudadControl from "../../components/ciudadControl/CiudadControl"
import Insignias from "../../components/insignias"
import Coins from "../../components/previewUser/Coins"
import { format_number } from "../../lib/utils"
import ImageProfile from "./ImageProfile"
import Notification from "../../components/notification"
import styles from "./perfil.module.scss"

const Interface = ({ userData, isSaving, handleSave, handleLogout, setUserData }) => {
    const [message, setMessage] = useState({})
    return <section className={styles.perfil}>
        <Notification isOpen={!!message?.message} message={message} />
        <h2 style={{ textAlign: "center" }}>
            Perfil
            <FontAwesomeIcon style={{ float: "right" }} icon={faQuestionCircle} onClick={() => {
                setMessage({
                    id: 0, message: <div>
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
                })
            }} />
        </h2>

        <div className={styles.content}>
            <div className={`Card ${styles.imageAndLevel}`}>
                <label>{userData?.category}</label>
                <ImageProfile {...{ userData }} />
                <div className={styles.coins}>
                    <Coins />
                </div>
            </div>

            <div className="Card">
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
        </div>

        {/* <div className="Card">
            <b className="title">Insignias</b>
            <Insignias />
        </div> */}
    </section>
}

export default Interface