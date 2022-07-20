import { React } from "react";
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

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/employee" element={<Employee />} />
          <Route exact path="/course" element={<Course />} />
          <Route exact path="/course/add" element={<AddCourse />} />
          <Route exact path="/course/edit/:id" element={<EditCourse />} />
          <Route exact path="/employee/add" element={<AddEmployee />} />
          <Route exact path="/employee/edit/:id" element={<EditEmployee />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
