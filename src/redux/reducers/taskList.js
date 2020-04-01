const initialState = {
  filter: "all",
  list: [],
  error: false,
  edit: true,
  filteredList: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TASK_LIST":
      return {
        ...state,
        list: action.payload,
        error: false
      };

    case "FETCH_TASK_LIST_ERROR":
      return {
        ...state,
        list: [],
        error: true
      };
    case "TASK_LIST_COMPLETED":
      return {
        ...state,
        filter: "completed"
      };
    case "TASK_LIST_FILTER":
      return {
        ...state,
        filteredList: action.payload
      };
    case "TASK_LIST_WORKING":
      return {
        ...state,
        filter: "working"
      };
    case "TASK_LIST_ALL":
      return {
        ...state,
        filter: "all"
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
