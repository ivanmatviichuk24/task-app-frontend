import React from "react";

const TaskListFilter = props => {
  return (
    <div className="btn-group">
      <button key="all" type="button" onClick={() => props.filterAll()}>
        all
      </button>
      <button
        key="button"
        type="button"
        onClick={() => props.filterCompleted()}
      >
        completed
      </button>
      <button key="active" type="button" onClick={() => props.filterWorking()}>
        active
      </button>
    </div>
  );
};

export default TaskListFilter;
