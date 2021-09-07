import { gql, useMutation } from "@apollo/client"
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from "react"
import Layout from "../../components/layout/Layout"
import { handleLogout, subirImagen } from "../../lib/utils"
import Interface from "./Interface"
import { PikContext } from "../../states/PikState"

const CHANGE_PROFILE = gql`
mutation ChangeProfileData($input: UserInput){
  changeProfileData(input: $input)
}`

const Perfil = () => {
  const context = useContext(PikContext)
  const router = useRouter()
  const showSavedMessage = !!Object.keys(router.query).find(x => x == "updated")
  const [changeProfileData, { data, error, loading }] = useMutation(CHANGE_PROFILE)
  const [userData, setUserData] = useState({
    ...context.user,
    coins: context?.coins
  })
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

    let variables = {
      city: context.user.city,
      id: userData.id,
      name: userData.name
    }

    if (picture) variables.picture = picture // Setting picture

    context.customDispatch({
      type: "CHANGE_PROPERTY", payload: {
        property: "user", value:
          { ...userData, ...variables }
      }
    })
    changeProfileData({ variables: { input: variables } }) // Guardando en BD

    // saving in localstorage
    localStorage.setItem("user", JSON.stringify({ ...userData, ...variables }))
    setTimeout(() => {
      setIsSaving(false)
    }, 1000)
  }

  return <Layout>
    <Interface {...{ userData, isSaving, handleSave, handleLogout, setUserData }} />
  </Layout>
}

export default Perfil
