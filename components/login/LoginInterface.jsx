import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from "../button/Button"
import styles from "./login.module.scss"

export default function LoginInterface({ buttonText, isCodeSended, isOpen, handleClickOpen, handleEnviar, handleKeyUp, handleCloseDialog }) {
  return <div>
    <Button color="blue" onClick={handleClickOpen}>Ingresar</Button>
    <Dialog open={isOpen} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
      <DialogContent>
        <DialogContentText>
          Ingresa tu número de telefono donde recibirás un código de acceso que ingresarás a continuación
          </DialogContentText>
        {/* Fields */}
        <div className={styles.flex} style={{ display: isCodeSended ? "none" : "flex" }}>
          <img className={styles.icon_colombia} src="/images/icons/colombia.png" alt="" />
          <span>(+57)</span>
          <TextField autoFocus margin="dense" id="phoneLogin" label="Número de celular" type="email" fullWidth />
        </div>
        {isCodeSended && <TextField onKeyUp={handleKeyUp} autoFocus margin="dense" id="verificationCode" label="Escribe aquí el código que te envíamos" fullWidth />}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="red">
          Cancelar
          </Button>
        <Button onClick={handleEnviar} color="blue">{buttonText}</Button>
      </DialogActions>
    </Dialog>
  </div>
}