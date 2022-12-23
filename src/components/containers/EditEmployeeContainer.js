import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { fetchEmployeeThunk, editEmployeeThunk, fetchAllTasksThunk  } from '../../store/thunks';

class EditEmployeeContainer extends Component {
    constructor(props){
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

    handleSubmit = event => {
        event.preventDefault();
        //implementing form validation
        if (this.state.firstname === "" ) {
          this.setState({error: "Must enter a first name!"});
          return;
        }
        else if(this.state.lastname === ""){
          this.setState({error: "Must enter a last name!"});
          return;
        }
        else if(this.state.department === ""){
          this.setState({error: "Employees must be in a department!"});
          return;
        }

        //get new info for employee from form input
        let employee = {
            id: this.props.employee.id,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            department: this.state.department,
            taskId: this.state.taskId
        };
        
        this.props.editEmployee(employee);

        this.setState({
          redirect: true, 
          redirectId: this.props.employee.id
        });

    }

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});

    }

    render() {
        let { employee, allTasks, editEmployee, fetchEmployee} = this.props;
        let assignedTask = employee.taskId;

        let otherTasks = allTasks.filter(task => task.id!==assignedTask);
      
        //go to single employee view of the edited employee
        if(this.state.redirect) {
          return (
            <Redirect 
              to={`/employee/${this.state.redirectId}`}
            />
          )
        }

        return (
          <div>
          <form style={{textAlign: 'center'}} onSubmit={(e) => this.handleSubmit(e)}>
              <label style= {{color:'#11153e', fontWeight: 'bold'}}>First Name: </label>
              <input type="text" name="firstname" value={this.state.firstname || ''} placeholder={employee.firstname} onChange ={(e) => this.handleChange(e)}/>
              <br/>

              <label style={{color:'#11153e', fontWeight: 'bold'}}>Last Name: </label>
              <input type="text" name="lastname" value={this.state.lastname || ''} placeholder={employee.lastname} onChange={(e) => this.handleChange(e)}/>
              <br/>

              <label style={{color:'#11153e', fontWeight: 'bold'}}>Department: </label>
              <input type="text" name="department" value={this.state.department || ''} placeholder={employee.department} onChange={(e) => this.handleChange(e)}/>
              <br/>

              <button type="submit">
                Submit
              </button>

            </form>
            { this.state.error !=="" && <p>{this.state.error}</p> }

          </div>
        )
    }
}

// map state to props
const mapState = (state) => {
    return {
      employee: state.employee,
      allTasks: state.allTasks
    };
  };

const mapDispatch = (dispatch) => {
    return({
        editEmployee: (employee) => dispatch(editEmployeeThunk(employee)),
        fetchEmployee: (id) => dispatch(fetchEmployeeThunk(id)),
        fetchTasks: () => dispatch(fetchAllTasksThunk()),

    })
}

export default connect(mapState, mapDispatch)(EditEmployeeContainer);