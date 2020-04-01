const taskFormTitleChange = value => {
  return {
    type: "TASK_FORM_TITLE_CHANGE",
    payload: value || ""
  };
};

const taskFormDescriptionChange = value => {
  return {
    type: "TASK_FORM_DESCRIPTION_CHANGE",
    payload: value || ""
  };
};

const taskFormError = value => {
  const payload = value === undefined ? true : false;
  return {
    type: "TASK_FORM_ERROR",
    payload
  };
};

const taskFormSubmit = dispatch => {
  dispatch(taskFormTitleChange());
  dispatch(taskFormDescriptionChange());
  dispatch(taskFormError(false));
};

export {
  taskFormTitleChange,
  taskFormDescriptionChange,
  taskFormSubmit,
  taskFormError
};
