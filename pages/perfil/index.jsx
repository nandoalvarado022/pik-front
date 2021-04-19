import { gql, useMutation } from "@apollo/client"
import { Input, TextField } from "@material-ui/core"
import Router from "next/router"
import { useEffect, useState } from "react"
import Button from "../../components/button/Button"
import Layout from "../../components/layout/Layout"
import { handleLogout, subirImagen } from "../../lib/functions"
import styles from "./perfil.module.scss"

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
    const variables = { input }
    updateUser({ variables })

    // saving in localstorage
    const user = JSON.parse(localStorage.getItem("user"))
    localStorage.setItem("user", JSON.stringify({ ...user, ...input }))

    setTimeout(() => setIsSaving(false), 1000)
    Router.push("/perfil?updated")
  }

  return <Layout>
    <section className={styles.perfil}>
      <div className="Card">
        <TextField fullWidth={true} label="Tú nombre o el nombre de tu tienda" margin="normal" value={userData?.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
      </div>

      <div className="Card">
        <TextField fullWidth={true} label="Correo electrónico" margin="normal" value={userData?.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
      </div>

      <div className="Card">
        <label>Cambiar imagen de perfil</label>
        <input type='file' id="profileElement" />
      </div>

      <div className="Card">
        <div>
          <Button color={!isSaving ? "blue" : "disabled"} onClick={handleSave}>
            {isSaving ? "Gaurdando..." : "Guardar"}
          </Button>
          <Button color="red" onClick={handleLogout}>Salir</Button>
        </div>
      </div>
    </section>
  </Layout>
}

export default Perfil
