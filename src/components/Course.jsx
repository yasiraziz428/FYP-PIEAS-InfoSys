import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Course = () => {
  const [course, setCourse] = useState([]);

  useEffect(() => {
    loadCourse();
  }, []);

  const loadCourse = async () => {
    const result = await axios.get("http://localhost:3003/courses");
    console.log(result);
    setCourse(result.data.reverse());
  };

  const deleteCourse = async (id) => {
    await axios.delete(`http://localhost:3003/courses/${id}`);
    loadCourse();
  };

  return (
    <div className="container">
      <Link
        to="/course/add"
        className="btn btn-outline-dark position-relative mt-3 end-0"
      >
        Add Course
      </Link>
      <br></br>
      <select>
        <option>All Degrees</option>
        <option>BS</option>
        <option>MS</option>
        <option>PhD</option>
      </select>
      <select className="mt-5 ms-2">
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
        <option>All Courses</option>
        <option>Theory</option>
        <option>Lab</option>
      </select>
      <table className="table caption-top border shadow mt-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Degree</th>
            <th>Course No</th>
            <th>Title</th>
            <th>Program/Deptartment</th>
            <th>Theory</th>
            <th>Lab</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {course
            ? course.map((courses, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{courses.degree}</td>
                  <td>{courses.courseNo}</td>
                  <td>{courses.courseTitle}</td>
                  <td>{courses.program}</td>
                  <td>{courses.theory}</td>
                  <td>{courses.lab}</td>
                  <td>
                    <Link
                      className="btn btn-outline-primary me-2"
                      to={`/course/edit/${courses.id}`}
                    >
                      <i class="fa fa-pen"></i>
                    </Link>
                    <Link
                      className="btn btn-outline-danger"
                      to="#"
                      onClick={() => deleteCourse(courses.id)}
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

export default Course;
