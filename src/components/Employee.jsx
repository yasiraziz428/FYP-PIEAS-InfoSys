import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Employee = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
    console.log("Data received1");
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3003/employees");
    console.log(result);
    setUser(result.data.reverse());
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3003/employees/${id}`);
    loadUsers();
  };
  return (
    <div className="container">
      <Link
        to="/employee/add"
        className="btn btn-outline-dark position-relative mt-3 end-0"
      >
        Add Employee
      </Link>
      <table className="table caption-top border shadow mt-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Deptartment</th>
            <th>Designation</th>
            <th>Managerial Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users
            ? users.map((employees, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{employees.employeeName}</td>
                  <td>{employees.department}</td>
                  <td>{employees.designation}</td>
                  <td>{employees.managerialPosition}</td>
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
