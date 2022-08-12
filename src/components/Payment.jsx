import React, { useState, useEffect } from "react";
import axios from "axios";

const Payment = () => {
  const allYears = "All Years";
  const allSemesters = "All Semesters";

  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(allYears);
  const [selectedSemester, setSelectedSemester] = useState(allSemesters);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    loadPayments();
  }, []);

  // useEffect(() => {
  //   loadEmployee();
  // }, [selectedYear, selectedSemester]);

  // const loadPayment = async () => {
  //   const result = await axios.get("http://localhost:3003/payments");
  //   setPayment(result.data.reverse());
  // };

  const loadPayments = async () => {
    const _employees = await axios.get("http://localhost:3003/employees");
    const _payments = await axios.get("http://localhost:3003/payments");
    const employees_data = _employees.data;
    const payments_data = _payments.data;

    //Populating Years
    const yearsSet = new Set(
      payments_data.filter((p) => p.year && p.year !== "").map((w) => w.year)
    );
    const yearsArray = [...yearsSet].sort();
    setYears(yearsArray);

    setPayments(
      payments_data.map((p) => {
        const employee = employees_data.find((e) => e.id === p.employee_id);
        return {
          ...p,
          employee_data: { ...employee },
        };
      })
    );
  };

  // const loadEmployee = async () => {
  //   const _employees = await axios.get("http://localhost:3003/employees");
  //   const _workloads = await axios.get("http://localhost:3003/workloads");
  //   const _designations = await axios.get("http://localhost:3003/designations");
  //   const _parameters = await axios.get("http://localhost:3003/parameters");
  //   const _courses = await axios.get("http://localhost:3003/courses");
  //   const employees_data = _employees.data;
  //   const workloads_data = _workloads.data;

  //   //Populating Years
  //   const yearsSet = new Set(
  //     workloads_data.filter((w) => w.year && w.year !== "").map((w) => w.year)
  //   );
  //   const yearsArray = [...yearsSet].sort();
  //   setYears(yearsArray);

  //   //Filtering employees based on designation
  //   const filtered_employees = employees_data.filter((e) => {
  //     const designation_obj = _designations.data.find(
  //       (d) => d.name === e.designation
  //     );
  //     if (!designation_obj.payrate) return false;
  //     return true;
  //   });

  //   //Correlating Workloads and Employees
  //   const modified_result = associateWorkload(
  //     filtered_employees,
  //     _workloads.data,
  //     _designations.data,
  //     _parameters.data,
  //     _courses.data
  //   );
  //   setEmployee(modified_result);
  // };

  // const associateWorkload = (
  //   employees,
  //   workloads,
  //   designations,
  //   parameters,
  //   all_courses
  // ) => {
  //   const modified_employees = employees.map((e) => {
  //     let bs_contact_hours = 0;
  //     let ms_contact_hours = 0;
  //     let phd_contact_hours = 0;
  //     let total_classes = 0;
  //     let courses = [];

  //     //summing all contact hours separated by BS, MS and PHD for all workloads of that particular employee e
  //     workloads
  //       .filter(
  //         (w) =>
  //           w.employeeName === e.employeeName &&
  //           (selectedYear !== allYears ? w.year === selectedYear : true) &&
  //           (selectedSemester !== allSemesters
  //             ? w.semester === selectedSemester
  //             : true)
  //       )
  //       .forEach((w) => {
  //         if (w.bsContactHrs) {
  //           bs_contact_hours += w.bsContactHrs;
  //         }
  //         if (w.msContactHrs) {
  //           ms_contact_hours += w.msContactHrs;
  //         }
  //         if (w.phdContactHrs) {
  //           phd_contact_hours += w.phdContactHrs;
  //         }
  //         total_classes += w.totalClasses;
  //         //Adding courses details
  //         if (w.courseTitle1 !== "") {
  //           const courseObject = all_courses.find(
  //             (c) => c.courseTitle === w.courseTitle1
  //           );
  //           courses.push({
  //             title: w.courseTitle1,
  //             contribution: w.courseContribution1,
  //             program: courseObject.program,
  //             credit_hours:
  //               Number(courseObject.theory) + Number(courseObject.lab),
  //           });
  //         }

  //         if (w.courseTitle2 !== "") {
  //           const courseObject = all_courses.find(
  //             (c) => c.courseTitle === w.courseTitle2
  //           );
  //           courses.push({
  //             title: w.courseTitle2,
  //             contribution: w.courseContribution2,
  //             program: courseObject.program,
  //             credit_hours:
  //               Number(courseObject.theory) + Number(courseObject.lab),
  //           });
  //         }

  //         if (w.courseTitle3 !== "") {
  //           const courseObject = all_courses.find(
  //             (c) => c.courseTitle === w.courseTitle3
  //           );
  //           courses.push({
  //             title: w.courseTitle3,
  //             contribution: w.courseContribution3,
  //             program: courseObject.program,
  //             credit_hours:
  //               Number(courseObject.theory) + Number(courseObject.lab),
  //           });
  //         }
  //       });

  //     let total_contact_hours =
  //       bs_contact_hours + ms_contact_hours + phd_contact_hours;
  //     //Calculating Pay_Rate, Financial Impact
  //     let pay_rate = designations.find((d) => d.name === e.designation).payrate;
  //     let financial_impact =
  //       Number(total_contact_hours) *
  //       Number(pay_rate) *
  //       Number(parameters.totalWeeksInSemester);

  //     let payment_due = financial_impact;

  //     return {
  //       ...e,
  //       total_contact_hours,
  //       bs_contact_hours,
  //       ms_contact_hours,
  //       phd_contact_hours,
  //       pay_rate,
  //       financial_impact,
  //       payment_due,
  //       total_classes,
  //       courses,
  //     };
  //   });
  //   return modified_employees;
  // };

  const onSelectYear = (e) => {
    setSelectedYear(e.target.value);
  };

  const onSelectSemester = (e) => {
    setSelectedSemester(e.target.value);
  };

  const onChangeClasses = async (event, payment) => {
    let classes = Number(event.target.value);
    let impact_per_class = payment.financial_impact / payment.total_classes;
    if (isNaN(classes)) {
      classes = 0;
    }
    console.log(`Payment ID: ${payment.id} - Classes: ${classes}`);
    const modified_payment = {
      ...payment,
      payment_due: payment.financial_impact + classes * impact_per_class,
    };
    //changing locally
    const modified_payments = [...payments];
    const payment_index = payments.findIndex((p) => p.id === payment.id);
    if (payment_index !== -1) {
      modified_payments.splice(payment_index, 1, {
        ...modified_payment,
        compensated_classes: event.target.value,
      });
    }
    setPayments(modified_payments);
    //changing in db
    await axios.put(`http://localhost:3003/payments/${payment.id}`, {
      ...modified_payment,
      compensated_classes: classes,
      employee_data: undefined,
    });
  };

  return (
    <div className="container">
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
      <select className="ms-2 mt-2">
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
      <table className="table caption-top border shadow mt-1">
        <thead>
          <tr>
            <th>#</th>
            <th>Employee</th>
            <th>Designation</th>
            <th>Courses & Programs</th>
            <th>Course Contributions</th>
            <th>Credit Hours (Theory+Lab)</th>
            <th>Total Contact Hours</th>
            <th>Expected Classes</th>
            <th>Actual Classes</th>
            <th>Pay Rate</th>
            <th>Financial Impact in Rs</th>
            <th>Payment Due in Rs</th>
            <th>± Classes</th>
          </tr>
        </thead>
        <tbody>
          {payments
            ? payments
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
                .map((payment, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>
                      {payment.employee_data.employeeName} (
                      {payment.employee_data.department})
                    </td>
                    <td>{payment.employee_data.designation}</td>
                    <td>
                      {payment.courses.map((course) => (
                        <>
                          <span>
                            {course.title} ({course.program})
                          </span>
                          <br />
                        </>
                      ))}
                    </td>
                    <td>
                      {payment.courses.map((course) => (
                        <>
                          <span>{course.contribution}%</span>
                          <br />
                        </>
                      ))}
                    </td>
                    <td>
                      {payment.courses.map((course) => (
                        <>
                          <span>{course.credit_hours}</span>
                          <br />
                        </>
                      ))}
                    </td>
                    <td>
                      {payment.total_contact_hours !== 0
                        ? payment.total_contact_hours
                        : "Not Available"}
                    </td>
                    <td>{payment.total_classes}</td>
                    <td>
                      {payment.total_classes +
                        Number(payment.compensated_classes)}
                    </td>
                    <td>Rs. {payment.pay_rate}</td>
                    <td>Rs. {payment.financial_impact}</td>
                    <td>Rs. {Math.round(payment.payment_due)}</td>
                    <td>
                      <input
                        key={index}
                        type="Number"
                        placeholder="± Classes"
                        className="form-control"
                        name="classes"
                        value={payment.compensated_classes}
                        onChange={(event) => {
                          onChangeClasses(event, payment);
                        }}
                      />
                    </td>
                  </tr>
                ))
            : null}

          {/* Sub-Total */}
          <tr>
            <td></td>
            <th>Total Amount</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <th>SubTotal</th>
            <th>SubTotal</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Payment;
