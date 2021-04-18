import Router from "next/router"
import { useState } from "react"
import { useAppContext } from '../../contexts/context'
import LoginInterface from "./LoginInterface"
import VARS from "../../lib/variables"

export default function Login() {
	const [isOpen, setIsOpen] = useState(false)
	const [isCodeSended, setIsCodeSended] = useState(false)
	const [buttonText, setButtonText] = useState("Enviar")

	const handleEnviar = async () => {
		setButtonText("Enviando...")
		const phone = document.getElementById("phoneLogin").value
		if (!phone) {
			alert("Debes escribir un número celular, recuerda que a este número llegará el código de acceso")
			return
		}
		const request = await fetch(`${VARS.API_URL}/login/sendmessage?phone=57${phone}`, {
			method: "POST"
		})
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
		const request = await fetch(`${VARS.API_URL}/login/validateLogin?phone=${phone}&code=${verificationCode}`, {
			method: "POST"
		})
		const res = await request.json()
		if (res) {
			localStorage.setItem("user", JSON.stringify(res))
			localStorage.setItem("token", res.token)
			setIsOpen(false)
			Router.push("/?login=on")
		} else {
			document.getElementById("verificationCode").value = ""
			alert("Código no valido")
		}
	}

	return <LoginInterface {...{ buttonText, isCodeSended, isOpen, handleClickOpen, handleEnviar, handleKeyUp, handleCloseDialog }} />
}