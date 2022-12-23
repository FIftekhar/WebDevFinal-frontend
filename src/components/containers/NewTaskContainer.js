import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NewTaskView from '../views/NewTaskView';
import { addTaskThunk } from '../../store/thunks';

class NewTaskContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          description: "", 
          prioritylevel: "",
          completionstatus: "", 
          employeeId: null, 
          redirect: false, 
          redirectId: null,
          error: ""
        };
    }

    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    handleSubmit = async event => {
        event.preventDefault();
        //dont need ID because the task has not been created yet
        if(this.state.description===""){
          this.setState({error:"Must include a description!"});
          return;
        }
        if(this.state.prioritylevel===""){
          this.setState({error:"Get your priorities straight!"});
          return;
        }
        if(this.state.completionstatus===""){
          this.setState({error:"You have to complete it at some point!"});
          return;
        }
        let task = {
            description: this.state.description,
            prioritylevel: this.state.prioritylevel,
            completionstatus: this.state.completionstatus,
            employeeId: this.state.employeeId
        };
        
        let newTask = await this.props.addTask(task);

        this.setState({
          redirect: true, 
          redirectId: newTask.id,
          error: ""
        });
    }

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }

    render() {
      //go to single task view of newly created task
        if(this.state.redirect) {
          return (<Redirect to={`/task/${this.state.redirectId}`}/>)
        }
        return (
          <NewTaskView 
            handleChange={this.handleChange} 
            handleSubmit={this.handleSubmit}
            error={this.state.error}      
          />
        );
    }
}

const mapDispatch = (dispatch) => {
    return({
        addTask: (task) => dispatch(addTaskThunk(task)),
    })
}

export default connect(null, mapDispatch)(NewTaskContainer);