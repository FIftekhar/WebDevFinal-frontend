/** @format */

import { Component } from "react";
import { connect } from "react-redux";

import { fetchAllCoursesThunk, deleteCourseThunk } from "../../store/thunks";

import AllCoursesView from "../views/AllCoursesView";

class AllCoursesContainer extends Component {
  componentDidMount() {
    this.props.fetchAllCourses();
  }
  render() {
    return (
      <div>
        <AllCoursesView
          courses={this.props.allCourses}
          deleteCourse={this.props.deleteCourse}
        />
      </div>
    );
  }
}

// Map state to props;
const mapState = (state) => {
  return {
    allCourses: state.allCourses,
  };
};

  return (
    <div>
      {courses.map((course) => {
        let title = course.title;
        return (
          <div key={course.id}>
            <Link to={`/course/${course.id}`}>
              <h1>{title}</h1>
            </Link>
            <button onClick={() => deleteCourse(course.id)}>Delete</button>
          </div>
        );
      })}
      <Link to={`/newcourse`}>
        <button>Add New Course</button>
      </Link>
    </div>
  );
};

export default connect(mapState, mapDispatch)(AllCoursesContainer);
