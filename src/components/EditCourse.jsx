import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditCourse = () => {
  let navigate = useNavigate();
  const { id } = useParams();

  const [course, setCourse] = useState({
    degree: "",
    dept: "",
    courseNo: "",
    courseTitle: "",
    program: "",
    theory: "",
    lab: "",
  });

  const [programs, setPrograms] = useState([]);

  const { degree, courseNo, courseTitle, program, theory, lab, dept } = course;

  const onInputChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadCourses();
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    const result = await axios.get("http://localhost:3003/programs");
    setPrograms(result.data);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3003/courses/${id}`, course);
    navigate("/course");
    console.log("Submitted!");
  };

  const loadCourses = async () => {
    const result = await axios.get(`http://localhost:3003/courses/${id}`);
    setCourse(result.data);
  };

  return (
    <div className="container w-50 shadow px-5 pb-5">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="rendered-form mt-5">
          <h1 className="text-center pt-4">Edit Course</h1>

          <div className="formbuilder-select form-group field-degreeList">
            <label for="degreeList" className="formbuilder-select-label">
              Degree
            </label>
            <select
              className="form-control"
              name="degree"
              id="degreeList"
              value={degree}
              onChange={(e) => onInputChange(e)}
            >
              <option selected="true" id="degreeList-0">
                Select
              </option>
              <option id="degreeList-1" value="BS">
                BS
              </option>
              <option id="degreeList-2" value="MS">
                MS
              </option>
              <option id="degreeList-3" value="PhD">
                PHD
              </option>
            </select>
          </div>
          <div className="formbuilder-select form-group field-DeptartmentList">
            <label for="DeptartmentList" className="formbuilder-select-label">
              Department
            </label>
            <select
              className="form-control"
              name="dept"
              id="programList"
              value={dept}
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
          <div className="formbuilder-select form-group field-degreeList">
            <label for="degreeList" className="formbuilder-select-label">
              Program
            </label>
            <select
              className="form-control"
              name="program"
              value={program}
              onChange={(e) => onInputChange(e)}
            >
              <option selected="true">Select</option>
              {programs.map((d) => (
                <option value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          <div className="formbuilder-text form-group mt-5 field-text-1654851224189">
            <label for="text-1654851224189" className="formbuilder-text-label">
              Course No
            </label>
            <input
              type="text"
              placeholder=""
              className="form-control"
              name="courseNo"
              value={courseNo}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="formbuilder-text form-group mt-5 field-text-1654851224189">
            <label for="text-1654851224189" className="formbuilder-text-label">
              Course Title
            </label>
            <input
              type="text"
              placeholder="Course Title"
              className="form-control"
              name="courseTitle"
              value={courseTitle}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="formbuilder-text form-group mt-5 field-text-1654851224189">
            <label for="text-1654851224189" className="formbuilder-text-label">
              Theory Credit Hours
            </label>
            <input
              type="number"
              placeholder="Credit Hour"
              className="form-control"
              name="theory"
              value={theory}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="formbuilder-text form-group mt-5 field-text-1654851224189">
            <label for="text-1654851224189" className="formbuilder-text-label">
              Lab Credit Hours
            </label>
            <input
              type="number"
              placeholder="Credit Hours"
              className="form-control"
              name="lab"
              value={lab}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="formbuilder-button form-group field-submitButton">
            <button
              className="btn-dark btn form-control mt-4"
              type="submit"
              name="submitButton"
              id="submitButton"
            >
              Update Course
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
