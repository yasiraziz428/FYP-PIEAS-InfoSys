import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
  let navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState({
    employeeName: "",
    department: "",
    designation: "",
  });
  const [designations, setDesignations] = useState([]);

  const { employeeName, department, designation } = employee;

  const onInputChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadEmployee();
    loadDesignations();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3003/employees/${id}`, employee);
    navigate("/employee");
    console.log("Submitted!");
  };

  const loadEmployee = async () => {
    const result = await axios.get(`http://localhost:3003/employees/${id}`);
    setEmployee(result.data);
  };

  const loadDesignations = async () => {
    const result = await axios.get("http://localhost:3003/designations");
    setDesignations(result.data);
  };

  return (
    <div className="container w-50 shadow px-5 pb-5">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="rendered-form mt-5">
          <h1 className="text-center pt-4">Edit Employee</h1>
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
              <option id="DeptartmentList-6" value="NE">
                Nuclear Engineering
              </option>
              <option id="DeptartmentList-7" value="MS">
                Medical Sciences
              </option>
              <option id="DeptartmentList-8" value="MME">
                Metallurgy &amp; Materials Engineering
              </option>
              <option id="DeptartmentList-9" value="CMS">
                Communication and Management Sciences
              </option>
              <option id="DeptartmentList-10" value="Chemistry">
                Chemistry
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
              {designations.map((d) => (
                <option id="DesignationList-1" value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <div className="formbuilder-button form-group field-submitButton">
            <button
              className="btn-dark btn form-control mt-4"
              type="submit"
              name="submitButton"
              id="submitButton"
            >
              Update Employee
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
