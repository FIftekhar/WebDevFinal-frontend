/** @format **/

const AllCoursesView = (props) => {
  let { courses, deleteCourse } = props;
  //courses = [{id: 300, title: "hello"}]
  if (!courses.length) {
    return (
      <div>
        <p>There are no courses.</p>
        <Link to={`/newcourse`}>
          <button>Add New Course</button>
        </Link>
      </div>
    );
  }


};

export default AllCoursesView;
