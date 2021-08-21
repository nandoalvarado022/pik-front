const PikReducer = (state, action) => {
  const { payload, type } = action
  switch (type) {
    case "CHANGE_PROPERTY":
      const { property, value } = payload
      return {
        ...state,
        [property]: value
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