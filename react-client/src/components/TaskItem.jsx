import React from "react";

const TaskItem = ({ item }) => {
	// item = item || {
	// 	id: 999,
	// 	owner: 'myself',
	// 	status: 'debugginmg',
	// 	description: 'debug',
	// 	due_date: 'meh'
	// }
	if(item){
	return(
  <div className="taskitem" data-id={`${item.id}`}>
    <p>ID:{item.id}</p>
    <p>Owner:{item.owner}</p>
    <p>Status:{item.status}</p>
    <p>Description:{item.description}</p>
    <p>due_date:{item.due_date}</p>
  </div>
);
} else{
	return (<div></div>)
}

}

export default TaskItem;
