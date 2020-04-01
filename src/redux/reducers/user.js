const initialState = {
  name: "",
  email: "",
  password: "",
  isAuthenticated: false,
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER":
      return {
        ...action.payload,
        isAuthenticated: true,
        error: false
      };

    case "FETCH_USER_ERROR":
      return {
        name: "",
        email: "",
        password: "",
        isAuthenticated: false,
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
