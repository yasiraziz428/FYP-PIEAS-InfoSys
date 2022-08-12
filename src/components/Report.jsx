import React from "react";

const Report = () => {
  return (
    <div>
      <div className="container">
        <select className="mt-5">
          <option>All Years</option>{" "}
        </select>
        <select className="ms-2 mt-2">
          <option>All Semesters</option>
        </select>

        <div className="">
          <button className="btn btn-outline-dark px-5 float-end">
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
                <th>Name of Visiting Faculty Member (Dept)</th>
                <th>Program</th>
                <th>Credit Hours (Theory+Lab)</th>
                <th>Course Contributions</th>
                <th>Name of Course / Lab</th>
                <th>Total Contact Hours</th>
                <th>Expected Classes</th>
                <th>Pay Rate</th>
                <th>Financial Impact in Rs</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th></th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>

              {/* Sub-Total */}

              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <th>SubTotal</th>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Financial Impact Table For TA / Lab Engr */}

        <h3>Financial Impact Table For TA / Lab Engineer</h3>
        <div>
          <table className="table caption-top border shadow mt-1">
            <thead>
              <tr>
                <th>#</th>
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
              <tr>
                <th></th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>

              {/* Sub-Total */}

              <tr>
                <th></th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <th>SubTotal</th>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment Due Table for Visiting Faculty */}

        <h3>Payment Due Table for Visiting Faculty</h3>
        <div>
          <table className="table caption-top border shadow mt-1">
            <thead>
              <tr>
                <th>#</th>
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
              <tr>
                <th></th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>

              {/* Sub-Total */}

              <tr>
                <th></th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <th>SubTotal</th>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment Due Table for TA / Lab Engr */}

        <h3>Payment Due Table for TA / Lab Engineer</h3>
        <div>
          <table className="table caption-top border shadow mt-1">
            <thead>
              <tr>
                <th>#</th>
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
              <tr>
                <th></th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>

              {/* Sub-Total */}

              <tr>
                <th></th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <th>SubTotal</th>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Dept Wise Financial Impact Summary */}

        <h3> Department Wise Financial Impact Summary</h3>
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
              <tr>
                <th></th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>

              {/* Sub-Total */}

              <tr>
                <th></th>
                <th>Total Amount</th>
                <td></td>
                <th>total</th>
                <th>total</th>
                <th>SubTotal</th>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Dept Wise Payment Due Summary */}

        <h3>Dept Wise Payment Due Summary</h3>
        <div>
          <table className="table caption-top border shadow mt-1">
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
              <tr>
                <th></th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>

              {/* Sub-Total */}

              <tr>
                <th></th>
                <th>Total Amount</th>
                <td></td>
                <th>total</th>
                <th>total</th>
                <th>SubTotal</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Report;
