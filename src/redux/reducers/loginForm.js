const initialState = {
  email: "ivan@example.com",
  password: "user123"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_FORM_EMAIL_CHANGE":
      return {
        ...state,
        email: action.payload
      };
    case "LOGIN_FORM_PASSWORD_CHANGE":
      return {
        ...state,
        password: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
