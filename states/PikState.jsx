import React, { useReducer } from "react"
import PikReducer from "./PikReducer"
import { createContext } from "react"

const PikState = (props) => {
  const initialState = {
    isOpenPreviewProfile: false,
    isOpenNotifications: false,
    coins: 15,
    selectedUser: null,
  }

  const [state, dispatch] = useReducer(PikReducer, initialState);

  const customDispatch = (values) => {
    dispatch(values)
  }

  return (
    <PikContext.Provider
      value={{
        ...state,
        customDispatch,
      }}
    >
      {props.children}
    </PikContext.Provider>
  )
}

export const PikContext = createContext()

export default PikState