import { gql, useMutation } from '@apollo/client'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Ayuda from '../../components/ayuda/Ayuda'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import rn from 'random-number'
import date from 'date-and-time'
import Router from 'next/router'
import React, { Component, useState } from 'react'
import Layout from '../../components/layout/Layout'
import Btn from '../../components/btn/Btn'
import TextField from '@material-ui/core/TextField'
import Funciones from '../../lib/functions'
import { slugify } from "../../lib/utilidades"
import Card from '../../components/card/Card'

const instanciaFunc = new Funciones

const MUTATION_PUBLICATION = gql`
  mutation createPublication($input: PublicationInput){
    createPublication(input: $input){
      description
    }
  }
`;

const CrearPublicacion = () => {
  const [imageLoading, setImageLoading] = useState()
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [quantity, setQuantity] = useState()
  const [condition, setCondition] = useState()
  const [dispatchCreate, { data, error, loading }] = useMutation(MUTATION_PUBLICATION);
  const btnCrear = "Crear"
  const [sale_price, setSalePrice] = useState()
  const [type, setPublicationType] = useState()
  const [image_link, setimage_link] = useState()
  const [image_2, setimage_2] = useState()
  const [image_3, setimage_3] = useState()
  const [image_4, setimage_4] = useState()
  const [image_5, setimage_5] = useState()
  const [errors, setErrors] = useState()

  async function onChangeImage(idImageElement) {
    setImageLoading(true)
    const image = await instanciaFunc.subirImagen({ tipoArchivo: "publicacion", idImageElement })
    const variable = `set${idImageElement}`
    setImageLoading(false)
    eval(variable)(image[0])
  }

  function handleCrear() {
    if (!title) {
      setErrors("Tu publicación debe tener un título")
      return false
    }

    if (!description) {
      setErrors("Tu publicación debe tener una descripción")
      return false
    }

    if (!quantity) {
      setErrors("Tu publicación debe tener una cantidad")
      return false
    }

    if (!type) {
      setErrors("Tu publicación debe tener un tipo")
      return false
    }

    if (!sale_price) {
      setErrors("Tu publicación debe tener un precio")
      return false
    }

    if (!image_link) {
      setErrors("Tu publicación debe tener imágenes")
      return false
    }

    // const now = new Date()
    // const fecha = date.format(now, 'YYYY-MM-DD HH:mm:ss')
    const random_num = rn({ min: 0, max: 1000, integer: true })
    const slug_prepared = slugify(title, 60)
    const slug = slug_prepared + "-" + random_num
    const input = {
      is_new: condition,
      description,
      image_link,
      quantity: Number(quantity),
      title,
      slug,
      type
    }

    dispatchCreate({ variables: { input } });
    return
  }

  return (
    <Layout title="Crear publicación" meta_title="Crear publicación en club2ruedas.com" meta_url="https://club2ruedas.com/publicacion/crear">
      <div id="_crearPublicacion" className="h-100vh">
        <div className="content">
          <div className="Card">
            <p>
              <InputLabel id="label-tipo-publicacion">Plataforma</InputLabel>
              <Select labelId="label-tipo-publicacion"
                id="tipo_publicacion"
                onChange={e => setPublicationType(e.target.value)}>
                <MenuItem value='accesorios'>Accesorios</MenuItem>
                <MenuItem value='switch'>Nintendo Switch</MenuItem>
                <MenuItem value='ps4'>PS4</MenuItem>
                <MenuItem value='ps5'>PS5</MenuItem>
                <MenuItem value='xbox'>XBOX</MenuItem>
                <MenuItem value='otros'>No lo tengo claro</MenuItem>
              </Select>
            </p>

            <TextField
              fullWidth={true}
              label="Título"
              multiline
              margin="normal"
              fullWidth
              variant="outlined"
              onChange={e => setTitle(e.target.value)} />

            <TextField
              fullWidth={true}
              label="Descripción"
              multiline
              margin="normal"
              fullWidth
              variant="outlined"
              onChange={e => setDescription(e.target.value)} />

            <TextField
              fullWidth={true}
              label="Precio"
              placeholder=""
              margin="normal"
              type='number'
              variant="outlined"
              onChange={e => {
                setSalePrice(e.target.value)
              }} />

            <TextField
              fullWidth={true}
              label="Cantidad disponible"
              placeholder=""
              margin="normal"
              type='number'
              variant="outlined"
              onChange={e => setQuantity(e.target.value)} />

            <p>
              <FormControlLabel
                control={<Switch onChange={(e) => setCondition(e.target.checked)} inputProps={{ 'aria-label': 'primary checkbox' }} />}
                label="Articulo nuevo"
              />
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
                      eval(item) == null && <input type='file' id={item} onChange={() => onChangeImage(item)} />
                    }
                    {
                      eval(item) != null && <img style={{ maxWidth: "100px", display: "block" }}
                        className="imageRodada" src={eval(item)} />
                    }
                  </li>
                })
              }
            </div>

            {errors && <div className="errors">{errors}</div>}

            <div className="actions" style={{ textAlign: "right" }}>
              <Btn onClick={handleCrear} className="green small m-l-10" text={btnCrear} />
            </div>
          </div>

          <Card className="Card" quantity={quantity} title={title} image_link={image_link} sale_price={sale_price}>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export default CrearPublicacion