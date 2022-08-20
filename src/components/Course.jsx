import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Course = () => {
  const [course, setCourse] = useState([]);
  const allDegrees = "All Degrees";
  const allPrograms = "All Programs";

  const [programs, setPrograms] = useState([]);
  const [selectedDegree, setSelectedDegree] = useState(allDegrees);
  const [selectedProgram, setSelectedProgram] = useState(allPrograms);

  useEffect(() => {
    loadCourse();
  }, []);

  const loadCourse = async () => {
    const result = await axios.get("http://localhost:3003/courses");
    console.log(result);
    setCourse(result.data.reverse());
    //Populating Programs
    const set = new Set(
      result.data
        .filter((d) => d.program && d.program !== "")
        .map((d) => d.program)
    );
    const array = [...set].sort();
    setPrograms(array);
  };

  const deleteCourse = async (id) => {
    await axios.delete(`http://localhost:3003/courses/${id}`);
    loadCourse();
  };

  const onSelectDegree = (e) => {
    setSelectedDegree(e.target.value);
  };

  const onSelectProgram = (e) => {
    setSelectedProgram(e.target.value);
  };

  return (
    <div className="container">
      <Link to="/course/add" className="btn btn-outline-dark float-end mt-5">
        Add Course
      </Link>
      <br></br>
      <select onChange={onSelectDegree} value={selectedDegree}>
        <option>{allDegrees}</option>
        <option>BS</option>
        <option>MS</option>
        <option>PhD</option>
      </select>
      <select
        className="mt-5 ms-2"
        onChange={onSelectProgram}
        value={selectedProgram}
      >
        <option>{allPrograms}</option>
        {programs.map((program) => (
          <option>{program}</option>
        ))}
      </select>

      <table className="table caption-top border shadow mt-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Degree</th>
            <th>Course No</th>
            <th>Title</th>
            <th>Department</th>
            <th>Program</th>
            <th>Theory</th>
            <th>Lab</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {course
            ? course
                .filter(
                  (c) =>
                    (selectedDegree !== allDegrees
                      ? c.degree === selectedDegree
                      : true) &&
                    (selectedProgram !== allPrograms
                      ? c.program === selectedProgram
                      : true)
                )
                .map((courses, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{courses.degree}</td>
                    <td>{courses.courseNo}</td>
                    <td>{courses.courseTitle}</td>
                    <td>{courses.dept}</td>
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
