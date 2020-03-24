const fetchTaskList = list => {
  return {
    type: "FETCH_TASK_LIST",
    payload: list
  };
};

const fetchTaskListError = {
  type: "FETCH_TASK_LIST_ERROR"
};

export { fetchTaskList, fetchTaskListError };
