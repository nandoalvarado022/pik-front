import { useRouter, withRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import rn from 'random-number'
import { slugify } from "../../lib/utilidades"
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Card from '../card/Card'
import Btn from '../btn/Btn'
import TextField from '@material-ui/core/TextField'
import { subirImagen } from '../../lib/functions'

const QUERY_PUBLICATION = gql`
query Publications($slug: String){
	publications(slug: $slug){
		description
		image_2
		image_3
		image_4
		image_link
		is_new
		sale_price
		title
		type
	}
}`

const MUTATION_PUBLICATION = gql`
mutation createPublication($input: PublicationInput){
	createPublication(input: $input)
}`

const PublicationForm = (props) => {
	const router = useRouter()
	const [imageLoading, setImageLoading] = useState()
	const [dispatchCreate, { data: resCrePub, error: errCrePub, loading: loadingCrepub }] = useMutation(MUTATION_PUBLICATION);
	const btnCrear = "Crear"
	const [errors, setErrors] = useState()
	const screenWidth = typeof window != "undefined" ? screen.width : 0
	const slugPublication = router.query.id;
	const variables = slugPublication ? { slug: slugPublication } : {}
	const [publicationFormData, setPublicationFormData] = useState({})
	const { data: publicationEditData, errorPED, loading: loadingPED } = slugPublication ? useQuery(QUERY_PUBLICATION, { variables }) : {}

	useEffect(() => {
		debugger
		if (publicationEditData?.publications) setPublicationFormData(publicationEditData.publications[0])
	}, [loadingPED])

	async function onChangeImage(idImageElement) {
		setImageLoading(true)
		const image = await subirImagen({ tipoArchivo: "publicacion", idImageElement })
		const variable = idImageElement
		setImageLoading(false)
		setPublicationFormData({ ...publicationFormData, [variable]: image[0] })
	}

	function handleCrear() {
		const validators = () => {
			if (!publicationFormData.title || !publicationFormData.description || !publicationFormData.quantity || !publicationFormData.type || !publicationFormData.sale_price || !publicationFormData.image_link) {
				setErrors("Por favor completa todos los campos de tu publicación")
				return false
			}
			return true
		}

		if (!validators()) return false // Validation

		const random_num = rn({ min: 0, max: 1000, integer: true })
		const slug_prepared = slugify(publicationFormData.title, 60)
		const slug = slug_prepared + "-" + random_num
		dispatchCreate({ variables: { input: { ...publicationFormData, slug, quantity: Number(publicationFormData.quantity), sale_price: Number(publicationFormData.sale_price) } } });
		router.push("/publicaciones")
	}

	return <div className="content">
		<div className="Card">
			<p>
				<InputLabel id="label-tipo-publicacion">Plataforma</InputLabel>
				<Select labelId="label-tipo-publicacion"
					id="tipo_publicacion"
					defaultValue={publicationFormData.type}
					value={publicationFormData.type}
					onChange={e => setPublicationFormData({ ...publicationFormData, type: e.target.value })}>
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
				value={publicationFormData.title}
				variant="outlined"
				onChange={e => setPublicationFormData({ ...publicationFormData, title: e.target.value })} />

			<TextField
				fullWidth={true}
				label="Descripción"
				value={publicationFormData.description}
				multiline
				margin="normal"
				fullWidth
				variant="outlined"
				onChange={e => setPublicationFormData({ ...publicationFormData, description: e.target.value })} />

			<TextField
				fullWidth={true}
				label="Precio"
				placeholder=""
				margin="normal"
				value={publicationFormData.sale_price}
				type='number'
				variant="outlined"
				onChange={e => setPublicationFormData({ ...publicationFormData, sale_price: Number(e.target.value) })} />

			<TextField
				fullWidth={true}
				label="Cantidad disponible"
				placeholder=""
				margin="normal"
				type='number'
				value={publicationFormData.quantity}
				variant="outlined"
				onChange={e => setPublicationFormData({ ...publicationFormData, quantity: e.target.value })} />

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
				<Btn onClick={handleCrear} className="green small m-l-10" text={btnCrear} />
			</div>
		</div>

		{
			screenWidth > 420 && <Card className="Card preview_card" {...publicationFormData} slug={null} />
		}
	</div>
}

export default withRouter(PublicationForm)