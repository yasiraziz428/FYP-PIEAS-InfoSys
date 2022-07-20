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
      <table className="table caption-top border shadow mt-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Degree</th>
            <th>Course No</th>
            <th>Title</th>
            <th>Program</th>
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
