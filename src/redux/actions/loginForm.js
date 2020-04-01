const loginFormEmailChange = value => {
  return {
    type: "LOGIN_FORM_EMAIL_CHANGE",
    payload: value
  };
};

const loginFormPasswordChange = value => {
  return {
    type: "LOGIN_FORM_PASSWORD_CHANGE",
    payload: value
  };
};

export { loginFormEmailChange, loginFormPasswordChange };
