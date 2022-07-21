import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Workload = () => {
  const [workload, setWorkload] = useState([]);

  useEffect(() => {
    loadWorkload();
  }, []);

  const loadWorkload = async () => {
    const result = await axios.get("http://localhost:3003/workloads");
    console.log(result);
    setWorkload(result.data.reverse());
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3003/workloads/${id}`);
    loadWorkload();
  };

  return (
    <div className="container">
      <Link
        to="/workload/add"
        className="btn btn-outline-dark position-relative mt-3 end-0"
      >
        Add Workload
      </Link>
      <table className="table caption-top border shadow mt-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Semester</th>
            <th>Year</th>
            <th>Employee</th>
            <th>Course</th>
            <th>Number of Students</th>
            <th>Project Supervisions</th>
            <th>International Journal</th>
            <th>National Journal</th>
            <th>International Conference</th>
            <th>National Conference</th>
            <th>Workload</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workload
            ? workload.map((workloads, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{workloads.semester}</td>
                  <td>{workloads.year}</td>
                  <td>{workloads.employee}</td>
                  <td>{workloads.course}</td>
                  <td>{workloads.noOfStudents}</td>
                  <td>{workloads.projectSupervisions}</td>
                  <td>{workloads.intJournal}</td>
                  <td>{workloads.nationalJournal}</td>
                  <td>{workloads.intConference}</td>
                  <td>{workloads.nationalConference}</td>
                  <td>{workloads.workLoad}</td>
                  <td>
                    <Link
                      className="btn btn-outline-primary me-2"
                      to={`/workload/edit/${workloads.id}`}
                    >
                      <i class="fa fa-pen"></i>
                    </Link>
                    <Link
                      className="btn btn-outline-danger"
                      to="#"
                      onClick={() => deleteUser(workloads.id)}
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

export default Workload;
