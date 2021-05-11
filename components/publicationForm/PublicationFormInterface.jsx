import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Select from '@material-ui/core/Select'
import Card from '../card/Card'
import { Input, TextField } from "@material-ui/core"
import { useEffect, useState } from 'react'
import Fade from '@material-ui/core/Fade'
import styles from "./publicationForm.module.scss"
import Button from '../button/Button'
import { getCategories } from "../../lib/utilidades"

const PublicationForminterface = ({ publicationFormData, onChangeImage, handleSubmit, imageLoading, errors, screenWidth, setPublicationFormData, isEdit }) => {
  const [menuPosition, setMenuPosition] = useState(null)

  const handleRightClick = (event) => {
    if (menuPosition) return
    event.preventDefault();
    setMenuPosition({ top: event.pageY, left: event.pageX });
  }

  const { is_new, description, quantity, sale_price, title } = publicationFormData

  if (!!publicationFormData?.title || !isEdit) {
    return <div className={styles.content}>
      <div className="fields">
        <div className="Card">
          <div onContextMenu={handleRightClick}>
            <Button color="border-button" aria-controls="tipo_publicacion" onClick={handleRightClick} aria-haspopup="true">{!publicationFormData.type ? "Seleccionar la categoria" : "Categoria: " + getCategories(publicationFormData.type).name}</Button>
            <Menu anchorReference="anchorPosition" anchorPosition={menuPosition} onClose={() => setMenuPosition(null)} TransitionComponent={Fade} keepMounted open={!!menuPosition} className={styles.tipo_publicacion}>
              {getCategories().map(item => <MenuItem onClick={() => { setPublicationFormData({ ...publicationFormData, type: item.id }); setMenuPosition(null) }} value={item.id}>{item.name}</MenuItem>)}
            </Menu>
          </div>
        </div>

        <div className="Card">
          <TextField autoFocus fullWidth={true} label="Título" margin="normal" fullWidth value={title} onChange={e => setPublicationFormData({ ...publicationFormData, title: e.target.value })} />
        </div>

        <div className="Card">
          <TextField fullWidth={true} label="Descripción" value={description} multiline margin="normal" fullWidth onChange={e => setPublicationFormData({ ...publicationFormData, description: e.target.value })} />
        </div>

        <div className="Card">
          <TextField fullWidth={true} label="Precio" placeholder="" margin="normal" value={sale_price} type='number' onChange={e => setPublicationFormData({ ...publicationFormData, sale_price: Number(e.target.value) })} />
        </div>

        <div className="Card">
          <TextField fullWidth={true} label="Cantidad disponible" placeholder="" margin="normal" type='number' value={quantity} onChange={e => setPublicationFormData({ ...publicationFormData, quantity: e.target.value })} />
        </div>

        <div className="Card">
          <p>
            <FormControlLabel control={<Switch checked={Boolean(is_new)} onChange={(e) => setPublicationFormData({ ...publicationFormData, is_new: e.target.checked })} inputProps={{ 'aria-label': 'primary checkbox' }} />} label="Articulo nuevo" />
          </p>
        </div>

        {
          imageLoading && <div>
            <div>Cargando... <span id="progressUploadImage"></span></div>
          </div>
        }

        <div className={`Card ${styles.images_list}`}>
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
      </div>
      {
        screenWidth > 420 && publicationFormData.title && <div>
          <div className={styles.preview_card}>
            <Card {...publicationFormData} slug={null} />
          </div>
          {errors && <div className={styles.errors}>{errors}</div>}
          <div className="actions" style={{ textAlign: "right" }}>
            <Button onClick={handleSubmit} color="blue">{isEdit ? "Terminar edición" : "Crear publicación"}</Button>
          </div>
        </div>
      }
    </div>
  }
  else return <div></div>
}

export default PublicationForminterface