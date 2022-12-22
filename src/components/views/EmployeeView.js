/** @format */

import { Link } from "react-router-dom";

const EmployeeView = (props) => {
  const { employee, editTask, allTasks } = props;
  let assignedTasks = allTasks.filter(
    (task) => task.employeeId === employee.id
  );
  let availableTasks = allTasks.filter(
    (task) => task.employeeId !== employee.id
  );

  return (
    <div>
      <h1>{employee.firstname}</h1>
      <h3>{employee.department}</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}>
        <div>
          Assigned tasks:
          {assignedTasks.map((task) => {
            return (
              <div key={task.id}>
                <Link to={`/task/${task.id}`}>
                  <h4>{task.title}</h4>
                </Link>
                <button
                  onClick={() => editTask({ id: task.id, employeeId: null })}>
                  x
                </button>
              </div>
            );
          })}
        </div>
        <div>
          Available tasks:
          {availableTasks.map((task) => {
            return (
              <div key={task.id}>
                <Link to={`/task/${task.id}`}>
                  <h4>{task.title}</h4>
                </Link>
                <button
                  onClick={() =>
                    editTask({ id: task.id, employeeId: employee.id })
                  }>
                  +
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EmployeeView;
