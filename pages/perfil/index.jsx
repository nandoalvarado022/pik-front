import { gql, useMutation } from "@apollo/client"
import Router from "next/router"
import { useEffect, useState } from "react"
import Layout from "../../components/layout/Layout"
import { handleLogout, subirImagen } from "../../lib/utils"
import Interface from "./Interface"

const CHANGE_PROFILE = gql`
mutation ChangeProfileData($input: UserInput){
  changeProfileData(input: $input)
}`

const Perfil = () => {
  const [updateUser, { data, error, loading }] = useMutation(CHANGE_PROFILE)
  const [userData, setUserData] = useState()
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    delete user.login_code
    setUserData(user)
  }, [])

  const handleSave = async () => {
    setIsSaving(true)

    // saving image in firebase
    let picture = document.getElementById("profileElement")
    if (picture.value) {
      picture = await subirImagen({ tipoArchivo: "profiles", idImageElement: "profileElement" })
      picture = picture[0]
    } else picture = null

    let input = {
      ...userData
    }

    // Setting picture
    if (picture) input.picture = picture

    // saving in the server
    delete input.banner_bottom
    delete input.banner_top
    delete input.certificate
    delete input.certificate
    const variables = { input }
    updateUser({ variables })

    // saving in localstorage
    const user = JSON.parse(localStorage.getItem("user"))
    localStorage.setItem("user", JSON.stringify({ ...user, ...input }))

    setTimeout(() => setIsSaving(false), 1000)
    Router.push("/perfil?updated")
  }

  return <Layout>
    <Interface {...{ userData, isSaving, handleSave, handleLogout, setUserData }} />
  </Layout>
}

export default Perfil
