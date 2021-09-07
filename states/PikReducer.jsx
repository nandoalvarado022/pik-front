const PikReducer = (state, action) => {
  const { payload, type } = action
  switch (type) {
    case "CHANGE_PROPERTY":
      const { property, value } = payload
      return {
        ...state,
        [property]: value
      }
    case "SET_MESSAGE":
      const notifications1Time = ["postRegistro"]
      let messageModal = !payload?.message ? { id: "empty", message: "" } : payload.message
      // si el tipo de notificacion es 1time debe quedar almacenada en local storage
      const notifications = localStorage.getItem("checkedNotifications") ? JSON.parse(localStorage.getItem("checkedNotifications")) : []
      if (notifications1Time.indexOf(messageModal.id) != 1 && notifications.find(item => item == messageModal.id)) { // si es notificacion 1time y ya lo tenemos en el local storage no se debe mostrar
        messageModal.id = "empty"
      }
      if (notifications1Time.indexOf(messageModal.id) != -1 && !notifications.find(item => item == messageModal.id)) {
        notifications.push(messageModal.id)
        localStorage.setItem("checkedNotifications", JSON.stringify(notifications))
      }
      return {
        ...state,
        messageModal
      }
    case "RECLAMAR_COINS":
      return {
        ...state,
        coins: state.coins + payload.coins,
      }
    default:
      return state;
  }
}

export default PikReducer