/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTaskThunk, editEmployeeThunk } from "../../store/thunks";
import { TaskView } from "../views";

class TaskContainer extends Component {
  componentDidMount() {
    this.props.fetchTask(this.props.match.params.id);
  }

  render() {
    return (
      <TaskView task={this.props.task} editEmployee={this.props.editEmployee} />
    );
  }
}

// map state to props
const mapState = (state) => {
  return {
    task: state.task,
  };
};

// map dispatch to props
const mapDispatch = (dispatch) => {
  return {
    fetchTask: (id) => dispatch(fetchTaskThunk(id)),
    editEmployee: (employee) => dispatch(editEmployeeThunk(employee)),
  };
};

export default connect(mapState, mapDispatch)(TaskContainer);
