/** @format */

import { Component } from "react";
import { connect } from "react-redux";

import { fetchAllTasksThunk, deleteTaskThunk } from "../../store/thunks";

import AllTasksView from "../views/AllTasksView";

class AllTasksContainer extends Component {
  componentDidMount() {
    this.props.fetchAllTasks();
  }
  render() {
    return (
      <div>
        <AllTasksView
          tasks={this.props.allTasks}
          deleteTask={this.props.deleteTask}
        />
      </div>
    );
  }
}

// Map state to props;
const mapState = (state) => {
  return {
    allTasks: state.allTasks,
  };
};

return (
  <div>
    {tasks.map((task) => {
      let title = task.title;
      return (
        <div key={task.id}>
          <Link to={`/task/${task.id}`}>
            <h1>{title}</h1>
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

export default connect(mapState, mapDispatch)(AllTasksContainer);
