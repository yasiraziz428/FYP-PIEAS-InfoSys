import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditWorkload = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [workload, setWorkload] = useState({
    semester: "",
    year: "",
    employeeName: "",
    courseTitle1: "",
    courseTitle2: "",
    courseTitle3: "",
    managerialPosition: "",
    noOfStudents: "",
    projectSupervisions: "",
    intJournal: "",
    nationalJournal: "",
    intConference: "",
    nationalConference: "",
    workLoad: "",
  });

  const {
    semester,
    year,
    employeeName,
    courseTitle1,
    courseTitle2,
    courseTitle3,
    managerialPosition,
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

  useEffect(() => {
    loadWorkload();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const courses_response = await axios.get("http://localhost:3003/courses");

    const parameters_response = await axios.get(
      "http://localhost:3003/parameters"
    );

    const courses = courses_response.data;
    const parameters = parameters_response.data;
    const title1 = workload["courseTitle1"];
    const title2 = workload["courseTitle2"];
    const title3 = workload["courseTitle3"];
    const selectedMP = workload["managerialPosition"];
    const wMP = parameters["wManagerialPosition"][selectedMP];
    const noS = workload["noOfStudents"];
    const wPS = workload["projectSupervisions"];
    const wIJ = workload["intJournal"];
    const wNJ = workload["nationalJournal"];
    const wIC = workload["intConference"];
    const wNC = workload["nationalConference"];

    const selectedCourses = [title1, title2, title3];

    const theories = [];
    const labs = [];
    selectedCourses.forEach((course) => {
      //console.log(courses);
      const courseObject = courses.find((c) => c.courseTitle === course); //getting courseTitle from every selected course
      theories.push(Number(courseObject.theory));
      labs.push(Number(courseObject.lab));
    });

    const sumTheories = theories.reduce((prev, curr) => prev + curr, 0);
    console.log("theories " + sumTheories);
    const sumLabs = labs.reduce((prev, curr) => prev + curr, 2);
    console.log("Labs " + sumLabs);
    console.log(Number(parameters["wNumberOfStudents"]));
    console.log(Number(parameters["wProjectSupervisions"]));
    console.log(Number(parameters["wInternationalJournal"]));
    console.log(Number(parameters["wNationalJournal"]));
    console.log(Number(parameters["wInternationalConference"]));
    console.log(Number(parameters["wNationalConference"]));

    //console.log(sumTheories, sumLabs);
    // console.log(parameters);
    //console.log(parameters["wTheory"], parameters["wLab"]);
    //console.log(parameters.wTheory, parameters.wLab);

    const final_score =
      Number(parameters["wTheory"]) * sumTheories +
      Number(parameters["wLab"]) * sumLabs +
      Number(wMP) +
      Number(noS) * Number(parameters["wNumberOfStudents"]) +
      Number(wPS) * Number(parameters["wProjectSupervisions"]) +
      Number(wIJ) * Number(parameters["wInternationalJournal"]) +
      Number(wNJ) * Number(parameters["wNationalJournal"]) +
      Number(wIC) * Number(parameters["wInternationalConference"]) +
      Number(wNC) * Number(parameters["wNationalConference"]);

    //console.log(final_score);

    //Fetch all courses from json server
    //Get credit hours of three courses from fetched courses details + add them afterwards
    //Fetch parameters from json server
    //Declare final_score = 0
    //Start multiplying parameters with respective fields of workload getter variable of useState
    //Add them and set final score to that summed value
    //now add key to workload getter with key "workload" and value as "final score" calculated above

    //navigate("/workload");
    console.log("Submitted!");

    console.log("Updated Workload" + final_score);
    await axios.put(`http://localhost:3003/workloads/${id}`, {
      ...workload,
      workLoad: final_score,
    });
    setWorkload({ ...workload, workLoad: final_score });
    console.log("Updated Workload" + final_score);
    navigate("/workload");

    // await axios.post("http://localhost:3003/workloads", {
    //   ...workload,
    //   workLoad: final_score.toPrecision(3),
    // });
  };

  const loadWorkload = async () => {
    const result = await axios.get(`http://localhost:3003/workloads/${id}`);
    setWorkload(result.data);
  };

  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    const result = await axios.get("http://localhost:3003/employees");
    setEmployee(result.data);
  };

  const [course, setCourse] = useState([]);

  useEffect(() => {
    loadCourse();
  }, []);

  const loadCourse = async () => {
    const result = await axios.get("http://localhost:3003/courses");
    setCourse(result.data);
  };

  return (
    <div className="container w-50 shadow px-5 pb-5">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="rendered-form mt-5">
          <h1 className="text-center pt-4">Edit Workload</h1>
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
              name="employeeName"
              id="employeeName"
              value={employeeName}
              onChange={(e) => onInputChange(e)}
            >
              <option selected="true" id="DesignationList-0">
                -- Select --
              </option>
              {employee.map((e) => (
                <option id="">{e.employeeName}</option>
              ))}
            </select>
          </div>
          <div className="formbuilder-select form-group field-CourseList">
            <label for="CourseList" className="formbuilder-select-label">
              Select Course 1
            </label>
            <select
              className="form-control"
              name="courseTitle1"
              id="course"
              value={courseTitle1}
              onChange={(e) => onInputChange(e)}
            >
              <option selected="true" id="DesignationList-0" value={0}>
                -- Select --
              </option>
              {course.map((e) => (
                <option id="">{(e.courseTitle1 = e.courseTitle)}</option>
              ))}
            </select>
          </div>
          <div className="formbuilder-select form-group field-CourseList">
            <label for="CourseList" className="formbuilder-select-label">
              Select Course 2
            </label>
            <select
              className="form-control"
              name="courseTitle2"
              id="course"
              value={courseTitle2}
              onChange={(e) => onInputChange(e)}
            >
              <option selected="true" id="DesignationList-0" value={0}>
                -- Select --
              </option>
              {course.map((e) => (
                <option id="">{(e.courseTitle2 = e.courseTitle)}</option>
              ))}
            </select>
          </div>
          <div className="formbuilder-select form-group field-CourseList">
            <label for="CourseList" className="formbuilder-select-label">
              Select Course 3
            </label>
            <select
              className="form-control"
              name="courseTitle3"
              id="course"
              value={courseTitle3}
              onChange={(e) => onInputChange(e)}
            >
              <option selected="true" id="DesignationList-0" value={0}>
                -- Select --
              </option>
              {course.map((e) => (
                <option id="">{(e.courseTitle3 = e.courseTitle)}</option>
              ))}
            </select>
          </div>
          <div className="formbuilder-select form-group  mt-5 field-MPList">
            <label for="MPList" className="formbuilder-select-label">
              Managerial Position
            </label>
            <select
              className="form-control"
              name="managerialPosition"
              id="MPList"
              value={managerialPosition}
              onChange={(e) => onInputChange(e)}
            >
              <option selected="true" id="MPList-0" value={0}>
                -- Select --
              </option>
              <option id="MPList-1" value="HOD">
                Head of Department
              </option>
              <option id="MPList-2" value="CC">
                Course Coordinator
              </option>
              <option id="MPList-3" value="DEAN">
                DEAN
              </option>
              <option id="MPList-4" value="PC">
                Project Coordinator
              </option>
              <option id="MPList-5" value="FP">
                Focal Person
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
              Update Workload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditWorkload;
