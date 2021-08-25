import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client'
import Router from "next/router"
import { useContext, useEffect, useState } from "react"
import LoginInterface from "./LoginInterface"
import VARS from "../../lib/variables"
import { loadAudio } from '../../lib/utils'
import { PikContext } from '../../states/PikState'

export default function Login() {
	const context = useContext(PikContext)
	const [isOpen, setIsOpen] = useState(false)
	const [isCodeSended, setIsCodeSended] = useState(false)
	const [buttonText, setButtonText] = useState("Enviar")
	const VALIDATE_QUERY = gql`
	query validateLogin($phone: String, $code: Int){
		validateLogin(phone: $phone, code: $code)
	}`

	const [validateLogin, { data: dataValidate, error: errorValidate }] = useLazyQuery(VALIDATE_QUERY, {
		onCompleted: (data) => {
			const { validateLogin } = dataValidate
			const token = JSON.parse(validateLogin).token
			if (validateLogin) {
				localStorage.setItem("user", validateLogin)
				context.customDispatch({ type: "CHANGE_PROPERTY", payload: { property: "user", value: JSON.parse(validateLogin) } })
				localStorage.setItem("token", token)
				setIsOpen(false)
				loadAudio("/audios/noti.mp3")
				Router.push("?login=on")
			} else {
				document.getElementById("verificationCode").value = ""
				alert("Código no valido")
				setButtonText("Validar")
			}
		},
		onError: (err) => {
			document.getElementById("verificationCode").value = ""
			alert("Código no valido")
			setButtonText("Validar")
		}
	})

	const LOGIN_MUTATION = gql`
	mutation Login($phone: String){
			setLoginCode(phone: $phone)
	}`

	const [dispatchLogin, { }] = useMutation(LOGIN_MUTATION);

	const handleEnviar = async () => {
		setButtonText("Enviando...")
		const phone = document.getElementById("phoneLogin").value
		if (!phone) {
			alert("Debes escribir un número celular, recuerda que a este número llegará el código de acceso")
			return
		}
		dispatchLogin({ variables: { phone: "57" + phone } });
		setButtonText("Validar")
		setIsCodeSended(true)
	}

	const handleCloseDialog = () => {
		setIsCodeSended(false)
		setIsOpen(false)
	}

	const handleClickOpen = () => {
		setIsOpen(true)
	}

	const handleKeyUp = async () => {
		const verificationCode = document.getElementById("verificationCode").value
		const phone = "57" + document.getElementById("phoneLogin").value
		if (verificationCode) Number(verificationCode)
		if (verificationCode < 999) return
		setButtonText("Validando...")
		validateLogin({ variables: { phone, code: parseInt(verificationCode) } })
	}

	useEffect(() => {
	}, [])

	return <LoginInterface {...{ buttonText, isCodeSended, isOpen, handleClickOpen, handleEnviar, handleKeyUp, handleCloseDialog }} />
}