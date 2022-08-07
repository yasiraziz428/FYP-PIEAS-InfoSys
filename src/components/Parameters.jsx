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
    wManagerialPosition: "",
    wNumberOfStudents: "",
    wProjectSupervisions: "",
    wInternationalJournal: "",
    wNationalJournal: "",
    wInternationalConference: "",
    wNationalConference: "",
    wGCR: "",
  });

  const {
    degree: { wBS, wMS, wPhD },
    wTheory,
    wLab,
    wManagerialPosition,
    wNumberOfStudents,
    wProjectSupervisions,
    wInternationalJournal,
    wNationalJournal,
    wInternationalConference,
    wNationalConference,
    wGCR,
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
                <div className="col">
                  <h6>BS</h6>
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
                  <h6>MS</h6>
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
                  <h6>PhD</h6>
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
                <div className="col">
                  <h6>Theory</h6>
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
                  <h6>Lab</h6>
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
                <div className="col">
                  <h6>Rector / Pro-Rector</h6>
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
                  <h6>Dean / Director</h6>
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
                  <h6>Registrar / Controller</h6>
                </div>
                <div className="col">
                  <input className="form-control" />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h6>Head of Department</h6>
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
                  <h6>Head of Division</h6>
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
                  <h6>Head / Incharge of Section</h6>
                </div>
                <div className="col">
                  <input className="form-control" />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h6>Project Director</h6>
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
                  <h6>Course / Project Coordinator</h6>
                </div>
                <div className="col">
                  <input className="form-control" />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h6>Conference / Short Course Coordinator</h6>
                </div>
                <div className="col">
                  <input className="form-control" />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h6>Conference / Short Course Team Member</h6>
                </div>
                <div className="col">
                  <input className="form-control" />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h6>Visit Coordinator</h6>
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
                  <h6>One Day Seminar Organisor</h6>
                </div>
                <div className="col">
                  <input className="form-control" />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h6>Focal Person</h6>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row mt-4 mb-5">
                <div className="col">
                  <h6>Number of Students</h6>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>

              {/*                                          R & D Section                                                    */}

              <h3 className="mt-5 mb-5 text-center">R & D</h3>
              <div className="row">
                <div className="col">
                  <h6>Project Supervisions</h6>
                </div>
                <div className="col">
                  <input className="form-control" />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h6>International Journal</h6>
                </div>
                <div className="col">
                  <input className="form-control" />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h6>National Journal</h6>
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
                  <h6>International Conference</h6>
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
                  <h6>National Conference</h6>
                </div>
                <div className="col">
                  <input
                    className="form-control"
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
            </div>

            {/* Payment Section */}

            <div className="container col-lg-5 col-md-12 col-sm-12">
              <h3 className="text-center mb-5">Payment</h3>

              <div className="row">
                <div className="col">
                  <h6>Visiting Faculty A</h6>
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
                  <h6>Visiting Faculty B</h6>
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
                  <h6>Visiting Faculty C</h6>
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
                  <h6>Visiting Faculty D</h6>
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
                  <h6>TA/Lab Engineer A</h6>
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
                  <h6>TA/Lab Engineer B</h6>
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
            className="mt-5 ms-5 px-5 btn btn-dark text-center"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Parameters;
