import { gql, useMutation } from "@apollo/client"
import Router from "next/router"
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from "react"
import Layout from "../../components/layout/Layout"
import { handleLogout, subirImagen } from "../../lib/utils"
import Interface from "./Interface"
import Notification from "../../components/notification/"
import { PikContext } from "../../states/PikState"

const CHANGE_PROFILE = gql`
mutation ChangeProfileData($input: UserInput){
  changeProfileData(input: $input)
}`

const Perfil = () => {
  const context = useContext(PikContext)
  const router = useRouter()
  const showSavedMessage = !!Object.keys(router.query).find(x => x == "updated")
  const [updateUser, { data, error, loading }] = useMutation(CHANGE_PROFILE)
  const [userData, setUserData] = useState(context.user)
  const [isSaving, setIsSaving] = useState(false)
  const [isProfileComplete, setIsProfileComplete] = useState(true)
  const loadUserInformation = () => {
    const user = context.user
    delete user.login_code
    if (!user.name || !user.email || !user.picture) setIsProfileComplete(false)
    else setIsProfileComplete(true)
    setUserData(user)
  }

  const handleSave = async () => {
    setIsSaving(true)
    // saving image in firebase
    let picture = document.getElementById("profileElement")
    if (picture.value) {
      picture = await subirImagen({ tipoArchivo: "profiles", idImageElement: "profileElement" })
      picture = picture[0]
    } else picture = null

    let input = {
      ...userData,
      city: context.user.city
    }

    // Setting picture
    if (picture) input.picture = picture

    // saving in the server
    delete input.login_code
    delete input.banner_bottom
    delete input.banner_top
    delete input.certificate
    delete input.certificate
    delete input.created
    const variables = { input }

    context.customDispatch({ type: "CHANGE_PROPERTY", payload: { property: "user", value: input } })
    updateUser({ variables }) // Guardando en BD

    // saving in localstorage
    const user = context.user
    localStorage.setItem("user", JSON.stringify({ ...user, ...input }))
    setTimeout(() => {
      setIsSaving(false)
      loadUserInformation()
      Router.push("/perfil?updated")
    }, 1000)
  }

  let message = !isProfileComplete ? "Completa tu perfil" : null
  if (showSavedMessage) message = "Perfil actualizado!"

  return <Layout>
    {message && <Notification isOpen={true} message={message} />}
    <Interface {...{ userData, isSaving, handleSave, handleLogout, setUserData }} />
  </Layout>
}

export default Perfil
