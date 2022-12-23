/** @format */

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AllEmployeesView = (props) => {
  let {allEmployees,deleteEmployee} = props;
  if (!allEmployees.length) {
    return <div>
      <p>There are no employees.</p>
      <Link to={`/newemployee`}>
        <button>Add New Employee</button>
      </Link>
      </div>;
  }

  return (
    <div>
      {props.allEmployees.map((employee) => {
        let name = employee.firstname + " " + employee.lastname;
        return (
          <div key={employee.id}>
            <Link to={`/employee/${employee.id}`}>
              <h1>{name}</h1>
            </Link>
            <p>{employee.department}</p>
            <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
          </div>
        );
      })}
      <Link to={`/newemployee`}>
        <button>Add New Employee</button>
      </Link>
    </div>
  );
};

AllEmployeesView.propTypes = {
  allEmployees: PropTypes.array.isRequired,
};

export default AllEmployeesView;
