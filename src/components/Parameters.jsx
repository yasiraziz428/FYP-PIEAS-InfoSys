import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Parameters = () => {
  let navigate = useNavigate();
  const [parameter, setParameter] = useState({
    degree: { wBS: "", wMS: "", wPhD: "" },
    wTheory: "",
    wLab: "",
    wManagerialPosition: {
      Rector_OR_ProRector: "",
      Dean_OR_Director: "",
      Registrar_OR_Controller: "",
      Head_of_Department: "",
      Head_of_Division: "",
      Head_OR_Incharge_of_Section: "",
      Project_Director: "",
      Course_OR_Project_Coordinator: "",
      Conference_OR_Short_Course_Coordinator: "",
      Conference_OR_Short_Course_Team_Member: "",
      Visit_Coordinator: "",
      One_Day_Seminar_Organisor: "",
      Focal_Person: "",
    },
    wNumberOfStudents: "",
    wProjectSupervisions: "",
    wResearchProject: {
      Zero_to_One: "",
      One_to_Two: "",
      Two_to_Five: "",
      Five_to_Ten: "",
      more_than_Ten: "",
    },
    wInternationalJournal: "",
    wNationalJournal: "",
    wInternationalConference: "",
    wNationalConference: "",
    wGCR: "",
    wbook: "",
    wTechnicalReport: "",
    wChapter: "",
    wDevOfProd: "",
    wPatent: "",
  });

  const {
    degree: { wBS, wMS, wPhD },
    wTheory,
    wLab,
    wManagerialPosition: {
      Rector_OR_ProRector,
      Dean_OR_Director,
      Registrar_OR_Controller,
      Head_of_Department,
      Head_of_Division,
      Head_OR_Incharge_of_Section,
      Project_Director,
      Course_OR_Project_Coordinator,
      Conference_OR_Short_Course_Coordinator,
      Conference_OR_Short_Course_Team_Member,
      Visit_Coordinator,
      One_Day_Seminar_Organisor,
      Focal_Person,
    },
    wNumberOfStudents,
    wProjectSupervisions,
    wResearchProject: {
      Zero_to_One,
      One_to_Two,
      Two_to_Five,
      Five_to_Ten,
      more_than_Ten,
    },
    wInternationalJournal,
    wNationalJournal,
    wInternationalConference,
    wNationalConference,
    wGCR,
    wBook,
    wTechnicalReport,
    wChapter,
    wDevOfProd,
    wPatent,
  } = parameter;

  useEffect(() => {
    loadParameters();
  }, []);

  const onInputChange = (e) => {
    switch (e.target.name) {
      case "wBS":
        setParameter({
          ...parameter,
          degree: { ...parameter.degree, wBS: e.target.value },
        });
        break;
      case "wMS":
        setParameter({
          ...parameter,
          degree: { ...parameter.degree, wMS: e.target.value },
        });
        break;
      case "wPhD":
        setParameter({
          ...parameter,
          degree: { ...parameter.degree, wPhD: e.target.value },
        });
        break;
      case "Rector_OR_ProRector":
        setParameter({
          ...parameter,
          wManagerialPosition: {
            ...parameter.wManagerialPosition,
            Rector_OR_ProRector: e.target.value,
          },
        });
        break;
      case "Dean_OR_Director":
        setParameter({
          ...parameter,
          wManagerialPosition: {
            ...parameter.wManagerialPosition,
            Dean_OR_Director: e.target.value,
          },
        });
        break;
      case "Registrar_OR_Controller":
        setParameter({
          ...parameter,
          wManagerialPosition: {
            ...parameter.wManagerialPosition,
            Registrar_OR_Controller: e.target.value,
          },
        });
        break;
      case "Head_of_Department":
        setParameter({
          ...parameter,
          wManagerialPosition: {
            ...parameter.wManagerialPosition,
            Head_of_Department: e.target.value,
          },
        });
        break;
      case "Head_of_Division":
        setParameter({
          ...parameter,
          wManagerialPosition: {
            ...parameter.wManagerialPosition,
            Head_of_Division: e.target.value,
          },
        });
        break;
      case "Head_OR_Incharge_of_Section":
        setParameter({
          ...parameter,
          wManagerialPosition: {
            ...parameter.wManagerialPosition,
            Head_OR_Incharge_of_Section: e.target.value,
          },
        });
        break;
      case "Project_Director":
        setParameter({
          ...parameter,
          wManagerialPosition: {
            ...parameter.wManagerialPosition,
            Project_Director: e.target.value,
          },
        });
        break;
      case "Course_OR_Project_Coordinator":
        setParameter({
          ...parameter,
          wManagerialPosition: {
            ...parameter.wManagerialPosition,
            Course_OR_Project_Coordinator: e.target.value,
          },
        });
        break;
      case "Conference_OR_Short_Course_Coordinator":
        setParameter({
          ...parameter,
          wManagerialPosition: {
            ...parameter.wManagerialPosition,
            Conference_OR_Short_Course_Coordinator: e.target.value,
          },
        });
        break;
      case "Conference_OR_Short_Course_Team_Member":
        setParameter({
          ...parameter,
          wManagerialPosition: {
            ...parameter.wManagerialPosition,
            Conference_OR_Short_Course_Team_Member: e.target.value,
          },
        });
        break;
      case "Visit_Coordinator":
        setParameter({
          ...parameter,
          wManagerialPosition: {
            ...parameter.wManagerialPosition,
            Visit_Coordinator: e.target.value,
          },
        });
        break;
      case "One_Day_Seminar_Organisor":
        setParameter({
          ...parameter,
          wManagerialPosition: {
            ...parameter.wManagerialPosition,
            One_Day_Seminar_Organisor: e.target.value,
          },
        });
        break;
      case "Focal_Person":
        setParameter({
          ...parameter,
          wManagerialPosition: {
            ...parameter.wManagerialPosition,
            Focal_Person: e.target.value,
          },
        });
        break;
      case "Zero_to_One":
        setParameter({
          ...parameter,
          wResearchProject: {
            ...parameter.wResearchProject,
            Zero_to_One: e.target.value,
          },
        });
        break;
      case "One_to_Two":
        setParameter({
          ...parameter,
          wResearchProject: {
            ...parameter.wResearchProject,
            One_to_Two: e.target.value,
          },
        });
        break;
      case "Two_to_Five":
        setParameter({
          ...parameter,
          wResearchProject: {
            ...parameter.wResearchProject,
            Two_to_Five: e.target.value,
          },
        });
        break;
      case "Five_to_Ten":
        setParameter({
          ...parameter,
          wResearchProject: {
            ...parameter.wResearchProject,
            Five_to_Ten: e.target.value,
          },
        });
        break;
      case "more_than_Ten":
        setParameter({
          ...parameter,
          wResearchProject: {
            ...parameter.wResearchProject,
            more_than_Ten: e.target.value,
          },
        });
        break;
      default:
        setParameter({ ...parameter, [e.target.name]: e.target.value });
    }
  };

  const loadParameters = async () => {
    const result = await axios.get(`http://localhost:3003/parameters`);
    setParameter(result.data);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put("http://localhost:3003/parameters", parameter);
    navigate("/parameters");
    console.log("Submitted!");
  };

  return (
    <div className="pt-3">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="container w-50 shadow px-5 pb-5">
          <div className="row">
            <h1 className="text-center py-5">Parameters</h1>

            {/* Workload Section */}
            <div className="col-lg-5 col-md-12 col-sm-12">
              <h3 className="text-center mb-5">Workload</h3>

              <div className="row">
                <h5 className="mb-3">Degree</h5>
                <div className="col">
                  <label>BS</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="wBS"
                    value={wBS}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>MS</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="wMS"
                    value={wMS}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>PhD</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="wPhD"
                    value={wPhD}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row mt-4">
                <h5 className="mb-3">Credit Hour</h5>
                <div className="col">
                  <label>Theory</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="wTheory"
                    value={wTheory}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Lab</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="wLab"
                    value={wLab}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row mt-5">
                <h5 className="mb-3">Managerial Position</h5>
                <div className="col">
                  <label>Rector / Pro-Rector</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="Rector_OR_ProRector"
                    value={Rector_OR_ProRector}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Dean / Director</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="Dean_OR_Director"
                    value={Dean_OR_Director}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Registrar / Controller</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="Registrar_OR_Controller"
                    value={Registrar_OR_Controller}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Head of Department</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="Head_of_Department"
                    value={Head_of_Department}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Head of Division</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="Head_of_Division"
                    value={Head_of_Division}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Head / Incharge of Section</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="Head_OR_Incharge_of_Section"
                    value={Head_OR_Incharge_of_Section}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Project Director</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="Project_Director"
                    value={Project_Director}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Course / Project Coordinator</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="Course_OR_Project_Coordinator"
                    value={Course_OR_Project_Coordinator}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Conference / Short Course Coordinator</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="Conference_OR_Short_Course_Coordinator"
                    value={Conference_OR_Short_Course_Coordinator}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Conference / Short Course Team Member</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="Conference_OR_Short_Course_Team_Member"
                    value={Conference_OR_Short_Course_Team_Member}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Visit Coordinator</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="Visit_Coordinator"
                    value={Visit_Coordinator}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>One Day Seminar Organisor</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="One_Day_Seminar_Organisor"
                    value={One_Day_Seminar_Organisor}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Focal Person</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="Focal_Person"
                    value={Focal_Person}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row mt-5 mb-5">
                <div className="col">
                  <label>Number of Students</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="wNumberOfStudents"
                    value={wNumberOfStudents}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>

              {/*                                          R & D Section                                                    */}

              <h2 className="mt-5 mb-5 text-center">R & D</h2>
              <div className="row">
                <div className="col">
                  <label>Project Supervisions</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="wProjectSupervisions"
                    value={wProjectSupervisions}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row mt-5">
                <h5 className="mb-3">Research Project</h5>
                <div className="col">
                  <label>Upto 1 M</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="Zero_to_One"
                    value={Zero_to_One}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>1-2 M</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="One_to_Two"
                    value={One_to_Two}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>2-5 M</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="Two_to_Five"
                    value={Two_to_Five}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>5-10 M</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="Five_to_Ten"
                    value={Five_to_Ten}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>10 M +</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="more_than_Ten"
                    value={more_than_Ten}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>International Journal</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="wInternationalJournal"
                    value={wInternationalJournal}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>National Journal</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="wNationalJournal"
                    value={wNationalJournal}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>International Conference</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="wInternationalConference"
                    value={wInternationalConference}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>National Conference</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="wNationalConference"
                    value={wNationalConference}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row mt-5">
                <div className="col">
                  <label>General / Conference Reviewer</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="wGCR"
                    value={wGCR}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Book</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="wBook"
                    value={wBook}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Technical Report</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="wTechnicalReport"
                    value={wTechnicalReport}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Chapter</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="wChapter"
                    value={wChapter}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Development of Product</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="wDevOfProd"
                    value={wDevOfProd}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Patent</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    name="wPatent"
                    value={wPatent}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col"></div>
                <div className="col"></div>
              </div>
              <div className="row">
                <div className="col"></div>
                <div className="col"></div>
              </div>
              <div className="row">
                <div className="col"></div>
                <div className="col"></div>
              </div>
              <div className="row">
                <div className="col"></div>
                <div className="col"></div>
              </div>
            </div>

            {/* Payment Section */}

            <div className="container col-lg-5 col-md-12 col-sm-12">
              <h3 className="text-center mb-5">Payment</h3>

              <div className="row">
                <h5 className="mb-3">Pay Per Hour (Rs)</h5>
                <div className="col">
                  <label>Visiting Faculty A</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Visiting Faculty B</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Visiting Faculty C</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Visiting Faculty D</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <label>TA/Lab Engineer A</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>TA/Lab Engineer B</label>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            type="sumbit"
            className="mt-5 px-5 btn btn-dark text-center form-control"
          >
            Update Parameters
          </button>
        </div>
      </form>
    </div>
  );
};

export default Parameters;
