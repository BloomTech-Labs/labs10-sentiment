import React from "react";
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from '../stripe/checkoutForm';
// import { Route, Router } from "react-router-dom";
// import App from "../App";

import "../App.css";

function Billing(props) {
  return (
    <div className="billing-container">
  
      <h2 className="billing-title"> Billing Page </h2>
        <StripeProvider apiKey="pk_test_IWDsGyB9paFAzC5KQEtIOfLG">
        <div className="stripe-box">
          {/* <h1>React Stripe Elements Example</h1> */}
          <Elements>
            <CheckoutForm />
          </Elements>
          </div>
          </StripeProvider>
    </div>
  );
}

export default Billing;
