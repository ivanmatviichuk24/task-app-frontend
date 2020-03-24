const initialState = {
  list: [],
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TASK_LIST":
      return {
        list: action.payload,
        error: false
      };

    case "FETCH_TASK_LIST_ERROR":
      return {
        list: [],
        error: true
      };
    case "USER_LOGOUT": {
      return {
        ...initialState
      };
    }
    default:
      return state;
  }
};

export default reducer;
