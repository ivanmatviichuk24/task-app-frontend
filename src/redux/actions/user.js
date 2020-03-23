const fetchUser = user => {
  return {
    type: "FETCH_USER",
    payload: user
  };
};

const fetchUserError = {
  type: "FETCH_USER_ERROR"
};
const userLogout = {
  type: "USER_LOGOUT"
};

export { fetchUser, fetchUserError, userLogout };
