import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  let navigate = useNavigate();
  const [course, setCourse] = useState({
    degree: "",
    courseNo: "",
    courseTitle: "",
    program: "",
    theory: "",
    lab: "",
  });

  const { degree, courseNo, courseTitle, program, theory, lab } = course;

  const onInputChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3003/courses", course);
    navigate("/course");
    console.log("Submitted!");
  };

  return (
    <div className="container w-50 shadow px-5 pb-5">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="rendered-form mt-5">
          <h1 className="text-center pt-4">Add Course</h1>

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
                PhD
              </option>
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
          <div className="formbuilder-text form-group field-text-1654851224189">
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
          <div className="formbuilder-select form-group field-DeptartmentList">
            <label for="DeptartmentList" className="formbuilder-select-label">
              Department
            </label>
            <select
              className="form-control"
              name="program"
              id="programList"
              value={program}
              onChange={(e) => onInputChange(e)}
            >
              <option selected="true" id="programList-0">
                Select
              </option>
              <option id="programList-1" value="ME">
                Mechanical Engineering
              </option>
              <option id="programList-2" value="EE">
                Electrical Engineering
              </option>
              <option id="programList-3" value="CIS">
                Computer and Information Sciences
              </option>
              <option id="programList-4" value="PHY">
                Physics
              </option>
              <option id="programList-5" value="CHE">
                Chemical Engineering
              </option>
              <option id="programList-6" value="MME">
                Metallurgy &amp; Materials Engineering
              </option>
            </select>
          </div>
          <div className="formbuilder-text form-group mt-5 field-text-1654851224189">
            <label for="text-1654851224189" className="formbuilder-text-label">
              Theory Credit Hours
            </label>
            <input
              type="number"
              placeholder="Theory Credits"
              className="form-control"
              name="theory"
              value={theory}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="formbuilder-text form-group field-text-1654851224189">
            <label for="text-1654851224189" className="formbuilder-text-label">
              Lab Credit Hours
            </label>
            <input
              type="number"
              placeholder="Lab Credits"
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
              Add Course
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
