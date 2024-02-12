import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "./css/paypalPayment.css";
import { useAuth } from "../Context/AuthContext";

export default function PaypalPayment() {
  const { state, dispatch } = useAuth();
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Purchase",
            amount: {
              currency_code: "CAD",
              value: 30,
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
    });
  };

  //capture likely error
  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
  };

  useEffect(() => {
    if (success) {
      alert("Payment successful!!");
      console.log("Order successful . Your order id is--", orderID);
    }
    if (ErrorMessage) {
      alert("Payment Unsuccessful!!");
    }
  }, [success, ErrorMessage]);

  const initialOptions = {
    clientId: "test",
    currency: "CAD",
    intent: "capture",
  };
  return (
    <div style={{marginBottom:'250px'}}>
      <div class="row">
        <div class="column">
          <div class="card">
            <div class="container">
              <h2>
                {state.user.fname} {state.user.lname}
              </h2>
              <p class="title">{state.user.username}</p>
              <p>{state.user.email}</p>
              <p>
                <button class="button" onClick={() => setShow(true)}>
                  Pay Now
                </button>
              </p>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card">
            <div class="container">
              <PayPalScriptProvider options={initialOptions}>
                {show ? (
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onCancel={onError}
                  />
                ) : null}
              </PayPalScriptProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
