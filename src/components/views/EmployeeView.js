/** @format */

import { Link } from "react-router-dom";
import Heading from "../Heading";

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
      <Heading />

      <h1>{employee.firstname}</h1>
      <h3>{employee.department}</h3>
      <Link to={`/editemployee/${employee.id}`}>Edit employee information</Link>
      <br />
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
                  <h4>{task.description}</h4>
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
          Unassigned tasks:
          {availableTasks.map((task) => {
            return (
              <div key={task.id}>
                <Link to={`/task/${task.id}`}>
                  <h4>{task.description}</h4>
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
