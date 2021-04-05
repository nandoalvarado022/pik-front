import Router from "next/router"
import { useState } from "react"
import { useAppContext } from '../../contexts/context'
import LoginInterface from "./LoginInterface"

export default function Login() {
	const [isSubmitted, setIsSubmitted] = useState(false)
	const handleEnviar = async () => {
		const phone = document.getElementById("phoneLogin").value
		const request = await fetch(`http://localhost:3000/login/sendmessage?phone=${phone}`, {
			method: "POST"
		})
	}

	const handleKeyUp = async () => {
		const verificationCode = document.getElementById("verificationCode").value
		const phone = document.getElementById("phoneLogin").value
		if (verificationCode) Number(verificationCode)
		if (verificationCode < 999) return
		const request = await fetch(`http://localhost:3000/login/validateLogin?phone=${phone}&code=${verificationCode}`, {
			method: "POST"
		})
		const res = await request.json()
		localStorage.setItem("user", JSON.stringify(res))
		localStorage.setItem("token", res.token)
		Router.push("/?login")
	}

	return <LoginInterface handleKeyUp={handleKeyUp} handleEnviar={handleEnviar} />
}