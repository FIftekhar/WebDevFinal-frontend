/** @format */

import { Link } from "react-router-dom";
import Heading from "../Heading";

const AllTasksView = (props) => {
  let { tasks, deleteTask } = props;
  if (!tasks.length) {
    return (
      <div>
        <Heading />

        <p>There are no tasks.</p>
        <Link to={`/newtask`}>
          <button>Add New Task</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Heading />

      {tasks.map((task) => {
        let description = task.description;
        return (
          <div key={task.id}>
            <Link to={`/task/${task.id}`}>
              <h1>{description}</h1>
            </Link>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        );
      })}
      <Link to={`/newtask`}>
        <button>Add New Task</button>
      </Link>
    </div>
  );
};

export default AllTasksView;
