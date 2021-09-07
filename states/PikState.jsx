import { gql, useLazyQuery } from '@apollo/client'
import React, { useContext, useEffect, useReducer } from "react"
import PikReducer from "./PikReducer"
import { createContext } from "react"

const PikState = (props) => {
  const initialState = {
    coins: 15,
    isOpenNotifications: false,
    isMobile: false,
    isOpenPreviewProfile: false,
    notifications: [],
    messageModal: { id: "empty" },
    checkedNotifications: typeof window != "undefined" && localStorage.getItem("checkedNotifications") ? JSON.parse(localStorage.getItem("checkedNotifications")) : [],
    selectedUser: null,
    user: {
      id: 0
    },
    showNotification: true
  }

  const [state, dispatch] = useReducer(PikReducer, initialState);

  // Getting notifications
  const GET_NOTIFICATIONS = gql`
	query getNotifications($user: Int){
		getNotifications(user: $user){
      id
      user
      detail
      coins
      created
    }
	}`

  const [getNotifications] = useLazyQuery(GET_NOTIFICATIONS, { // Obteniendo notificaciones
    fetchPolicy: "no-cache",
    variables: {
      user: state.user.id
    },
    onCompleted: ({ getNotifications }) => {
      getNotifications && dispatch({ type: "CHANGE_PROPERTY", payload: { property: "notifications", value: getNotifications } })
    }
  })
  //  

  const customDispatch = (values) => {
    dispatch(values)
  }

  const gettingNotifications = () => {
    getNotifications()
  }

  useEffect(() => { // Al iniciar
    sessionStorage.setItem("notifications", "{}")
    if (!localStorage.getItem("checkedNotifications")) {
      localStorage.setItem("checkedNotifications", "[]")
    }
    if (!!localStorage.getItem("user")) {
      dispatch({ type: "CHANGE_PROPERTY", payload: { property: "user", value: JSON.parse(localStorage.getItem("user")) } })
      getNotifications()
    }
  }, [])

  return (
    <PikContext.Provider
      value={{
        ...state,
        customDispatch,
        gettingNotifications
      }}
    >
      {props.children}
    </PikContext.Provider>
  )
}

export const PikContext = createContext()

export default PikState