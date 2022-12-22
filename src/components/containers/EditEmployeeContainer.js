import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { fetchEmployeeThunk, editEmployeeThunk, fetchAllTasksThunk  } from '../../store/thunks';

class EditEmployeeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            department: "",
            taskId: null,
            redirect: false,
            redirectId: null,
            error: ""
        };
    }

    componentDidMount() {
        this.props.fetchEmployee(this.props.match.params.id);
        this.props.fetchTasks();
        this.setState({
            firstname: this.props.employee.firstname, 
            lastname: this.props.employee.lastname,
            department: this.props.employee.department,
            taskId: this.props.employee.taskId, 
        });
    }

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }
  
    handleSelectChange = event => {
       
        if (event.target.value === "not assigned to anything") {
            this.setState({taskId:null});
        } else {
            this.setState({taskId: event.target.value})
        }
    }
}