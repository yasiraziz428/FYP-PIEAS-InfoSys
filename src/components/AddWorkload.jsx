import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddWorkload = () => {
  let navigate = useNavigate();
  const [workload, setWorkload] = useState({
    semester: "",
    year: "",
    employee: "",
    course: "",
    noOfStudents: "",
    projectSupervisions: "",
    intJournal: "",
    nationalJournal: "",
    intConference: "",
    nationalConference: "",
  });

  const {
    semester,
    year,
    employee,
    course,
    noOfStudents,
    projectSupervisions,
    intJournal,
    nationalJournal,
    intConference,
    nationalConference,
  } = workload;

  const onInputChange = (e) => {
    setWorkload({ ...workload, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3003/workloads", workload);
    navigate("/workload");
    console.log("Submitted!");
  };

  return (
    <div className="container w-50 shadow px-5 pb-5">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="rendered-form mt-5">
          <h1 className="text-center pt-4">Add Workload</h1>
          <div className="formbuilder-select form-group field-SemesterList">
            <label for="SemesterList" className="formbuilder-select-label">
              Semester
            </label>
            <select
              className="form-control"
              name="semester"
              id="semester"
              value={semester}
              onChange={(e) => onInputChange(e)}
            >
              <option selected="true" id="SemesterList-0">
                Select
              </option>
              <option id="SemesterList-1" value="Spring">
                Spring
              </option>
              <option id="SemesterList-2" value="Fall">
                Fall
              </option>
            </select>
          </div>
          <div className="formbuilder-text form-group field-text-1654851224189">
            <label for="text-1654851224189" className="formbuilder-text-label">
              Year
            </label>
            <input
              type="text"
              placeholder="Year"
              className="form-control"
              name="year"
              value={year}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="formbuilder-select  mt-5 form-group field-EmployeeList">
            <label for="EmployeeList" className="formbuilder-select-label">
              Select Employee
            </label>
            <select
              className="form-control"
              name="employee"
              id="employee"
              value={employee}
              onChange={(e) => onInputChange(e)}
            >
              <option selected="true" id="DesignationList-0">
                Select
              </option>
            </select>
          </div>
          <div className="formbuilder-select form-group field-CourseList">
            <label for="CourseList" className="formbuilder-select-label">
              Select Course
            </label>
            <select
              className="form-control"
              name="course"
              id="course"
              value={course}
              onChange={(e) => onInputChange(e)}
            >
              <option selected="true" id="DesignationList-0">
                Select
              </option>
            </select>
          </div>
          <div className="formbuilder-select form-group field-CourseList">
            <label for="CourseList" className="formbuilder-select-label">
              Select Course 2
            </label>
            <select
              className="form-control"
              name="course"
              id="course"
              value={course}
              onChange={(e) => onInputChange(e)}
            >
              <option selected="true" id="DesignationList-0">
                Select
              </option>
            </select>
          </div>
          <div className="formbuilder-select form-group field-CourseList">
            <label for="CourseList" className="formbuilder-select-label">
              Select Course 3
            </label>
            <select
              className="form-control"
              name="course"
              id="course"
              value={course}
              onChange={(e) => onInputChange(e)}
            >
              <option selected="true" id="DesignationList-0">
                Select
              </option>
            </select>
          </div>
          <div className="formbuilder-text form-group mt-5 field-text-1654851224189">
            <label for="text-1654851224189" className="formbuilder-text-label">
              No of Students
            </label>
            <input
              type="number"
              placeholder="No of Students"
              className="form-control"
              name="noOfStudents"
              value={noOfStudents}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="formbuilder-text form-group mt-2 field-text-1654851224189">
            <label for="text-1654851224189" className="formbuilder-text-label">
              Project Supervisions
            </label>
            <input
              type="number"
              placeholder="Project Supervisions"
              className="form-control"
              name="projectSupervisions"
              value={projectSupervisions}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="formbuilder-text form-group mt-2 field-text-1654851224189">
            <label for="text-1654851224189" className="formbuilder-text-label">
              International Journal
            </label>
            <input
              type="number"
              placeholder="International Journal"
              className="form-control"
              name="intJournal"
              value={intJournal}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="formbuilder-text form-group mt-2 field-text-1654851224189">
            <label for="text-1654851224189" className="formbuilder-text-label">
              National Journal
            </label>
            <input
              type="number"
              placeholder="National Journal"
              className="form-control"
              name="nationalJournal"
              value={nationalJournal}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="formbuilder-text form-group mt-2 field-text-1654851224189">
            <label for="text-1654851224189" className="formbuilder-text-label">
              International Conference
            </label>
            <input
              type="number"
              placeholder="International Conference"
              className="form-control"
              name="intConference"
              value={intConference}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="formbuilder-text form-group mt-2 field-text-1654851224189">
            <label for="text-1654851224189" className="formbuilder-text-label">
              National Conference
            </label>
            <input
              type="number"
              placeholder="National Conference"
              className="form-control"
              name="nationalConference"
              value={nationalConference}
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
              Add Workload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddWorkload;
