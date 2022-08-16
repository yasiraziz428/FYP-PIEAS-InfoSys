import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Workload = () => {
  const [workload, setWorkload] = useState([]);

  useEffect(() => {
    loadWorkload();
  }, []);

  const loadWorkload = async () => {
    const result = await axios.get("http://localhost:3003/workloads");
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
        if (w.courseTitle1 !== "") {
          const courseObject = all_courses.find(
            (c) => c.courseTitle === w.courseTitle1
          );
          courses.push({
            title: w.courseTitle1,
            contribution: w.courseContribution1,
            program: courseObject.program,
            credit_hours:
              Number(courseObject.theory) + Number(courseObject.lab),
          });
        }

        if (w.courseTitle2 !== "") {
          const courseObject = all_courses.find(
            (c) => c.courseTitle === w.courseTitle2
          );
          courses.push({
            title: w.courseTitle2,
            contribution: w.courseContribution2,
            program: courseObject.program,
            credit_hours:
              Number(courseObject.theory) + Number(courseObject.lab),
          });
        }

        if (w.courseTitle3 !== "") {
          const courseObject = all_courses.find(
            (c) => c.courseTitle === w.courseTitle3
          );
          courses.push({
            title: w.courseTitle3,
            contribution: w.courseContribution3,
            program: courseObject.program,
            credit_hours:
              Number(courseObject.theory) + Number(courseObject.lab),
          });
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
        Add Workload
      </Link>
      <br></br>
      <select className="mt-5">
        <option>All Years</option>
        <option></option>
      </select>
      <select className="ms-2 mt-2">
        <option>All Semesters</option>
        <option></option>
      </select>
      <select className="mt-5 ms-2">
        <option>All Deptartments</option>
        <option id="DeptartmentList-1" value="ME">
          ME
        </option>
        <option id="DeptartmentList-2" value="EE">
          EE
        </option>
        <option id="DeptartmentList-3" value="CIS">
          CIS
        </option>
        <option id="DeptartmentList-4" value="PHY">
          PHY
        </option>
        <option id="DeptartmentList-5" value="CHE">
          CHE
        </option>
        <option id="DeptartmentList-6" value="MME">
          MME
        </option>
        <option id="DeptartmentList-7" value="NE">
          NE
        </option>
        <option id="DeptartmentList-8" value="MS">
          MS
        </option>
        <option id="DeptartmentList-9" value="CMS">
          CMS
        </option>
        <option id="DeptartmentList-10" value="Chemistry">
          Chemistry
        </option>
      </select>
      <table
        className="table caption-top border shadow mt-2"
        // style={{ fontSize: "12px" }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Semester</th>
            <th>Year</th>
            <th>Employee</th>
            <th>Course 1</th>
            <th>Course 2</th>
            <th>Course 3</th>
            <th>Managerial Position</th>
            <th>Number of BS Students</th>
            <th>Number of MS Students</th>
            <th>BS Project Supervisions</th>
            <th>MS/PhD Project Supervisions</th>
            <th>Research Project (Million)</th>
            <th>International Journal</th>
            <th>National Journal</th>
            <th>International Conference</th>
            <th>National Conference</th>
            <th>Book (int)</th>
            <th>Book (nat)</th>
            <th>Book Chapter</th>
            <th>Patent (int)</th>
            <th>Patent (nat)</th>
            <th>Journal / Conference Reviewer</th>
            <th>Technical Report</th>
            <th>Development of Product</th>
            <th>Workload</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workload
            ? workload.map((workloads, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{workloads.semester}</td>
                  <td>{workloads.year}</td>
                  <td>{workloads.employeeName}</td>
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
