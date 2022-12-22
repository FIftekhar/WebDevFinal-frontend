

const AllInstructorsView = (props) => {
  if (!props.allInstructors.length) {
    return <div>There are no instructors.</div>;
  }
};

AllInstructorsView.propTypes = {
  allInstructors: PropTypes.array.isRequired,
};

export default AllInstructorsView;
