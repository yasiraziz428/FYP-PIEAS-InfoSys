import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  let navigate = useNavigate();
  const [employee, setEmployee] = useState({
    employeeName: "",
    department: "",
    designation: "",
    managerialPosition: "",
  });

  const { employeeName, department, designation, managerialPosition } =
    employee;

  const onInputChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3003/employees", employee);
    navigate("/employee");
    console.log("Submitted!");
  };

  return (
    <div className="container w-50 shadow px-5 pb-5">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="rendered-form mt-5">
          <h1 className="text-center pt-4">Add Employee</h1>
          <div className="formbuilder-text form-group mt-5 field-text-1654851224189">
            <label for="text-1654851224189" className="formbuilder-text-label">
              Employee Name
            </label>
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              name="employeeName"
              value={employeeName}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="formbuilder-select form-group field-DeptartmentList">
            <label for="DeptartmentList" className="formbuilder-select-label">
              Department
            </label>
            <select
              className="form-control"
              name="department"
              id="DeptartmentList"
              value={department}
              onChange={(e) => onInputChange(e)}
            >
              <option selected="true" id="DeptartmentList-0">
                Select
              </option>
              <option id="DeptartmentList-1" value="ME">
                Mechanical Engineering
              </option>
              <option id="DeptartmentList-2" value="EE">
                Electrical Engineering
              </option>
              <option id="DeptartmentList-3" value="CIS">
                Computer and Information Sciences
              </option>
              <option id="DeptartmentList-4" value="PHY">
                Physics
              </option>
              <option id="DeptartmentList-5" value="CHE">
                Chemical Engineering
              </option>
              <option id="DeptartmentList-6" value="MME">
                Metallurgy &amp; Materials Engineering
              </option>
            </select>
          </div>
          <div className="formbuilder-select form-group field-DesignationList">
            <label for="DesignationList" className="formbuilder-select-label">
              Designation
            </label>
            <select
              className="form-control"
              name="designation"
              id="DesignationList"
              value={designation}
              onChange={(e) => onInputChange(e)}
            >
              <option selected="true" id="DesignationList-0">
                Select
              </option>
              <option id="DesignationList-1" value="RF">
                Regular Faculty
              </option>
              <option id="DesignationList-2" value="VF">
                Visiting Faculty
              </option>
              <option id="DesignationList-3" value="TA">
                TA / Lab Engr.
              </option>
            </select>
          </div>
          <div className="formbuilder-select form-group field-MPList">
            <label for="MPList" className="formbuilder-select-label">
              Managerial Position
            </label>
            <select
              className="form-control"
              name="managerialPosition"
              id="MPList"
              value={managerialPosition}
              onChange={(e) => onInputChange(e)}
            >
              <option selected="true" id="MPList-0">
                Select
              </option>
              <option id="MPList-1" value="HOD">
                Head of Department
              </option>
              <option id="MPList-2" value="CC">
                Course Coordinator
              </option>
              <option id="MPList-3" value="DEAN">
                DEAN
              </option>
              <option id="MPList-4" value="PC">
                Project Coordinator
              </option>
              <option id="MPList-5" value="FP">
                Focal Person
              </option>
            </select>
          </div>
          <div className="formbuilder-button form-group field-submitButton">
            <button
              className="btn-dark btn form-control mt-4"
              type="submit"
              name="submitButton"
              id="submitButton"
            >
              Add Employee
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
