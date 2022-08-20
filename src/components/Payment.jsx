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

  const loadPayments = async () => {
    const _employees = await axios.get("http://localhost:3003/employees");
    const _payments = await axios.get("http://localhost:3003/payments");
    const employees_data = _employees.data;
    const payments_data = _payments.data;
    console.log("Payments", payments_data);

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

  const onSelectYear = (e) => {
    setSelectedYear(e.target.value);
  };

  const onSelectSemester = (e) => {
    setSelectedSemester(e.target.value);
  };

  const onChangeClasses = async (event, payment, course) => {
    let classes = Number(event.target.value);
    let impact_per_class = Math.round(
      course.financial_impact / course.total_classes
    );
    if (isNaN(classes)) {
      classes = 0;
    }

    //Modified Course For Local Change
    const modified_course = {
      ...course,
      payment_due: course.financial_impact + classes * impact_per_class,
      compensated_classes: classes,
    };

    const courses = payment.courses;
    const course_index = courses.findIndex((c) => c.id === course.id);
    if (course_index !== -1) {
      courses.splice(course_index, 1, modified_course);
    }

    const modified_payment = {
      ...payment,
      courses: courses,
      financial_impact: courses.reduce(
        (total, current) => total + current.financial_impact,
        0
      ),
      payment_due: courses.reduce(
        (total, current) => total + current.payment_due,
        0
      ),
      compensated_classes: courses.reduce(
        (total, current) => total + current.compensated_classes,
        0
      ),
    };

    //changing locally
    const modified_payments = [...payments];
    const payment_index = payments.findIndex((p) => p.id === payment.id);
    if (payment_index !== -1) {
      modified_payments.splice(payment_index, 1, modified_payment);
    }
    setPayments(modified_payments);
    //changing in db
    await axios.put(`http://localhost:3003/payments/${payment.id}`, {
      ...modified_payment,
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
        <option>All Departments</option>
        <option id="DepartmentList-1" value="ME">
          ME
        </option>
        <option id="DepartmentList-2" value="EE">
          EE
        </option>
        <option id="DepartmentList-3" value="CIS">
          CIS
        </option>
        <option id="DepartmentList-4" value="PHY">
          PHY
        </option>
        <option id="DepartmentList-5" value="CHE">
          CHE
        </option>
        <option id="DepartmentList-6" value="MME">
          MME
        </option>
        <option id="DepartmentList-7" value="NE">
          NE
        </option>
        <option id="DepartmentList-8" value="MS">
          MS
        </option>
        <option id="DepartmentList-9" value="CMS">
          CMS
        </option>
        <option id="DepartmentList-10" value="Chemistry">
          Chemistry
        </option>
      </select>
      <table className="table caption-top border shadow mt-1">
        <thead>
          <tr>
            <th>#</th>
            <th>Year</th>
            <th>Semester</th>
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
            <th className="px-3">± Classes</th>
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
                    <td>{payment.year}</td>
                    <td>{payment.semester}</td>
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
                      {payment.courses.map((course) => (
                        <>
                          <span>{course.contact_hours}</span>
                          <br />
                        </>
                      ))}
                      {/* {payment.total_contact_hours !== 0
                        ? `= ${payment.total_contact_hours}`
                        : "Not Available"} */}
                    </td>
                    <td>
                      {payment.courses.map((course) => (
                        <>
                          <span>{course.total_classes}</span>
                          <br />
                        </>
                      ))}
                    </td>
                    <td>
                      {payment.courses.map((course) => (
                        <>
                          <span>
                            {course.total_classes + course.compensated_classes}
                          </span>
                          <br />
                        </>
                      ))}
                    </td>
                    <td>Rs. {payment.pay_rate}</td>
                    <td>
                      {payment.courses.map((course) => (
                        <>
                          <span>Rs. {course.financial_impact}</span>
                          <br />
                        </>
                      ))}
                    </td>
                    <td>
                      {payment.courses.map((course) => (
                        <>
                          <span>Rs. {course.payment_due}</span>
                          <br />
                        </>
                      ))}
                    </td>
                    <td>
                      {payment.courses.map((course) => (
                        <>
                          <input
                            key={index}
                            type="Number"
                            placeholder="± Classes"
                            className="form-control"
                            name="classes"
                            defaultValue={course.compensated_classes}
                            onChange={(event) => {
                              onChangeClasses(event, payment, course);
                            }}
                          />
                        </>
                      ))}
                    </td>
                  </tr>
                ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default Payment;
