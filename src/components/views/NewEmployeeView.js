/** @format */

const NewEmployeeView = (props) => {
  const { handleChange, handleSubmit, error } = props;
  return (
    <div className="root">
      <div className="formContainer">
        <div className="formTitle">
          <h2
            style={{
              fontWeight: "bold",
              fontFamily: "Courier, sans-serif",
              fontSize: "20px",
              color: "#11153e",
            }}>
            New Employee
          </h2>
        </div>
      </div>
    </div>
  );
};
