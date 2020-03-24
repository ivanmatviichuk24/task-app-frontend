const initialState = {
  title: "",
  description: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TASK_FORM_TITLE_CHANGE":
      return {
        ...state,
        title: action.payload
      };
    case "TASK_FORM_DESCRIPTION_CHANGE":
      return {
        ...state,
        description: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
