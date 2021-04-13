import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [codeSended, setcodeSended] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    //setOpen(false);
    setcodeSended(true)
  };

  const handleClosed = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Registrate
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Registrate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingresa tu número de línea telefónica donde recibirás un código de confirmación que ingresarás a continuación.
          </DialogContentText>
          { !codeSended && 
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="# Celular"
            type="email"
            fullWidth
          />
          }
           { codeSended && 
            <TextField 
              autoFocus
              margin="dense"
              id="name"
              label="# Código"
              type="email"
            fullWidth
          />
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosed} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}