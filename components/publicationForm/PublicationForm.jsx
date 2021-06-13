import { useRouter, withRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import rn from 'random-number'
import { slugify } from "../../lib/utils"
import { subirImagen } from '../../lib/utils'
import PublicationForminterface from './PublicationFormInterface'

const QUERY_PUBLICATION = gql`
	query Publications($slug: String){
		publications(slug: $slug){
			accept_changues
			category
			description
			id
			image_2
			image_3
			image_4
			image_link
			is_new
			sale_price
			title
			quantity
		}
	}
`

const MUTATION_PUBLICATION = gql`
	mutation createPublication($input: PublicationInput){
		createPublication(input: $input)
	}
`

const PublicationForm = (props) => {
	const router = useRouter()
	const [imageLoading, setImageLoading] = useState()
	const [dispatchCreate, { data: resCrePub, error: errCrePub, loading: loadingCrepub }] = useMutation(MUTATION_PUBLICATION);
	const [errors, setErrors] = useState()
	const screenWidth = typeof window != "undefined" ? screen.width : 0
	const slugPublication = router.query.id;
	const variables = slugPublication ? { slug: slugPublication } : {}
	const [publicationFormData, setPublicationFormData] = useState({})
	const { data: publicationEditData, errorPED, loading: loadingPED } = slugPublication ? useQuery(QUERY_PUBLICATION, { variables }) : {}
	const [time, setTime] = useState()
	const isEdit = props.router.query?.id ? true : false

	useEffect(() => {
		if (publicationEditData?.publications) {
			setPublicationFormData(publicationEditData.publications[0])
			setTime(new Date)
		}
	}, [loadingPED])

	async function onChangeImage(idImageElement) {
		setImageLoading(true)
		const image = await subirImagen({ tipoArchivo: "publications", idImageElement, isEdit })
		const variable = idImageElement
		setImageLoading(false)
		setPublicationFormData({ ...publicationFormData, [variable]: image[0] })
	}

	function handleSubmit() {
		const validators = () => {
			if (!publicationFormData.title || !publicationFormData.description || !publicationFormData.quantity || !publicationFormData.category || !publicationFormData.image_link) {
				setErrors("Por favor completa todos los campos de tu publicación")
				return false
			}
			return true
		}

		if (!validators()) return false // Validation
		const random_num = rn({ min: 0, max: 1000, integer: true })
		const slug_prepared = slugify(publicationFormData.title, 60)
		const slug = slug_prepared + "-" + random_num
		const phone = JSON.parse(localStorage.getItem("user")).phone
		delete publicationFormData.__typename
		dispatchCreate({
			variables:
			{
				input: {
					...publicationFormData,
					isEdit,
					phone,
					quantity: Number(publicationFormData.quantity),
					sale_price: Number(publicationFormData.sale_price),
					slug
				}
			}
		});
		router.push("/publicaciones")
	}

	return <PublicationForminterface {...{ isEdit, publicationFormData, onChangeImage, handleSubmit, imageLoading, errors, screenWidth, setPublicationFormData }} />
}

export default withRouter(PublicationForm)