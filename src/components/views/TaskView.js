/** @format */

import { Link } from "react-router-dom";
import Heading from "../Heading";

const TaskView = (props) => {
  const { task } = props;
  return (
    <div>
      <Heading />

      <h1>{task.description}</h1>
      <h2>{task.prioritylevel}</h2>
      <h2>{task.completionstatus}</h2>
      {task.employee ? (
        <h3>{task.employee.firstname + " " + task.employee.lastname}</h3>
      ) : (
        <h3>No employee assigned!</h3>
      )}
      <Link to={`/edittask/${task.id}`}>Edit task information</Link>
      <br />
      <Link to={`/tasks`}>View all tasks</Link>
    </div>
  );
};

export default TaskView;
