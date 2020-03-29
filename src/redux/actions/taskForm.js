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

const taskFormSubmit = dispatch => {
  dispatch(taskFormTitleChange());
  dispatch(taskFormDescriptionChange());
};

export { taskFormTitleChange, taskFormDescriptionChange, taskFormSubmit };
