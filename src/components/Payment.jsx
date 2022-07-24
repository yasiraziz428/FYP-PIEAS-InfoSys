import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Payment = () => {
  const [payment, setPayment] = useState([]);

  useEffect(() => {
    loadPayment();
  }, []);

  const loadPayment = async () => {
    const result = await axios.get("http://localhost:3003/payments");
    console.log(result);
    setPayment(result.data.reverse());
  };

  const deletePayment = async (id) => {
    await axios.delete(`http://localhost:3003/payments/${id}`);
    loadPayment();
  };

  return (
    <div className="container">
      <table className="table caption-top border shadow mt-5">
        <thead>
          <tr>
            <th>#</th>
            <th>Employee</th>
            <th>Department</th>
            <th>Total Contact Hours</th>
            <th>Pay Rate</th>
            <th>Financial Impact in Rs</th>
            <th>Payment Due in Rs</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payment
            ? payment.map((payments, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <Link
                      className="btn btn-outline-primary me-2"
                      to={`/payment/edit/${payments.id}`}
                    >
                      <i class="fa fa-pen"></i>
                    </Link>
                    <Link
                      className="btn btn-outline-danger"
                      to="#"
                      onClick={() => deletePayment(payments.id)}
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

export default Payment;
