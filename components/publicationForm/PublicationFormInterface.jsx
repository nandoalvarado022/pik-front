import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from "@fortawesome/free-solid-svg-icons"
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
import { getCategories } from "../../lib/utils"

const PublicationForminterface = ({ currentStep, nextStep, textButton, previusStep, publicationFormData, onChangeImage, handleSubmit, imageLoading, errors, screenWidth, setPublicationFormData, isEdit }) => {
  const [menuPosition, setMenuPosition] = useState(null)
  const handleRightClick = (event) => {
    if (menuPosition) return
    event.preventDefault();
    setMenuPosition({ top: event.pageY, left: event.pageX });
  }

  const { accept_changues, description, is_new, quantity, sale_price, title } = publicationFormData

  if (!!publicationFormData?.title || !isEdit) {
    return <div className={styles.content}>
      <div className={styles.fields}>
        {
          currentStep == 1 && <>
            <div className={`Card ${styles.card}`}>
              <TextField autoFocus fullWidth={true} label="Título" margin="normal" fullWidth value={title} onChange={e => setPublicationFormData({ ...publicationFormData, title: e.target.value })} />
              <div onContextMenu={handleRightClick}>
                <Button className="button_category" color="border-button" aria-controls="tipo_publicacion" onClick={handleRightClick} aria-haspopup="true">{!publicationFormData.category ? "Seleccionar la categoria" : "Categoria: " + getCategories(publicationFormData.category).name}</Button>
                <Menu anchorReference="anchorPosition" anchorPosition={menuPosition} onClose={() => setMenuPosition(null)} TransitionComponent={Fade} keepMounted open={!!menuPosition} className={styles.tipo_publicacion}>
                  {getCategories().map(item => <MenuItem onClick={() => { setPublicationFormData({ ...publicationFormData, category: item.id }); setMenuPosition(null) }} value={item.id}>{item.name}</MenuItem>)}
                </Menu>
              </div>

              <TextField fullWidth={true} label="Descripción" value={description} multiline margin="normal" fullWidth onChange={e => setPublicationFormData({ ...publicationFormData, description: e.target.value })} />
            </div>
          </>
        }

        {
          currentStep == 2 && <>
            <div className="Card flex">
              <TextField fullWidth={true} label="Precio" placeholder="" margin="normal" value={sale_price} type='number' onChange={e => setPublicationFormData({ ...publicationFormData, sale_price: Number(e.target.value) })} />

              <TextField fullWidth={true} label="Cantidad disponible" placeholder="" margin="normal" type='number' value={quantity} onChange={e => setPublicationFormData({ ...publicationFormData, quantity: e.target.value })} />
            </div>

            <div className="Card">
              <p>
                <FormControlLabel control={<Switch checked={Boolean(is_new)} onChange={(e) => setPublicationFormData({ ...publicationFormData, is_new: e.target.checked })} inputProps={{ 'aria-label': 'primary checkbox' }} />} label="Articulo nuevo" />
              </p>
              <p>
                <FormControlLabel control={<Switch checked={Boolean(accept_changues)} onChange={(e) => setPublicationFormData({ ...publicationFormData, accept_changues: e.target.checked })} inputProps={{ 'aria-label': 'primary checkbox' }} />} label="¿Aceptas cambios o aceptar otro producto como parte de pago?" />
              </p>
            </div>
          </>
        }

        {
          currentStep == 3 && <>
            {
              imageLoading && <div>
                <div>Cargando... <span id="progressUploadImage"></span></div>
              </div>
            }

            <div className={`Card ${styles.images_list}`}>
              {
                ["image_1", "image_2", "image_3", "image_4"].map(item => {
                  return <>
                    {
                      publicationFormData[item] == null && <label class={styles.fileWrapper}>
                        <input type='file' id={item} onChange={() => onChangeImage(item)} />
                        <FontAwesomeIcon icon={faImage} />
                        <p>Subir imágen</p>
                      </label>
                    }
                    {
                      publicationFormData[item] != null && <label class={styles.fileWrapper}>
                        <img style={{ maxWidth: "100px", display: "block" }} className="imageRodada" src={publicationFormData[item]} />
                      </label>
                    }
                  </>
                })
              }
            </div>
          </>
        }
        <div className="actions" style={{ textAlign: "right" }}>
          {
            currentStep != 1 && <Button animation={false} onClick={previusStep} color="yellow">
              Anterior
            </Button>
          }
          <Button animation={currentStep != 3} onClick={nextStep} color="blue">{textButton}</Button>
        </div>
      </div>
      {
        screenWidth > 420 && <div>
          <div className={styles.preview_card}>
            <Card {...publicationFormData} slug={null} />
          </div>
          {errors && <div className={styles.errors}>{errors}</div>}
        </div>
      }
    </div>
  }
  else return <div></div>
}

export default PublicationForminterface