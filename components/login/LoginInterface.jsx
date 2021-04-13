import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from "../button/Button"

export default function LoginInterface({ isCodeSended, isOpen, handleClickOpen, handleEnviar, handleKeyUp, handleCloseDialog }) {
  return <div>
    <Button color="blue" onClick={handleClickOpen}>
      Ingresar
    </Button>
    <Dialog open={isOpen} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Registrate</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Ingresa tu número de línea telefónica donde recibirás un código de confirmación que ingresarás a continuación.
          </DialogContentText>
        {/* Fields */}
        <TextField style={{ display: !isCodeSended ? "block" : "none" }} autoFocus margin="dense" id="phoneLogin" label="Número de celular" type="email" fullWidth />
        {isCodeSended && <TextField onKeyUp={handleKeyUp} autoFocus margin="dense" id="verificationCode" label="Escribe aquí el código que te envíamos" fullWidth />}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="red">
          Cancelar
          </Button>
        <Button onClick={handleEnviar} color="blue">Enviar</Button>
      </DialogActions>
    </Dialog>
  </div>
}