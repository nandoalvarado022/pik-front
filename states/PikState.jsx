import React, { useReducer } from "react"
import PikReducer from "./PikReducer"
import { createContext } from "react"

const PikState = (props) => {
  const initialState = {
    isOpenPreviewProfile: false,
    coins: 1505,
    selectedUser: null,
  }

  const [state, dispatch] = useReducer(PikReducer, initialState);

  return (
    <PikContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {props.children}
    </PikContext.Provider>
  )
}

export const PikContext = createContext()

export default PikState