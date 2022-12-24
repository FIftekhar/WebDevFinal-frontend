/** @format */

import { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import {
  fetchTaskThunk,
  editTaskThunk,
  fetchAllEmployeesThunk,
} from "../../store/thunks";

/*
IMPORTANT: comments regarding implementation details!!
=====================================================
You'll see that we have two ways of interacting with the UI
in order to change the task's employee
The dropdown menu is straighforward, it's pretty much the same 
as having the input field for the employeeId but allows us
to actually see the available insutrctors as well as their names, 
not just their IDs. We did have to connect to the allEmployees state
from the Redux store, as well as fetchAllEmployees in componentDidMount().
This was done so we could get the other employees in the database.
We filter out the current employee from the array at the beginning of 
the render function, and use this array to populate the dropdown menu
options. Because it's part of the form, we don't need to modify the 
handleSubmit function. On redirect to the TaskView we will see the 
updates.
You will see below the form there is another part of the UI that is
also changing the current task's employee. This structure is similar
to how changing assigned tasks is done in the InstrutcorView. There is
a slight drawback to using this approach in this context. When we perform
an EDIT_TASK action (initiated by calling the editTaskThunk), this action
is sent to the allTasks reducer, not the task reducer. For that reason, 
we will not see the updates in the single task view unless there is another 
call to the fetchTaskThunk. This is done once when we redirect after form
submission, which is why the data is shown without needing to refresh. 
If we want that same functionality within the container, we need to make
a call to fetchTask after each editTask. We see that in the onClick
functionality of the buttons controlling that portion of the UI. 
*/

class EditTaskContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      prioritylevel: "",
      completionstatus: "",
      employeeId: null,
      redirect: false,
      redirectId: null,
      error: "",
    };
  }

  componentDidMount() {
    //getting task ID from url

    this.props.fetchTask(this.props.match.params.id);
    this.props.fetchEmployees();
    this.setState({
      description: this.props.task.description,
      prioritylevel: this.props.task.prioritylevel,
      completionstatus: this.props.task.completionstatus,
      employeeId: this.props.task.employeeId,
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSelectChange = (event) => {
    //handle change for the dropdown menu
    //want to set the employeeId based on the selected choice
    //when the form gets submitted, this is how we can change
    //assigned employee without having to manually enter in the
    //employeeId like before
    if (event.target.value === "staff") {
      this.setState({ employeeId: null });
    } else {
      this.setState({ employeeId: event.target.value });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    //implementing form validation
    if (this.state.description === "") {
      this.setState({ error: "Error: Description cannot be empty" });
      return;
    } else if (this.state.prioritylevel === "") {
      this.setState({ error: "Error: Priority Level cannot be empty" });
      return;
    } else if (this.state.completionstatus === "") {
      this.setState({ error: "Error: Completition Status cannot be empty" });
      return;
    }
    if (this.state.prioritylevel === "") {
      this.setState({ error: "Error: Priority Level cannot be empty" });
      return;
    }
    if (this.state.completionstatus === "") {
      this.setState({ error: "Error: Completion Status cannot be empty" });
      return;
    }
    //get new info for task from form input
    let task = {
      id: this.props.task.id,
      description: this.state.description,
      prioritylevel: this.state.prioritylevel,
      completionstatus: this.state.completionstatus,
      employeeId: this.state.employeeId,
    };

    this.props.editTask(task);

    this.setState({
      redirect: true,
      redirectId: this.props.task.id,
    });
  };

  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }

  render() {
    let { task, allEmployees, editTask, fetchTask } = this.props;
    let assignedEmployee = task.employeeId;

    let otherEmployees = allEmployees.filter(
      (employee) => employee.id !== assignedEmployee
    );

    //go to single task view of the edited task
    if (this.state.redirect) {
      return <Redirect to={`/task/${this.state.redirectId}`} />;
    }

    return (
      <div>
        <form
          style={{ textAlign: "center" }}
          onSubmit={(e) => this.handleSubmit(e)}>
          <label style={{ color: "#11153e", fontWeight: "bold" }}>
            Description:{" "}
          </label>
          <input
            type="text"
            name="description"
            value={this.state.description || ""}
            placeholder={task.description}
            onChange={(e) => this.handleChange(e)}
          />
          <br />

          <label style={{ color: "#11153e", fontWeight: "bold" }}>
            Priority Level:{" "}
          </label>
          <input
            type="text"
            name="prioritylevel"
            value={this.state.prioritylevel || ""}
            placeholder={task.prioritylevel}
            onChange={(e) => this.handleChange(e)}
          />
          <br />

          <label style={{ color: "#11153e", fontWeight: "bold" }}>
            Completion Status:{" "}
          </label>
          <input
            type="text"
            name="completionstatus"
            value={this.state.completionstatus || ""}
            placeholder={task.completionstatus}
            onChange={(e) => this.handleChange(e)}
          />
          <br />

          <select onChange={(e) => this.handleSelectChange(e)}>
            {task.employee !== null ? (
              <option value={task.employeeId}>
                {task.employee.firstname + " (current)"}
              </option>
            ) : (
              <option value="staff">Staff</option>
            )}
            {otherEmployees.map((employee) => {
              return (
                <option value={employee.id} key={employee.id}>
                  {employee.firstname}
                </option>
              );
            })}
            {task.employee !== null && <option value="staff">Staff</option>}
          </select>

          <button type="submit">Submit</button>
        </form>
        {this.state.error !== "" && <p>{this.state.error}</p>}

        {task.employeeId !== null ? (
          <div>
            {" "}
            Current employee:
            <Link to={`/employee/${task.employeeId}`}>
              {task.employee.firstname}
            </Link>
            <button
              onClick={async () => {
                await editTask({ id: task.id, employeeId: null });
                fetchTask(task.id);
              }}>
              Unassign
            </button>
          </div>
        ) : (
          <div> No employee currently assigned </div>
        )}

        <div>
          {" "}
          Other employees
          {otherEmployees.map((employee) => {
            return (
              <div key={employee.id}>
                <Link to={`/employee/${employee.id}`}>
                  <h4>{employee.firstname}</h4>
                </Link>
                <button
                  onClick={async () => {
                    await editTask({ id: task.id, employeeId: employee.id });
                    fetchTask(task.id);
                  }}>
                  Assign this employee
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

// map state to props
const mapState = (state) => {
  return {
    task: state.task,
    allEmployees: state.allEmployees,
  };
};

const mapDispatch = (dispatch) => {
  return {
    editTask: (task) => dispatch(editTaskThunk(task)),
    fetchTask: (id) => dispatch(fetchTaskThunk(id)),
    fetchEmployees: () => dispatch(fetchAllEmployeesThunk()),
  };
};

export default connect(mapState, mapDispatch)(EditTaskContainer);
