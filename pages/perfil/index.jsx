import { gql, useMutation } from "@apollo/client"
import Router from "next/router"
import { useEffect, useState } from "react"
import Button from "../../components/button/Button"
import Layout from "../../components/layout/Layout"
import { handleLogout, subirImagen } from "../../lib/functions"

const CHANGE_PROFILE = gql`
  mutation ChangeProfileData($input: UserInput){
    changeProfileData(input: $input)
  }
`

const Perfil = () => {
  const [updateUser, { data, error, loading }] = useMutation(CHANGE_PROFILE)

  async function onChangeImage() {
    let user = JSON.parse(localStorage.getItem("user"))
    let picture = await subirImagen({ tipoArchivo: "profiles", idImageElement: "profileElement" })
    picture = picture[0]
    const variables = { input: { id: user.id, picture } }
    updateUser({ variables })
    user = {
      ...user,
      picture
    }
    localStorage.setItem("user", JSON.stringify(user))
    Router.push("/perfil?updated")
  }

  return <Layout>
    <div className="Card">
      <label>Cambiar imagen de perfil: </label>
      <input type='file' id="profileElement" onChange={onChangeImage} />
      <div>
        <Button color="red" onClick={handleLogout}>Salir</Button>
      </div>
    </div>
  </Layout>
}

export default Perfil
