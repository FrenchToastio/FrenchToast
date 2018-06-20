import React from "react";

const threeDays = 1000 * 60 * 60 * 24 * 3;
const fourDays = 1000 * 60 * 60 * 24 * 4;
const sevenDays = 1000 * 60 * 60 * 24 * 7;

const addDueDateColors = date => {
  let currentDate = new Date();
  let dueDate = new Date(date);

  if (currentDate >= dueDate - threeDays) {
    return "due1-3";
  } else if (currentDate >= dueDate - sevenDays) {
    return "due4-7";
  } else if (currentDate <= dueDate - sevenDays) {
    return "dueLaterThan-7";
  } else {
    return "taskitem";
  }
};

const TaskItem = ({ item }) => {
  const classes = addDueDateColors(item.due_date);
  // item = item || {
  // 	id: 999,
  // 	owner: 'myself',
  // 	status: 'debugginmg',
  // 	description: 'debug',
  // 	due_date: 'meh'
  // }
  if (item) {
    return (
      <div className={addDueDateColors(item.due_date)} data-id={`${item.id}`}>
        <p>
          <span className="labels">ID: </span>
          {item.id}
        </p>
        <p>
          <span className="labels">Assigned To: </span>
          {item.assigned}
        </p>
        {/* <p>Status:{item.status}</p> */}
        <p>
          <span className="labels">Description: </span>
          {item.description}
        </p>
        <p>
          <span className="labels">Due Date: </span>
          {item.due_date}
        </p>
        <p>
          <span className="labels">Labels: </span>
          {item.labels &&
            item.labels
              .join(", ")
              .split(" ")
              .map(label => <span>{label} </span>)}
        </p>
      </div>
    );
  } else {
    return <div />;
  }
};

export default TaskItem;
