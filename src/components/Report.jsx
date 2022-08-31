import React, { useState, useEffect } from "react";
import axios from "axios";

const Report = () => {
  const allYears = "All Years";
  const allSemesters = "All Semesters";

  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(allYears);
  const [selectedSemester, setSelectedSemester] = useState(allSemesters);
  const [payments, setPayments] = useState([]);
  const [departments, setDepartments] = useState({});
  const [departmentPayments, setDepartmentPayments] = useState({});

  useEffect(() => {
    loadDepartments();
    loadPayments();
  }, []);

  useEffect(() => {
    console.log(payments);
    const department_payment_obj = {};
    payments
      .filter((p) => {
        const d = p.employee_data.designation.toLowerCase();
        return (
          p.total_contact_hours !== 0 &&
          (selectedYear !== allYears ? p.year === selectedYear : true) &&
          (selectedSemester !== allSemesters
            ? p.semester === selectedSemester
            : true) &&
          (d.includes("visiting faculty") ||
            d.includes("ta") ||
            d.includes("lab engineer"))
        );
      })
      .forEach((payment) => {
        const designation = payment.employee_data.designation.toLowerCase();
        payment.courses.forEach((course) => {
          const department = departments[course.dept];
          //initializing department entry
          if (!department_payment_obj[department]) {
            department_payment_obj[department] = {
              programs: [],
              financial_impact: {
                "visiting faculty": 0,
                "ta/lab engineer": 0,
              },
              payment_due: {
                "visiting faculty": 0,
                "ta/lab engineer": 0,
              },
            };
          }
          if (
            !department_payment_obj[department]["programs"].includes(
              course.program
            )
          ) {
            department_payment_obj[department]["programs"].push(course.program);
          }
          //adding financial impact and payment due
          if (designation.includes("visiting faculty")) {
            department_payment_obj[department]["financial_impact"][
              "visiting faculty"
            ] += Number(course.financial_impact);
            department_payment_obj[department]["payment_due"][
              "visiting faculty"
            ] += Number(course.payment_due);
          } else if (
            designation.includes("ta") ||
            designation.includes("lab engineer")
          ) {
            department_payment_obj[department]["financial_impact"][
              "ta/lab engineer"
            ] += Number(course.financial_impact);
            department_payment_obj[department]["payment_due"][
              "ta/lab engineer"
            ] += Number(course.payment_due);
          }
        });
      });
    setDepartmentPayments(department_payment_obj);
  }, [payments, selectedYear, selectedSemester]);

  const loadDepartments = async () => {
    const _departments = await axios.get("http://localhost:3003/departments");
    const departments_object = {};
    _departments.data.forEach((d) => {
      departments_object[d.name] = d.full_name;
    });
    setDepartments(departments_object);
  };

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

    setPayments(payments_data.reverse());
  };

  const onSelectYear = (e) => {
    setSelectedYear(e.target.value);
  };

  const onSelectSemester = (e) => {
    setSelectedSemester(e.target.value);
  };

  return (
    <div>
      <div className="container">
        <select className="mt-5" onChange={onSelectYear}>
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
        <div className="">
          <button
            className="btn btn-outline-dark px-5 float-end"
            onClick={() => {
              window.print();
            }}
          >
            Print <i class="fa fa-print"></i>
          </button>
        </div>

        {/* Payment Section */}

        {/* Financial Impact Table For Visiting Faculty*/}

        <h3 className="mt-5">Financial Impact Table For Visiting Faculty</h3>
        <div>
          <table className="table caption-top border shadow mt-1">
            <thead>
              <tr>
                <th>#</th>
                {/* <th>Year</th>
                <th>Semester</th> */}
                <th>Name of Visiting Faculty Member (Dept)</th>
                <th>Program</th>
                <th>Name of Course / Lab</th>
                <th>Credit Hours (Theory+Lab)</th>
                <th>Course Contributions</th>
                <th>Total Contact Hours</th>
                <th>Expected Classes</th>
                <th>Pay Rate</th>
                <th>Financial Impact in Rs</th>
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
                          : true) &&
                        p.employee_data.designation
                          .toLowerCase()
                          .includes("visiting faculty")
                    )
                    .map((payment, index) => (
                      <tr>
                        <th>{index + 1}</th>
                        {/* <td>{payment.year}</td>
                        <td>{payment.semester}</td> */}
                        <td>
                          {payment.employee_data.employeeName} (
                          {payment.employee_data.department})
                        </td>
                        <td>
                          {payment.courses.map((course) => (
                            <>
                              <span>{course.program}</span>
                              <br />
                            </>
                          ))}
                        </td>
                        <td>
                          {payment.courses.map((course) => (
                            <>
                              <span>{course.title}</span>
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
                              <span>{course.contribution}%</span>
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
                        <td>Rs. {payment.pay_rate}</td>
                        <td>Rs. {payment.financial_impact}</td>
                      </tr>
                    ))
                : null}

              {/* Sub-Total */}

              <tr>
                <td></td>
                {/* <td></td>
                <td></td> */}
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <th>SubTotal</th>
                <th>
                  Rs.{" "}
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
                              : true) &&
                            p.employee_data.designation
                              .toLowerCase()
                              .includes("visiting faculty")
                        )
                        .reduce(
                          (total, current) => total + current.financial_impact,
                          0
                        )
                    : 0}
                </th>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Financial Impact Table For TA / Lab Engr */}

        <h3 className="mt-5">Financial Impact Table For TA / Lab Engineer</h3>
        <div>
          <table className="table caption-top border shadow mt-1">
            <thead>
              <tr>
                <th>#</th>
                {/* <th>Year</th>
                <th>Semester</th> */}
                <th>Name of TA / Lab Engineer (Dept)</th>
                <th>Program</th>
                <th>Name of Course / Lab</th>
                <th>Credit Hours (Theory+Lab)</th>
                <th>Course Contributions</th>
                <th>Total Contact Hours</th>
                <th>Expected Classes</th>
                <th>Pay Rate</th>
                <th>Financial Impact in Rs</th>
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
                          : true) &&
                        p.employee_data.designation
                          .toLowerCase()
                          .includes("ta/lab engineer")
                    )
                    .map((payment, index) => (
                      <tr>
                        <th>{index + 1}</th>
                        {/* <td>{payment.year}</td>
                        <td>{payment.semester}</td> */}
                        <td>
                          {payment.employee_data.employeeName} (
                          {payment.employee_data.department})
                        </td>
                        <td>
                          {payment.courses.map((course) => (
                            <>
                              <span>{course.program}</span>
                              <br />
                            </>
                          ))}
                        </td>
                        <td>
                          {payment.courses.map((course) => (
                            <>
                              <span>{course.title}</span>
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
                              <span>{course.contribution}%</span>
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
                        <td>Rs. {payment.pay_rate}</td>
                        <td>Rs. {payment.financial_impact}</td>
                      </tr>
                    ))
                : null}

              {/* Sub-Total */}

              <tr>
                <th></th>
                {/* <td></td>
                <td></td> */}
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <th>SubTotal</th>
                <th>
                  Rs.{" "}
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
                              : true) &&
                            p.employee_data.designation
                              .toLowerCase()
                              .includes("ta/lab engineer")
                        )
                        .reduce(
                          (total, current) => total + current.financial_impact,
                          0
                        )
                    : 0}
                </th>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment Due Table for Visiting Faculty */}

        <h3 className="mt-5">Payment Due Table for Visiting Faculty</h3>
        <div>
          <table className="table caption-top border shadow mt-1">
            <thead>
              <tr>
                <th>#</th>
                {/* <th>Year</th>
                <th>Semester</th> */}
                <th>Name of Visiting Faculty Member (Dept)</th>
                <th>Program</th>
                <th>Name of Course / Lab</th>
                <th>Credit Hours (Theory+Lab)</th>
                <th>Course Contributions</th>
                <th>Total Contact Hours</th>
                <th>Actual Classes</th>
                <th>Pay Rate</th>
                <th>Payment Due in Rs</th>
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
                          : true) &&
                        p.employee_data.designation
                          .toLowerCase()
                          .includes("visiting faculty")
                    )
                    .map((payment, index) => (
                      <tr>
                        <th>{index + 1}</th>
                        {/* <td>{payment.year}</td>
                        <td>{payment.semester}</td> */}
                        <td>
                          {payment.employee_data.employeeName} (
                          {payment.employee_data.department})
                        </td>
                        <td>
                          {payment.courses.map((course) => (
                            <>
                              <span>{course.program}</span>
                              <br />
                            </>
                          ))}
                        </td>
                        <td>
                          {payment.courses.map((course) => (
                            <>
                              <span>{course.title}</span>
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
                              <span>{course.contribution}%</span>
                              <br />
                            </>
                          ))}
                        </td>

                        <td>
                          {payment.total_contact_hours !== 0
                            ? payment.total_contact_hours
                            : "Not Available"}
                        </td>
                        <td>
                          {payment.total_classes +
                            Number(payment.compensated_classes)}
                        </td>
                        <td>Rs. {payment.pay_rate}</td>
                        <td>Rs. {payment.payment_due}</td>
                      </tr>
                    ))
                : null}

              {/* Sub-Total */}

              <tr>
                <th></th>
                {/* <td></td>
                <td></td> */}
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <th>SubTotal</th>
                <th>
                  Rs.{" "}
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
                              : true) &&
                            p.employee_data.designation
                              .toLowerCase()
                              .includes("visiting faculty")
                        )
                        .reduce(
                          (total, current) => total + current.payment_due,
                          0
                        )
                    : 0}
                </th>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment Due Table for TA / Lab Engr */}

        <h3 className="mt-5">Payment Due Table for TA / Lab Engineer</h3>
        <div>
          <table className="table caption-top border shadow mt-1">
            <thead>
              <tr>
                <th>#</th>
                {/* <th>Year</th>
                <th>Semester</th> */}
                <th>Name of TA / Lab Engineer (Dept)</th>
                <th>Program</th>
                <th>Name of Course / Lab</th>
                <th>Credit Hours (Theory+Lab)</th>
                <th>Course Contributions</th>
                <th>Total Contact Hours</th>
                <th>Actual Classes</th>
                <th>Pay Rate</th>
                <th>Payment Due in Rs</th>
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
                          : true) &&
                        p.employee_data.designation
                          .toLowerCase()
                          .includes("ta/lab engineer")
                    )
                    .map((payment, index) => (
                      <tr>
                        <th>{index + 1}</th>
                        {/* <td>{payment.year}</td>
                        <td>{payment.semester}</td> */}
                        <td>
                          {payment.employee_data.employeeName} (
                          {payment.employee_data.department})
                        </td>
                        <td>
                          {payment.courses.map((course) => (
                            <>
                              <span>{course.program}</span>
                              <br />
                            </>
                          ))}
                        </td>
                        <td>
                          {payment.courses.map((course) => (
                            <>
                              <span>{course.title}</span>
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
                              <span>{course.contribution}%</span>
                              <br />
                            </>
                          ))}
                        </td>

                        <td>
                          {payment.total_contact_hours !== 0
                            ? payment.total_contact_hours
                            : "Not Available"}
                        </td>
                        <td>
                          {payment.total_classes +
                            Number(payment.compensated_classes)}
                        </td>
                        <td>Rs. {payment.pay_rate}</td>
                        <td>Rs. {payment.payment_due}</td>
                      </tr>
                    ))
                : null}

              {/* Sub-Total */}

              <tr>
                <th></th>
                {/* <td></td>
                <td></td> */}
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <th>SubTotal</th>
                <th>
                  Rs.{" "}
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
                              : true) &&
                            p.employee_data.designation
                              .toLowerCase()
                              .includes("ta/lab engineer")
                        )
                        .reduce(
                          (total, current) => total + current.payment_due,
                          0
                        )
                    : 0}
                </th>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Dept Wise Financial Impact Summary */}

        <h3 className="mt-5"> Department Wise Financial Impact Summary</h3>
        <div>
          <table className="table caption-top border shadow mt-1">
            <thead>
              <tr>
                <th>#</th>
                <th>Department</th>
                <th>Programs</th>
                <th>Visiting Faculty Amount (RS)</th>
                <th>TA / Lab Engr Amount (RS)</th>
                <th>Total Financial Impact (RS)</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(departmentPayments).map((department, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <td>{department}</td>
                  <td>
                    {departmentPayments[department]["programs"].map(
                      (program) => (
                        <>
                          <span>{program}</span>
                          <br />
                        </>
                      )
                    )}
                  </td>
                  <td>
                    {
                      departmentPayments[department]["financial_impact"][
                        "visiting faculty"
                      ]
                    }
                  </td>
                  <td>
                    {
                      departmentPayments[department]["financial_impact"][
                        "ta/lab engineer"
                      ]
                    }
                  </td>
                  <td>
                    {departmentPayments[department]["financial_impact"][
                      "visiting faculty"
                    ] +
                      departmentPayments[department]["financial_impact"][
                        "ta/lab engineer"
                      ]}
                  </td>
                </tr>
              ))}
              {/* Sub-Total */}

              <tr>
                <th></th>
                <th>Total Amount</th>
                <td></td>
                <th>
                  {Object.keys(departmentPayments).reduce(
                    (total, department) =>
                      total +
                      departmentPayments[department]["financial_impact"][
                        "visiting faculty"
                      ],
                    0
                  )}
                </th>
                <th>
                  {Object.keys(departmentPayments).reduce(
                    (total, department) =>
                      total +
                      departmentPayments[department]["financial_impact"][
                        "ta/lab engineer"
                      ],
                    0
                  )}
                </th>
                <th>
                  {Object.keys(departmentPayments).reduce(
                    (total, department) =>
                      total +
                      departmentPayments[department]["financial_impact"][
                        "visiting faculty"
                      ] +
                      departmentPayments[department]["financial_impact"][
                        "ta/lab engineer"
                      ],
                    0
                  )}
                </th>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Dept Wise Payment Due Summary */}

        <h3 className="mt-5"> Department Wise Payment Due Summary</h3>
        <div>
          <table className="table caption-top border shadow mt-1 mb-5">
            <thead>
              <tr>
                <th>#</th>
                <th>Department</th>
                <th>Programs</th>
                <th>Visiting Faculty Amount (RS)</th>
                <th>TA / Lab Engr Amount (RS)</th>
                <th>Total Payment Due (RS)</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(departmentPayments).map((department, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <td>{department}</td>
                  <td>
                    {departmentPayments[department]["programs"].map(
                      (program) => (
                        <>
                          <span>{program}</span>
                          <br />
                        </>
                      )
                    )}
                  </td>
                  <td>
                    {
                      departmentPayments[department]["payment_due"][
                        "visiting faculty"
                      ]
                    }
                  </td>
                  <td>
                    {
                      departmentPayments[department]["payment_due"][
                        "ta/lab engineer"
                      ]
                    }
                  </td>
                  <td>
                    {departmentPayments[department]["payment_due"][
                      "visiting faculty"
                    ] +
                      departmentPayments[department]["payment_due"][
                        "ta/lab engineer"
                      ]}
                  </td>
                </tr>
              ))}
              {/* Sub-Total */}

              <tr>
                <th></th>
                <th>Total Amount</th>
                <td></td>
                <th>
                  {Object.keys(departmentPayments).reduce(
                    (total, department) =>
                      total +
                      departmentPayments[department]["payment_due"][
                        "visiting faculty"
                      ],
                    0
                  )}
                </th>
                <th>
                  {Object.keys(departmentPayments).reduce(
                    (total, department) =>
                      total +
                      departmentPayments[department]["payment_due"][
                        "ta/lab engineer"
                      ],
                    0
                  )}
                </th>
                <th>
                  {Object.keys(departmentPayments).reduce(
                    (total, department) =>
                      total +
                      departmentPayments[department]["payment_due"][
                        "visiting faculty"
                      ] +
                      departmentPayments[department]["payment_due"][
                        "ta/lab engineer"
                      ],
                    0
                  )}
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Report;
