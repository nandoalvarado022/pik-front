const PikReducer = (state, action) => {
  const { payload, type } = action
  switch (type) {
    case "CHANGE_PROPERTY":
      const { property, value } = payload
      return {
        ...state,
        [property]: value
      }
    case "CLOSE_NOTIFICATION":
      const { id } = payload
      debugger
      if (!state.checkedNotifications.find(item => item == id)) {
        const _state = {
          ...state,
          checkedNotifications: [...state.checkedNotifications, id]
        }
        localStorage.setItem("checkedNotifications", JSON.stringify(_state.checkedNotifications))
        return _state
      }
      return state
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