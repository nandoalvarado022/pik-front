const PikReducer = (state, action) => {
  const { payload, type } = action
  switch (type) {
    case "IS_OPEN_PREVIEW_PROFILE":
      return {
        ...state,
        isOpenPreviewProfile: payload,
      }
    case "GET_PROFILE":
      return {
        ...state,
        selectedUser: payload,
      }
    default:
      return state;
  }
}

export default PikReducer