/** @format */

import { Link } from "react-router-dom";

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
        let title = task.title;
        return (
          <div key={task.id}>
            <Link to={`/course/${task.id}`}>
              <h1>{title}</h1>
            </Link>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        );
      }
      )}
      <Link to={`/newtask`}>
        <button>Add New Task</button>
      </Link>
    </div>
  );
};

export default AllTasksView;
