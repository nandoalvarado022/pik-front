import { Input, TextField } from "@material-ui/core"
import Button from "../../components/button/Button"
import CiudadControl from "../../components/ciudadControl/CiudadControl"
import Insignias from "../../components/insignias"
import Coins from "../../components/previewUser/Coins"
import { format_number } from "../../lib/utils"
import ImageProfile from "./ImageProfile"
import styles from "./perfil.module.scss"

const Interface = ({ userData, isSaving, handleSave, handleLogout, setUserData }) => {
    return <section className={styles.perfil}>
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

        <div className={`Card ${styles.imageAndLevel}`}>
            <label>{userData?.category}</label>
            <ImageProfile {...{ userData }} />
            <div className={styles.level}>
                <Coins />
            </div>
        </div>

        {/* <div className="Card">
            <b className="title">Insignias</b>
            <Insignias />
        </div> */}
    </section>
}

export default Interface