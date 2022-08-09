import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddWorkload = () => {
  let navigate = useNavigate();
  const [workload, setWorkload] = useState({
    semester: "",
    year: "",
    employeeName: "",
    courseTitle1: "",
    courseTitle2: "",
    courseTitle3: "",
    courseContribution1: "100",
    courseContribution2: "100",
    courseContribution3: "100",
    managerialPosition: "",
    noOfStudents: "",
    projectSupervisions: "",
    researchProject: "",
    intJournal: "",
    nationalJournal: "",
    intConference: "",
    nationalConference: "",
    contactHours: "",
    GCR: "",
    book: "",
    technicalReport: "",
    chapter: "",
    devOfProd: "",
    patent: "",
  });

  const {
    semester,
    year,
    managerialPosition,
    noOfStudents,
    projectSupervisions,
    researchProject,
    intJournal,
    nationalJournal,
    intConference,
    nationalConference,
    GCR,
    book,
    technicalReport,
    chapter,
    devOfProd,
    patent,
  } = workload;

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

  const onInputChange = (e) => {
    setWorkload({ ...workload, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    //First get values of all three courses from workload getter of useState
    const courses_response = await axios.get("http://localhost:3003/courses");

    const parameters_response = await axios.get(
      "http://localhost:3003/parameters"
    );

    const courses = courses_response.data;
    const parameters = parameters_response.data;
    const title1 = workload["courseTitle1"];
    const title2 = workload["courseTitle2"];
    const title3 = workload["courseTitle3"];
    const courseContribution1 = workload["courseContribution1"];
    const courseContribution2 = workload["courseContribution2"];
    const courseContribution3 = workload["courseContribution3"];
    const selectedMP = workload["managerialPosition"];
    const selectedRP = workload["researchProject"];
    const wMP = parameters["wManagerialPosition"][selectedMP];
    const wRP = parameters["wResearchProject"][selectedRP];
    const noS = workload["noOfStudents"];
    const wPS = workload["projectSupervisions"];
    const wIJ = workload["intJournal"];
    const wNJ = workload["nationalJournal"];
    const wIC = workload["intConference"];
    const wNC = workload["nationalConference"];

    const selectedCourses = [];
    if (title1)
      selectedCourses.push({
        title: title1,
        contribution: Number(courseContribution1),
      });
    if (title2)
      selectedCourses.push({
        title: title2,
        contribution: Number(courseContribution2),
      });
    if (title3)
      selectedCourses.push({
        title: title3,
        contribution: Number(courseContribution3),
      });

    // const theories = [];
    // const labs = [];
    let sumTheories = 0;
    let sumLabs = 0;
    let sumCreditHrs = 0;
    let bsContactHrs = 0;
    let msContactHrs = 0;
    let phdContactHrs = 0;
    selectedCourses.forEach((course) => {
      const courseObject = courses.find((c) => c.courseTitle === course.title); //getting courseTitle from every selected course
      switch (courseObject.degree) {
        case "BS":
          sumTheories +=
            Number(courseObject.theory) *
            Number(parameters["wTheory"]) *
            Number(parameters["degree"]["wBS"]);
          sumLabs +=
            Number(courseObject.lab) *
            Number(parameters["wLab"]) *
            Number(parameters["degree"]["wBS"]);

          bsContactHrs +=
            (Number(courseObject.theory) + 3 * Number(courseObject.lab)) *
            (course.contribution / 100);
          break;

        case "MS":
          sumTheories +=
            Number(courseObject.theory) *
            Number(parameters["wTheory"]) *
            Number(parameters["degree"]["wMS"]);
          sumLabs +=
            Number(courseObject.lab) *
            Number(parameters["wLab"]) *
            Number(parameters["degree"]["wMS"]);

          msContactHrs +=
            (Number(courseObject.theory) + 3 * Number(courseObject.lab)) *
            (course.contribution / 100);
          break;
        case "PhD":
          sumTheories +=
            Number(courseObject.theory) *
            Number(parameters["wTheory"]) *
            Number(parameters["degree"]["wPhD"]);
          sumLabs +=
            Number(courseObject.lab) *
            Number(parameters["wLab"]) *
            Number(parameters["degree"]["wPhD"]);

          phdContactHrs +=
            (Number(courseObject.theory) + 3 * Number(courseObject.lab)) *
            (course.contribution / 100);
          break;

        default:
      }
      sumCreditHrs +=
        (Number(courseObject.theory) + Number(courseObject.lab)) *
        (course.contribution / 100);
      console.log("Course Object theory " + courseObject.theory);
      console.log("Course Object Lab " + courseObject.lab);

      // theories.push(Number(courseObject.theory));
      // labs.push(Number(courseObject.lab));
    });
    console.log("Total Credit Hours: ", sumCreditHrs);
    // const sumTheories = theories.reduce((prev, curr) => prev + curr, 0);
    // console.log("theories " + sumTheories);
    // const sumLabs = labs.reduce((prev, curr) => prev + curr, 2);
    // console.log("Labs " + sumLabs);
    // console.log(Number(parameters["wNumberOfStudents"]));
    // console.log(Number(parameters["wProjectSupervisions"]));
    // console.log(Number(parameters["wInternationalJournal"]));
    // console.log(Number(parameters["wNationalJournal"]));
    // console.log(Number(parameters["wInternationalConference"]));
    // console.log(Number(parameters["wNationalConference"]));

    //console.log(sumTheories, sumLabs);
    // console.log(parameters);
    //console.log(parameters["wTheory"], parameters["wLab"]);
    //console.log(parameters.wTheory, parameters.wLab);

    const final_score =
      // Number(parameters["wTheory"]) * sumTheories +
      // Number(parameters["wLab"]) * sumLabs +
      Number(sumTheories) +
      Number(sumLabs) +
      Number(wMP) +
      Number(noS) * Number(parameters["wNumberOfStudents"]) +
      Number(wPS) * Number(parameters["wProjectSupervisions"]) +
      Number(wRP) +
      Number(wIJ) * Number(parameters["wInternationalJournal"]) +
      Number(wNJ) * Number(parameters["wNationalJournal"]) +
      Number(wIC) * Number(parameters["wInternationalConference"]) +
      Number(wNC) * Number(parameters["wNationalConference"]) +
      Number(GCR) * Number(parameters["wGCR"]) +
      Number(book) * Number(parameters["wBook"]) +
      Number(technicalReport) * Number(parameters["wTechnicalReport"]) +
      Number(chapter) * Number(parameters["wChapter"]) +
      Number(devOfProd) * Number(parameters["wDevOfProd"]) +
      Number(patent) * Number(parameters["wPatent"]);

    //console.log(final_score);

    //Fetch all courses from json server
    //Get credit hours of three courses from fetched courses details + add them afterwards
    //Fetch parameters from json server
    //Declare final_score = 0
    //Start multiplying parameters with respective fields of workload getter variable of useState
    //Add them and set final score to that summed value
    //now add key to workload getter with key "workload" and value as "final score" calculated above

    await axios.post("http://localhost:3003/workloads", {
      ...workload,
      workLoad: final_score.toPrecision(3),
      bsContactHrs,
      msContactHrs,
      phdContactHrs,
      totalClasses: sumCreditHrs * parameters.totalWeeksInSemester,
    });
    // await axios.post("http://localhost:3003/employees", {
    //   ...employee,
    // });
    setWorkload({
      ...workload,
      workLoad: final_score,
      bsContactHrs,
      msContactHrs,
      phdContactHrs,
    });
    navigate("/workload");
  };

  return (
    <div className="container shadow px-5 pb-5">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="rendered-form mt-3">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-5">
              <h1 className="pt-5 text-center">Add Workload</h1>
              <div className="row mt-5">
                <div className="col-sm-10 col-md-6 col-lg-6">
                  <label>Semester</label>
                  <select
                    className="form-control"
                    name="semester"
                    id="semester"
                    value={semester}
                    onChange={(e) => onInputChange(e)}
                  >
                    <option selected="true" id="SemesterList-0">
                      -- Select --
                    </option>
                    <option id="SemesterList-1" value="Spring">
                      Spring
                    </option>
                    <option id="SemesterList-2" value="Fall">
                      Fall
                    </option>
                    <option id="SemesterList-3" value="Summer">
                      Summer
                    </option>
                  </select>
                </div>
                <div className="col-sm-10 col-md-6 col-lg-6">
                  <label>Year</label>
                  <input
                    type="text"
                    placeholder="Year"
                    className="form-control"
                    name="year"
                    value={year}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-sm-10 col-md-6 col-lg-6">
                  <div className="formbuilder-select  mt-5 form-group field-EmployeeList">
                    <label
                      for="EmployeeList"
                      className="formbuilder-select-label"
                    >
                      Select Employee
                    </label>
                    <select
                      className="form-control"
                      name="employeeName"
                      id="employeeName"
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
                </div>
                <div className="col-sm-10 col-md-6 col-lg-6">
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
                      <option id="MPList-0" value="">
                        -- Select --
                      </option>
                      <option id="MPList-1" value="Rector_OR_ProRector">
                        Rector / Pro-Rector
                      </option>
                      <option id="MPList-2" value="Dean_OR_Director">
                        Dean / Director
                      </option>
                      <option id="MPList-3" value="Registrar_OR_Controller">
                        Registrar / Controller
                      </option>
                      <option id="MPList-4" value="Head_of_Department">
                        Head of Department
                      </option>
                      <option id="MPList-5" value="Head_of_Division">
                        Head of Division
                      </option>
                      <option id="MPList-6" value="Head_OR_Incharge_of_Section">
                        Head / Incharge of Section
                      </option>
                      <option id="MPList-7" value="Project_Director">
                        Project Director
                      </option>
                      <option
                        id="MPList-8"
                        value="Course_OR_Project_Coordinator"
                      >
                        Course / Project Coordinator
                      </option>
                      <option
                        id="MPList-9"
                        value="Conference_OR_Short_Course_Coordinator"
                      >
                        Conference / Short Course Coordinator
                      </option>
                      <option
                        id="MPList-10"
                        value="Conference_OR_Short_Course_Team_Member"
                      >
                        Conference / Short Course Team Member
                      </option>
                      <option id="MPList-11" value="Visit_Coordinator">
                        Visit Coordinator
                      </option>
                      <option id="MPList-12" value="One_Day_Seminar_Organisor">
                        One Day Seminar Organisor
                      </option>
                      <option id="MPList-13" value="Focal_Person">
                        Focal Person
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-10 col-md-6 col-lg-6 mt-3">
                  <label for="CourseList">Select Course 1</label>
                  <select
                    className="form-control"
                    name="courseTitle1"
                    id="course1"
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
                <div className="col-sm-10 col-md-6 col-lg-6 mt-3">
                  <label>Contribution Percentage 1</label>
                  <input
                    type="number"
                    placeholder="0 to 100%"
                    className="form-control"
                    name="courseContribution1"
                    defaultValue={100}
                    min={0}
                    max={100}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-sm-10 col-md-6 col-lg-6">
                  <label for="CourseList">Select Course 2</label>
                  <select
                    className="form-control"
                    name="courseTitle2"
                    id="course2"
                    onChange={(e) => onInputChange(e)}
                  >
                    <option selected="true" value={0}>
                      -- Select --
                    </option>
                    {course.map((e) => (
                      <option id="">{(e.courseTitle2 = e.courseTitle)}</option>
                    ))}
                  </select>
                </div>
                <div className="col-sm-10 col-md-6 col-lg-6">
                  <label>Contribution Percentage 2</label>
                  <input
                    type="number"
                    placeholder="0 to 100%"
                    className="form-control"
                    name="courseContribution2"
                    defaultValue={100}
                    min={0}
                    max={100}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-sm-10 col-md-6 col-lg-6">
                  <label for="CourseList">Select Course 3</label>
                  <select
                    className="form-control"
                    name="courseTitle3"
                    id="course3"
                    onChange={(e) => onInputChange(e)}
                  >
                    <option selected="true" value={0}>
                      -- Select --
                    </option>
                    {course.map((e) => (
                      <option id="">{(e.courseTitle3 = e.courseTitle)}</option>
                    ))}
                  </select>
                </div>
                <div className="col-sm-10 col-md-6 col-lg-6">
                  <label>Contribution Percentage 3</label>
                  <input
                    type="number"
                    placeholder="0 to 100%"
                    className="form-control"
                    name="courseContribution3"
                    defaultValue={100}
                    min={0}
                    max={100}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-sm-10 col-md-6 col-lg-4">
                  <div className="formbuilder-text form-group field-text-1654851224189 mt-5 ">
                    <label>Number of Students</label>
                    <input
                      type="number"
                      placeholder="No of Students"
                      className="form-control"
                      name="noOfStudents"
                      value={noOfStudents}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-7">
              <h1 className="mt-5 mb-5">R & D</h1>

              <div className="row">
                <div className="col-sm-10 col-md-6 col-lg-3">
                  <label>Project Supervisions</label>
                  <input
                    type="number"
                    placeholder="Project Supervisions"
                    className="form-control"
                    name="projectSupervisions"
                    value={projectSupervisions}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="col-sm-10 col-md-6 col-lg-3">
                  <label>Research Project</label>
                  <select
                    className="form-control"
                    name="researchProject"
                    value={researchProject}
                    onChange={(e) => onInputChange(e)}
                  >
                    <option id="RPList-0" value="">
                      -- Select --
                    </option>
                    <option id="RPList-1" value="Zero_to_One">
                      upto 1 M
                    </option>
                    <option id="RPList-2" value="One_to_Two">
                      1-2 M
                    </option>
                    <option id="RPList-3" value="Two_to_Five">
                      2-5 M
                    </option>
                    <option id="RPList-4" value="Five_to_Ten">
                      5-10 M
                    </option>
                    <option id="RPList-5" value="more_than_Ten">
                      10 M +
                    </option>
                  </select>
                </div>
                <div className="col-sm-10 col-md-6 col-lg-3"></div>
              </div>

              <div className="row mt-5">
                <div className="col-sm-10 col-md-6 col-lg-3">
                  <div className="formbuilder-text form-group mt-2 field-text-1654851224189">
                    <label>Int. Journal</label>
                    <input
                      type="number"
                      placeholder="Int. Journal"
                      className="form-control"
                      name="intJournal"
                      value={intJournal}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>
                <div className="col-sm-10 col-md-6 col-lg-3">
                  <div className="formbuilder-text form-group mt-2 field-text-1654851224189">
                    <label>National Journal</label>
                    <input
                      type="number"
                      placeholder="National Journal"
                      className="form-control"
                      name="nationalJournal"
                      value={nationalJournal}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>
                <div className="col-sm-10 col-md-6 col-lg-3">
                  <div className="formbuilder-text form-group mt-2 field-text-1654851224189">
                    <label>Int. Conference</label>
                    <input
                      type="number"
                      placeholder="Int. Conference"
                      className="form-control"
                      name="intConference"
                      value={intConference}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>
                <div className="col-sm-10 col-md-6 col-lg-3">
                  <div className="formbuilder-text form-group mt-2 field-text-1654851224189">
                    <label>National Conference</label>
                    <input
                      type="number"
                      placeholder="National Conference"
                      className="form-control"
                      name="nationalConference"
                      value={nationalConference}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-sm-10 col-md-6 col-lg-4 mt-4">
                  <label>Gen/Conf Reviewer</label>
                  <input
                    type="number"
                    placeholder="Gen/Conf Reviewer"
                    className="form-control"
                    name="GCR"
                    value={GCR}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="col-sm-10 col-md-6 col-lg-4 mt-4">
                  <label>Book</label>
                  <input
                    type="number"
                    placeholder="Book"
                    className="form-control"
                    name="book"
                    value={book}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="col-sm-10 col-md-6 col-lg-4 mt-4">
                  <label>Technical Report</label>
                  <input
                    type="number"
                    placeholder="Technical Report"
                    className="form-control"
                    name="technicalReport"
                    value={technicalReport}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-10 col-md-6 col-lg-4 mt-4">
                  <label>Book Chapter</label>
                  <input
                    type="number"
                    placeholder="Book Chapter"
                    className="form-control"
                    name="chapter"
                    value={chapter}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="col-sm-10 col-md-6 col-lg-4 mt-4">
                  <label>Dev of Product</label>
                  <input
                    type="number"
                    placeholder="Dev of Product"
                    className="form-control"
                    name="devOfProd"
                    value={devOfProd}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="col-sm-10 col-md-6 col-lg-4 mt-4">
                  <label>Patent</label>
                  <input
                    type="number"
                    placeholder="Patent"
                    className="form-control"
                    name="patent"
                    value={patent}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            className="btn-dark btn mt-5 w-25"
            type="submit"
            name="submitButton"
            id="submitButton"
          >
            Add Workload
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddWorkload;
