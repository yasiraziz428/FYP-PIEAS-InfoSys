import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Workload = () => {
  const [workload, setWorkload] = useState([]);
  const allYears = "All Years";
  const allSemesters = "All Semesters";

  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(allYears);
  const [selectedSemester, setSelectedSemester] = useState(allSemesters);

  useEffect(() => {
    loadWorkload();
  }, []);

  const loadWorkload = async () => {
    const result = await axios.get("http://localhost:3003/workloads");
    const workload_data = result.data;
    //Populating Years
    const yearsSet = new Set(
      workload_data.filter((p) => p.year && p.year !== "").map((w) => w.year)
    );
    const yearsArray = [...yearsSet].sort();
    setYears(yearsArray);
    setWorkload(result.data.reverse());
  };

  const deleteWorkload = async (workload) => {
    await axios.delete(`http://localhost:3003/workloads/${workload.id}`);
    loadWorkload();
    //re-calculating payment associated with workload
    const employees_response = await axios.get(
      `http://localhost:3003/employees?employeeName=${workload.employeeName}`
    );
    const courses_response = await axios.get("http://localhost:3003/courses");
    const parameters_response = await axios.get(
      "http://localhost:3003/parameters"
    );
    if (employees_response.data[0]) {
      updatePayment(
        employees_response.data[0],
        workload.year,
        workload.semester,
        courses_response.data,
        parameters_response.data
      );
    }
  };
  const onSelectYear = (e) => {
    setSelectedYear(e.target.value);
  };

  const onSelectSemester = (e) => {
    setSelectedSemester(e.target.value);
  };
  const updatePayment = async (
    employeeObject,
    year,
    semester,
    all_courses,
    parameters
  ) => {
    console.log("Updating");
    //checking if there is any existing payment
    const existing_payment = await axios.get(
      `http://localhost:3003/payments/?employee_id=${employeeObject.id}&year=${year}&semester=${semester}`
    );
    let replace_id = undefined;
    if (existing_payment.data.length !== 0) {
      replace_id = existing_payment.data[0].id;
    }

    //declarations
    let bs_contact_hours = 0;
    let ms_contact_hours = 0;
    let phd_contact_hours = 0;
    let total_classes = 0;
    let courses = [];

    //getting all workloads
    const workload_response = await axios.get(
      "http://localhost:3003/workloads"
    );

    workload_response.data
      .filter(
        (w) =>
          w.employeeName === employeeObject.employeeName &&
          w.year === year &&
          w.semester === semester
      )
      .forEach((w) => {
        if (w.bsContactHrs) {
          bs_contact_hours += w.bsContactHrs;
        }
        if (w.msContactHrs) {
          ms_contact_hours += w.msContactHrs;
        }
        if (w.phdContactHrs) {
          phd_contact_hours += w.phdContactHrs;
        }
        total_classes += w.totalClasses;
        //Adding courses details
        for (let i = 1; i <= 3; i++) {
          if (w[`courseTitle${i}`] !== "") {
            const courseObject = all_courses.find(
              (c) => c.courseTitle === w[`courseTitle${i}`]
            );
            const course_contribution = w[`courseContribution${i}`];
            const credit_hours =
              Number(courseObject.theory) + Number(courseObject.lab);
            const contact_hours =
              (Number(courseObject.theory) + 3 * Number(courseObject.lab)) *
              (course_contribution / 100);
            const total_weeks = Number(
              parameters.totalWeeksInSemester[semester.toLowerCase()]
            );
            courses.push({
              id: courseObject.id,
              code: courseObject.courseNo,
              title: courseObject.courseTitle,
              contribution: course_contribution,
              program: courseObject.program,
              dept: courseObject.dept,
              contact_hours: contact_hours,
              credit_hours: credit_hours,
              financial_impact:
                contact_hours * Number(employeeObject.pay_rate) * total_weeks,
              payment_due:
                contact_hours * Number(employeeObject.pay_rate) * total_weeks,
              total_classes:
                credit_hours * (course_contribution / 100) * total_weeks,
              compensated_classes: 0,
            });
          }
        }
      });

    const total_contact_hours =
      bs_contact_hours + ms_contact_hours + phd_contact_hours;

    const financial_impact =
      Number(total_contact_hours) *
      Number(employeeObject.pay_rate) *
      Number(parameters.totalWeeksInSemester[semester.toLowerCase()]);

    const compensated_classes = replace_id
      ? existing_payment.data[0].compensated_classes
      : 0;
    const impact_per_class = financial_impact / total_classes;
    const payment_due =
      financial_impact + compensated_classes * impact_per_class;

    const final_payment_obj = {
      employee_id: employeeObject.id,
      year,
      semester,
      total_contact_hours,
      bs_contact_hours,
      ms_contact_hours,
      phd_contact_hours,
      pay_rate: employeeObject.pay_rate,
      financial_impact,
      payment_due,
      total_classes,
      compensated_classes,
      courses,
    };

    if (replace_id) {
      await axios.put(
        `http://localhost:3003/payments/${replace_id}`,
        final_payment_obj
      );
    } else {
      await axios.post("http://localhost:3003/payments", final_payment_obj);
    }
  };

  return (
    <div className="container-fluid ">
      <Link to="/workload/add" className="btn btn-outline-dark float-end mt-5">
        Add Workload <i class="fa fa-plus"></i>
      </Link>
      <button
        className="btn btn-outline-dark mt-5 px-5 me-3 float-end"
        onClick={() => {
          window.print();
        }}
      >
        Print <i class="fa fa-print"></i>
      </button>
      <br></br>
      <select className="mt-5" onChange={onSelectYear} value={selectedYear}>
        <option value={allYears}>All Years</option>
        {years.map((year) => (
          <option value={year}>{year}</option>
        ))}
      </select>
      <select className="ms-2 mt-2" onChange={onSelectSemester}>
        <option value={allSemesters}>All Semesters</option>
        <option value={"Spring"}>Spring</option>
        <option value={"Fall"}>Fall</option>
        <option value={"Summer"}>Summer</option>
      </select>

      <table
        className="table caption-top border shadow mt-2"
        style={{ fontSize: "11px" }}
      >
        <thead>
          <tr>
            <th>#</th>
            {/* <th>Semester</th>
            <th>Year</th> */}
            <th style={{ fontSize: "13px" }}>Employee</th>
            <th>Course 1</th>
            <th>Course 2</th>
            <th>Course 3</th>
            <th>Managerial Position</th>
            <th>Number of BS Students</th>
            <th>Number of MS Students</th>
            <th>BS Project Supervisions</th>
            <th>MS/PhD Project Supervisions</th>
            <th>Research Project (Million)</th>
            <th>Journal (INT)</th>
            <th>Journal (NAT)</th>
            <th>Conf (INT)</th>
            <th>Conf (NAT)</th>
            <th>Book (INT)</th>
            <th>Book (NAT)</th>
            <th>Book Chapter</th>
            <th>Patent (INT)</th>
            <th>Patent (NAT)</th>
            <th>Journal / Conf Reviewer</th>
            <th>Technical Report</th>
            <th>Dev of Product</th>
            <th>Workload</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workload
            ? workload
                .filter(
                  (p) =>
                    p.total_contact_hours !== 0 &&
                    (selectedYear !== allYears
                      ? p.year === selectedYear
                      : true) &&
                    (selectedSemester !== allSemesters
                      ? p.semester === selectedSemester
                      : true)
                )
                .map((workloads, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    {/* <td>{workloads.semester}</td>
                    <td>{workloads.year}</td> */}
                    <th style={{ fontSize: "13px" }}>
                      {workloads.employeeName}
                    </th>
                    <td>{workloads.courseTitle1}</td>
                    <td>{workloads.courseTitle2}</td>
                    <td>{workloads.courseTitle3}</td>
                    <td>{workloads.managerialPosition}</td>
                    <td>{workloads.noOfStudents}</td>
                    <td>{workloads.noOfMsStudents}</td>
                    <td>{workloads.projectSupervisions}</td>
                    <td>{workloads.projectSupervisionsMS}</td>
                    <td>{workloads.researchProject}</td>
                    <td>{workloads.intJournal}</td>
                    <td>{workloads.nationalJournal}</td>
                    <td>{workloads.intConference}</td>
                    <td>{workloads.nationalConference}</td>
                    <td>{workloads.book}</td>
                    <td>{workloads.NBook}</td>
                    <td>{workloads.chapter}</td>
                    <td>{workloads.patent}</td>
                    <td>{workloads.NPatent}</td>
                    <td>{workloads.GCR}</td>
                    <td>{workloads.technicalReport}</td>
                    <td>{workloads.devOfProd}</td>
                    <td>{workloads.workLoad}</td>
                    <td>
                      <Link
                        className="btn btn-outline-primary me-2"
                        to={`/workload/edit/${workloads.id}`}
                      >
                        <i class="fa fa-pen"></i>
                      </Link>
                      <Link
                        className="btn btn-outline-danger"
                        to="#"
                        onClick={() => deleteWorkload(workloads)}
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

export default Workload;
