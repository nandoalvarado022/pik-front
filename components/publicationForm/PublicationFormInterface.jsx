import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Select from '@material-ui/core/Select'
import Card from '../card/Card'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { useEffect, useState } from 'react'
import Fade from '@material-ui/core/Fade'
import styles from "./publicationForm.module.scss"

const PublicationForminterface = ({ publicationFormData, onChangeImage, handleSubmit, imageLoading, errors, screenWidth, setPublicationFormData, isEdit }) => {
  const categories = ["Accesorios", "Switch", "Ps4", "Ps5", "Xbox", "Otros"]
  const [anchorEl, setAnchorEl] = useState(null)
  const [menuPosition, setMenuPosition] = useState(null)

  const handleRightClick = (event) => {
    if (menuPosition) return
    event.preventDefault();
    setMenuPosition({ top: event.pageY, left: event.pageX });
  }

  return <div className={styles.content}>
    <div className="Card">
      <div onContextMenu={handleRightClick}>
        <Button aria-controls="tipo_publicacion" onClick={handleRightClick} aria-haspopup="true">{!publicationFormData.type ? "Seleccionar plataforma" : "Plataforma: " + publicationFormData.type}</Button>
        <Menu anchorReference="anchorPosition" anchorPosition={menuPosition} onClose={() => setMenuPosition(null)} TransitionComponent={Fade} keepMounted open={!!menuPosition} className={styles.tipo_publicacion}>
          {categories.map(item => <MenuItem onClick={() => { setPublicationFormData({ ...publicationFormData, type: item }); setMenuPosition(null) }} value={item}>{item}</MenuItem>)}
        </Menu>
      </div>

      <TextField autoFocus fullWidth={true} label="Título" margin="normal" fullWidth value={publicationFormData.title} onChange={e => setPublicationFormData({ ...publicationFormData, title: e.target.value })} />

      <TextField fullWidth={true} label="Descripción" value={publicationFormData.description} multiline margin="normal" fullWidth onChange={e => setPublicationFormData({ ...publicationFormData, description: e.target.value })} />

      <TextField fullWidth={true} label="Precio" placeholder="" margin="normal" value={publicationFormData.sale_price} type='number' onChange={e => setPublicationFormData({ ...publicationFormData, sale_price: Number(e.target.value) })} />

      <TextField fullWidth={true} label="Cantidad disponible" placeholder="" margin="normal" type='number' value={publicationFormData.quantity} onChange={e => setPublicationFormData({ ...publicationFormData, quantity: e.target.value })} />

      <p>
        <FormControlLabel control={<Switch checked={Boolean(publicationFormData.is_new)} onChange={(e) => setPublicationFormData({ ...publicationFormData, is_new: e.target.checked })} inputProps={{ 'aria-label': 'primary checkbox' }} />} label="Articulo nuevo" />
      </p>

      {
        imageLoading && <div>
          <div>Cargando... <span id="progressUploadImage"></span></div>
        </div>
      }

      <div className="images_list">
        {
          ["image_link", "image_2", "image_3", "image_4"].map(item => {
            return <li>
              {
                publicationFormData[item] == null && <input type='file' id={item} onChange={() => onChangeImage(item)} />
              }
              {
                publicationFormData[item] != null && <img style={{ maxWidth: "100px", display: "block" }}
                  className="imageRodada" src={publicationFormData[item]} />
              }
            </li>
          })
        }
      </div>

      {errors && <div className="errors">{errors}</div>}

      <div className="actions" style={{ textAlign: "right" }}>
        <Button onClick={handleSubmit} color="blue">{isEdit ? "Editar" : "Crear"}</Button>
      </div>
    </div>

    {
      screenWidth > 420 && <Card className="Card preview_card" {...publicationFormData} slug={null} />
    }
  </div>
}

export default PublicationForminterface