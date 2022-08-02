import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Payment = () => {
  const allYears = "All Years";
  const allSemesters = "All Semesters";

  const [payment, setPayment] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(allYears);
  const [selectedSemester, setSelectedSemester] = useState(allSemesters);
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    //loadPayment();
  }, [selectedYear, selectedSemester]);

  useEffect(() => {
    loadEmployee();
  }, [selectedYear, selectedSemester]);

  // const loadPayment = async () => {
  //   const result = await axios.get("http://localhost:3003/payments");
  //   setPayment(result.data.reverse());
  // };

  const loadEmployee = async () => {
    const _employees = await axios.get("http://localhost:3003/employees");
    const _workloads = await axios.get("http://localhost:3003/workloads");
    const _designations = await axios.get("http://localhost:3003/designations");
    const _parameters = await axios.get("http://localhost:3003/parameters");
    const employees_data = _employees.data;
    const workloads_data = _workloads.data;

    //Populating Years
    const yearsSet = new Set(
      workloads_data.filter((w) => w.year && w.year !== "").map((w) => w.year)
    );
    const yearsArray = [...yearsSet].sort();
    setYears(yearsArray);

    //Filtering employees based on designation
    const filtered_employees = employees_data.filter((e) => {
      const designation_obj = _designations.data.find(
        (d) => d.name === e.designation
      );
      if (!designation_obj.payrate) return false;
      return true;
    });

    //Correlating Workloads and Employees
    const modified_result = associateWorkload(
      filtered_employees,
      _workloads.data,
      _designations.data,
      _parameters.data
    );
    setEmployee(modified_result);
  };

  const associateWorkload = (
    employees,
    workloads,
    designations,
    parameters
  ) => {
    const modified_employees = employees.map((e) => {
      let bs_contact_hours = 0;
      let ms_contact_hours = 0;
      let phd_contact_hours = 0;
      let total_classes = 0;

      //summing all contact hours separated by BS, MS and PHD for all workloads of that particular employee e
      workloads
        .filter(
          (w) =>
            w.employeeName === e.employeeName &&
            (selectedYear !== allYears ? w.year === selectedYear : true) &&
            (selectedSemester !== allSemesters
              ? w.semester === selectedSemester
              : true)
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
        });

      let total_contact_hours =
        bs_contact_hours + ms_contact_hours + phd_contact_hours;
      //Calculating Pay_Rate, Financial Impact
      let pay_rate = designations.find((d) => d.name === e.designation).payrate;
      let financial_impact =
        Number(total_contact_hours) *
        Number(pay_rate) *
        Number(parameters.totalWeeksInSemester);

      let payment_due = financial_impact;

      return {
        ...e,
        total_contact_hours,
        bs_contact_hours,
        ms_contact_hours,
        phd_contact_hours,
        pay_rate,
        financial_impact,
        payment_due,
        total_classes,
      };
    });
    return modified_employees;
  };

  const onSelectYear = (e) => {
    setSelectedYear(e.target.value);
  };

  const onSelectSemester = (e) => {
    setSelectedSemester(e.target.value);
  };

  const onChangeClasses = (event, emp) => {
    let classes = Number(event.target.value);
    let impact_per_class = emp.financial_impact / emp.total_classes;
    if (isNaN(classes)) {
      classes = 0;
    }
    let modified_emp = {
      ...emp,
      payment_due: emp.financial_impact + classes * impact_per_class,
    };
    const employee_copy = [...employee];
    const employee_index = employee_copy.find(
      (e) => e.employeeName === emp.employeeName
    );
    if (employee_index !== -1) {
      employee_copy.splice(employee_index, 1, modified_emp);
    } else {
      employee_copy.splice(employee_copy.length - 1, 0, modified_emp);
    }
    setEmployee(employee_copy);
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
      </select>
      <table className="table caption-top border shadow mt-1">
        <thead>
          <tr>
            <th>#</th>
            <th>Employee</th>
            <th>Designation</th>
            <th>Department</th>
            <th>Total Contact Hours</th>
            <th>Pay Rate</th>
            <th>Financial Impact in Rs</th>
            <th>Payment Due in Rs</th>
          </tr>
        </thead>
        <tbody>
          {employee
            ? employee
                .filter((e) => e.total_contact_hours !== 0)
                .map((employee, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{employee.employeeName}</td>
                    <td>{employee.designation}</td>
                    <td>{employee.department}</td>
                    <td>
                      {employee.total_contact_hours !== 0
                        ? employee.total_contact_hours
                        : "Not Available"}
                    </td>
                    <td>Rs. {employee.pay_rate}</td>
                    <td>Rs. {employee.financial_impact}</td>
                    <td>
                      <div class="row">
                        <div class="col-4">
                          Rs. {Math.round(employee.payment_due)}
                        </div>
                        <div class="col-8">
                          <input
                            type="Number"
                            placeholder="± Classes"
                            className="form-control"
                            name="classes"
                            onChange={(event) => {
                              onChangeClasses(event, employee);
                            }}
                          />
                        </div>
                      </div>
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
