import React from "react";

const taskFilter = props => {
  return (
    <div className="btn-group">
      <button
        key="all"
        type="button"
        onClick={() => props.filterAll(props.taskList)}
      >
        all
      </button>
      <button
        key="button"
        type="button"
        onClick={() => props.filterCompleted(props.taskList)}
      >
        completed
      </button>
      <button
        key="active"
        type="button"
        onClick={() => props.filterWorking(props.taskList)}
      >
        active
      </button>
    </div>
  );
};

export default taskFilter;
