const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "UPDATE_FILTER":
      return action.data
    default:
      return state
  }
}

export const updateFilter = (filter) => {
  return {
    type: "UPDATE_FILTER",
    data: filter
  }
}

export default filterReducer