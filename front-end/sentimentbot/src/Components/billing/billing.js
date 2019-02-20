import React from "react";
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from '../stripe/checkoutForm';

function Billing(props) {
  return (
    <div>
      <p> Billing Page </p>

        <StripeProvider apiKey="pk_test_IWDsGyB9paFAzC5KQEtIOfLG">
        <div className="example">
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
          </div>
          </StripeProvider>
    </div>
  );
}

export default Billing;
