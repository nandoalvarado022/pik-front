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
    <Button alt="Ingersar con número de teléfono" color="blue" id="btnStart" onClick={handleClickOpen}>¡Play!</Button>
    <Dialog open={isOpen} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
      <DialogContent>
        <DialogContentText>
          Para iniciar con tu cuenta escribe tu número de telefono donde recibirás un código de acceso
          </DialogContentText>
        {/* Fields */}
        <div className={styles.flex} style={{ display: isCodeSended ? "none" : "flex" }}>
          <img height="42" width="40" className={styles.icon_colombia} src="/images/icons/colombia.png" alt="" />
          <span>(+57)</span>
          <TextField autoFocus margin="dense" id="phoneLogin" label="Número de celular" type="email" fullWidth />
        </div>
        {isCodeSended && <TextField onKeyUp={handleKeyUp} autoFocus margin="dense" id="verificationCode" label="Escribe aquí el código que te envíamos" fullWidth />}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="normal">
          Cancelar
          </Button>
        <Button onClick={handleEnviar} color="blue">{buttonText}</Button>
      </DialogActions>
    </Dialog>
  </div>
}