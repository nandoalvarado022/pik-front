import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Card from '../card/Card'
import Button from '../button/Button'
import TextField from '@material-ui/core/TextField'
import styles from "./formPublication.module.scss"

const PublicationForminterface = ({ publicationFormData, onChangeImage, handleSubmit, imageLoading, errors, screenWidth, setPublicationFormData, isEdit }) => {
  debugger
  return <div className={styles.content}>
    <div className="Card">
      <p>
        <InputLabel id="label-tipo-publicacion">Plataforma</InputLabel>
        <Select labelId="label-tipo-publicacion"
          id="tipo_publicacion"
          value={publicationFormData.type}
          onChange={e => setPublicationFormData({ ...publicationFormData, type: e.target.value })}>
          <option value={"accesorios"}>Accesorios</option>
          <option value={"switch"}>Nintendo Switch</option>
          <option value='ps4'>PS4</option>
          <option value='ps5'>PS5</option>
          <option value='xbox'>XBOX</option>
          <option value='otros'>No lo tengo claro</option>
        </Select>
      </p>

      {/* <TextField fullWidth={true} label="Título" multiline margin="normal" fullWidth value={publicationFormData.title} variant="outlined" onChange={e => setPublicationFormData({ ...publicationFormData, title: e.target.value })} />

      <TextField fullWidth={true} label="Descripción" value={publicationFormData.description} multiline margin="normal" fullWidth variant="outlined" onChange={e => setPublicationFormData({ ...publicationFormData, description: e.target.value })} />

      <TextField fullWidth={true} label="Precio" placeholder="" margin="normal" value={publicationFormData.sale_price} type='number' variant="outlined" onChange={e => setPublicationFormData({ ...publicationFormData, sale_price: Number(e.target.value) })} />

      <TextField fullWidth={true} label="Cantidad disponible" placeholder="" margin="normal" type='number' value={publicationFormData.quantity} variant="outlined" onChange={e => setPublicationFormData({ ...publicationFormData, quantity: e.target.value })} />

      <p>
        <FormControlLabel control={<Switch checked={Boolean(publicationFormData.is_new)} onChange={(e) => setPublicationFormData({ ...publicationFormData, is_new: e.target.checked })} inputProps={{ 'aria-label': 'primary checkbox' }} />} label="Articulo nuevo" />
      </p> */}

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