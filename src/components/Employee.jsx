import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Employee = () => {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    const result = await axios.get("http://localhost:3003/employees");
    console.log(result);
    setEmployee(result.data.reverse());
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3003/employees/${id}`);
    loadEmployee();
  };

  return (
    <div className="container">
      <Link
        to="/employee/add"
        className="btn btn-outline-dark position-relative mt-3 end-0"
      >
        Add Employee
      </Link>
      <br></br>
      <div>
        <select>
          <option selected="true" id="degreeList-0">
            All Degrees
          </option>
          <option id="degreeList-1" value="BS">
            BS
          </option>
          <option id="degreeList-2" value="MS">
            MS
          </option>
          <option id="degreeList-3" value="PhD">
            PhD
          </option>
        </select>
        <select className="ms-2 mt-5">
          <option>All Depts</option>
          <option id="DeptartmentList-1" value="ME">
            ME
          </option>
          <option id="DeptartmentList-2" value="EE">
            EE
          </option>
          <option id="DeptartmentList-3" value="CIS">
            CIS
          </option>
          <option id="DeptartmentList-4" value="PHY">
            PHY
          </option>
          <option id="DeptartmentList-5" value="CHE">
            CHE
          </option>
          <option id="DeptartmentList-6" value="MME">
            MME
          </option>
          <option id="DeptartmentList-7" value="NE">
            NE
          </option>
          <option id="DeptartmentList-8" value="MS">
            MS
          </option>
          <option id="DeptartmentList-9" value="CMS">
            CMS
          </option>
          <option id="DeptartmentList-10" value="Chemistry">
            Chemistry
          </option>
        </select>
        <select className="ms-2">
          <option>All Designations</option>
          <option>Regular Faculty</option>
          <option>Visiting Faculty A</option>
          <option>Visiting Faculty B</option>
          <option>Visiting Faculty C</option>
          <option>Visiting Faculty D</option>
          <option>TA/Lab Engineer A</option>
          <option>TA/Lab Engineer B</option>
        </select>
      </div>
      <table className="table caption-top border shadow mt-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Deptartment</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employee
            ? employee.map((employees, index) => (
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
