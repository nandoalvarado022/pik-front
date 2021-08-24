import { TextField } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { useContext, useState } from "react"
import { PikContext } from "../../states/PikState"

const CiudadControl = () => {
  const context = useContext(PikContext)
  const listadoCiudades = ["Bogotá", "Medellín", "Barranquilla", "Cali", "Bucaramanga", "Pasto", "Barrancabermeja", "Monteria", "Cartagena", "Santa Marta", "Manizales", "Cucuta", "Pereira", "Ibague", "Maicao", "Rioacha"]
  const [ciudad, setCiudad] = useState()

  return <div className="contentCiudad">
    <Autocomplete value={context.user.city} name="str_ciudad" options={listadoCiudades} onInputChange={(event, str_ciudad) => { context.customDispatch({ type: "CHANGE_PROPERTY", payload: { property: "user", value: { ...context.user, city: str_ciudad } } }) }} getOptionLabel={(option) => option} style={{ width: "100%" }}
      renderInput={(params) => <TextField {...params} label="Ciudad en la que te encuentras" />} />
  </div>
}

export default CiudadControl