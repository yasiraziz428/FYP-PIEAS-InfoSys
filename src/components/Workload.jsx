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

    setWorkload(result.data.reverse());
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3003/workloads/${id}`);
    loadWorkload();
  };

  // function CalculateWorkload(
  //   wtotalCrHr,
  //   wNoOfstudents,
  //   wMP,
  //   wPS,
  //   wIJ,
  //   wNJ,
  //   wIC,
  //   wNC,
  //   wDG
  // ) {
  //   useEffect(() => {
  //     loadCourses();
  //   }, []);

  //   const loadCourses = async () => {
  //     const result = await axios.get("http://localhost:3003/courses");
  //     return result;
  //   };

  //   useEffect(() => {
  //     loadParameters();
  //   }, []);

  //   const loadParameters = async () => {
  //     const result = await axios.get("http://localhost:3003/parameters");
  //     return result;
  //   };

  //   return(loadCourses.result.theory * loadParameters.result.wtotalCrHr);
  // }

  return (
    <div className="container-fluid ">
      <Link
        to="/workload/add"
        className="btn btn-outline-dark position-relative mt-3 end-0"
      >
        Add Workload
      </Link>
      <br></br>
      <select className="mt-5">
        <option>All Years</option>
        <option></option>
      </select>
      <select className="ms-2 mt-2">
        <option>All Semesters</option>
        <option></option>
      </select>
      <select className="mt-5 ms-2">
        <option>All Deptartments</option>
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
      <table className="table caption-top border shadow mt-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Semester</th>
            <th>Year</th>
            <th>Employee</th>
            <th>Course 1</th>
            <th>Course 2</th>
            <th>Course 3</th>
            <th>Managerial Position</th>
            <th>Number of Students</th>
            <th>Project Supervisions</th>
            <th>Research Project (Million)</th>
            <th>International Journal</th>
            <th>National Journal</th>
            <th>International Conference</th>
            <th>National Conference</th>
            <th>General / Conference Reviewer</th>
            <th>Book</th>
            <th>Technical Report</th>
            <th>Chapter</th>
            <th>Development of Product</th>
            <th>Patent</th>
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
                  <td>{workloads.employeeName}</td>
                  <td>{workloads.courseTitle1}</td>
                  <td>{workloads.courseTitle2}</td>
                  <td>{workloads.courseTitle3}</td>
                  <td>{workloads.managerialPosition}</td>
                  <td>{workloads.noOfStudents}</td>
                  <td>{workloads.projectSupervisions}</td>
                  <td>{workloads.researchProject}</td>
                  <td>{workloads.intJournal}</td>
                  <td>{workloads.nationalJournal}</td>
                  <td>{workloads.intConference}</td>
                  <td>{workloads.nationalConference}</td>
                  <td>{workloads.GCR}</td>
                  <td>{workloads.book}</td>
                  <td>{workloads.technicalReport}</td>
                  <td>{workloads.chapter}</td>
                  <td>{workloads.devOfProd}</td>
                  <td>{workloads.patent}</td>
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
