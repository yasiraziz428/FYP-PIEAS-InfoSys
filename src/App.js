import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Employee from "./components/Employee";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import Course from "./components/Course";
import AddCourse from "./components/AddCourse";
import EditCourse from "./components/EditCourse";
import Workload from "./components/Workload";
import AddWorkload from "./components/AddWorkload";
import Payment from "./components/Payment";
import EditWorkload from "./components/EditWorkload";
import Parameters from "./components/Parameters";
import Report from "./components/Report";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/employee" element={<Employee />} />
          <Route exact path="/employee/add" element={<AddEmployee />} />
          <Route exact path="/employee/edit/:id" element={<EditEmployee />} />
          <Route exact path="/course" element={<Course />} />
          <Route exact path="/course/add" element={<AddCourse />} />
          <Route exact path="/course/edit/:id" element={<EditCourse />} />
          <Route exact path="/workload" element={<Workload />} />
          <Route exact path="/workload/add" element={<AddWorkload />} />
          <Route exact path="/workload/edit/:id" element={<EditWorkload />} />
          <Route exact path="/payment" element={<Payment />} />
          <Route exact path="/report" element={<Report />} />
          <Route exact path="/parameters" element={<Parameters />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
