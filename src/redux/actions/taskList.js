const fetchTaskList = (dispatch, list) => {
  dispatch({
    type: "FETCH_TASK_LIST",
    payload: list
  });
  return;
};

const fetchTaskListError = {
  type: "FETCH_TASK_LIST_ERROR"
};

const taskListShowAll = async (dispatch, taskList) => {
  await dispatch({ type: "TASK_LIST_ALL" });
  dispatch(taskListFilter(taskList, "all"));
};

const taskListShowCompleted = async (dispatch, taskList) => {
  await dispatch({ type: "TASK_LIST_COMPLETED" });
  dispatch(taskListFilter(taskList, "completed"));
};

const taskListShowWorking = async (dispatch, taskList) => {
  await dispatch({ type: "TASK_LIST_WORKING" });
  dispatch(taskListFilter(taskList, "working"));
};

const taskListFilter = (taskList, filter) => {
  const filteredList = taskList.list.filter(elem => {
    switch (filter || taskList.filter) {
      case "all":
        return true;
      case "completed":
        return elem.completed === true;
      case "working":
        return elem.completed === false;
    }
  });
  return {
    type: "TASK_LIST_FILTER",
    payload: filteredList
  };
};

export {
  fetchTaskList,
  fetchTaskListError,
  taskListShowAll,
  taskListShowCompleted,
  taskListShowWorking,
  taskListFilter
};
