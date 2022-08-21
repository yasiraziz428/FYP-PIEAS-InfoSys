import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Employee = () => {
  const [employee, setEmployee] = useState([]);

  const allDepartments = "All Departments";
  const allDesignations = "All Designations";

  const [designation, setDesignation] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(allDepartments);
  const [selectedDesignation, setSelectedDesignation] =
    useState(allDesignations);

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    const result = await axios.get("http://localhost:3003/employees");
    console.log(result);
    setEmployee(result.data.reverse());
    //Populating Designations
    const set = new Set(
      result.data
        .filter((d) => d.designation && d.designation !== "")
        .map((d) => d.designation)
    );
    const array = [...set].sort();
    setDesignation(array);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3003/employees/${id}`);
    loadEmployee();
  };

  const onSelectDepartment = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const onSelectDesignation = (e) => {
    setSelectedDesignation(e.target.value);
  };
  return (
    <div className="container">
      <Link to="/employee/add" className="btn btn-outline-dark float-end mt-4">
        Add Employee <i class="fa fa-plus"></i>
      </Link>
      <div>
        <select
          className="mt-5"
          onChange={onSelectDepartment}
          value={selectedDepartment}
        >
          <option>{allDepartments}</option>
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
        <select
          className="mt-5 ms-2"
          onChange={onSelectDesignation}
          value={selectedDesignation}
        >
          <option>{allDesignations}</option>
          {designation.map((designation) => (
            <option>{designation}</option>
          ))}
        </select>
      </div>
      <table className="table caption-top border shadow mt-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employee
            ? employee
                .filter(
                  (c) =>
                    (selectedDepartment !== allDepartments
                      ? c.department === selectedDepartment
                      : true) &&
                    (selectedDesignation !== allDesignations
                      ? c.designation === selectedDesignation
                      : true)
                )
                .map((employees, index) => (
                  <tr>
                    <th>{index + 1}</th>
                    <td>{employees.employeeName}</td>
                    <td>{employees.department}</td>
                    <td>{employees.designation}</td>
                    <td>
                      <Link
                        className="btn btn-outline-primary me-2"
                        to={`/employee/edit/${employees.id}`}
                      >
                        <i class="fa fa-pen"></i>
                      </Link>
                      <Link
                        className="btn btn-outline-danger"
                        to="#"
                        onClick={() => deleteUser(employees.id)}
                      >
                        <i class="fa fa-trash"></i>
                      </Link>
                    </td>
                  </tr>
                ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default Employee;
