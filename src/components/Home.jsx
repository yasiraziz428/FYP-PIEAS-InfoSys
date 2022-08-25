import React from "react";

const Home = () => {
  return (
    <div className="container align-middle text-center">
      <h3 className="d-flex justify-content-center pt-2 mt-5">
        Welcome to PIEAS Information System!
      </h3>
      <hr></hr>
      <div
        className="w-50 text-center mt-5"
        style={{
          margin: "auto",
          width: "60%",
          border: "5px solid #ecf0f1",
          padding: "10px",
        }}
      >
        <p className="px-5 py-3">
          The objective of this project is to develop an information system
          through which we can manage workload and payment of employees
        </p>
      </div>
    </div>
  );
};
export default Home;
