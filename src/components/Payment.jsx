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
    loadPayment();
  }, [selectedYear, selectedSemester]);

  useEffect(() => {
    loadEmployee();
  }, [selectedYear, selectedSemester]);

  const loadPayment = async () => {
    const result = await axios.get("http://localhost:3003/payments");
    setPayment(result.data.reverse());
  };

  const loadEmployee = async () => {
    const employees = await axios.get("http://localhost:3003/employees");
    const workloads = await axios.get("http://localhost:3003/workloads");
    const workloads_data = workloads.data;
    //Populating Years
    const yearsSet = new Set(
      workloads_data.filter((w) => w.year && w.year !== "").map((w) => w.year)
    );
    const yearsArray = [...yearsSet].sort();
    setYears(yearsArray);
    //Correlating Workloads and Employees
    const modified_result = await associateWorkload(
      employees.data,
      workloads.data
    );
    setEmployee(modified_result);
  };

  const associateWorkload = async (employees, workloads) => {
    const modified_employees = employees.map((e) => {
      let bs_contact_hours = 0;
      let ms_contact_hours = 0;
      let phd_contact_hours = 0;
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
        });

      return {
        ...e,
        contact_hours: bs_contact_hours + ms_contact_hours + phd_contact_hours,
        bs_contact_hours,
        ms_contact_hours,
        phd_contact_hours,
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

  return (
    <div className="container">
      <select className="mt-5" onChange={onSelectYear} value={selectedYear}>
        <option value={allYears}>All</option>
        {years.map((year) => (
          <option value={year}>{year}</option>
        ))}
      </select>
      <select className="ms-5 mt-2" onChange={onSelectSemester}>
        <option value={allSemesters}>All Semesters</option>
        <option value={"Spring"}>Spring</option>
        <option value={"Fall"}>Fall</option>
      </select>
      <table className="table caption-top border shadow mt-5">
        <thead>
          <tr>
            <th>#</th>
            <th>Employee</th>
            <th>Designtaion</th>
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
                .filter((e) => e.contact_hours !== 0)
                .map((employee, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td> {employee.employeeName} </td>
                    <td> {employee.designation} </td>
                    <td>{employee.department}</td>
                    <td>
                      {employee.contact_hours !== 0
                        ? employee.contact_hours
                        : "Not Available"}
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default Payment;
