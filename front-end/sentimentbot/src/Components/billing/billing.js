import React from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "../stripe/checkoutForm";
import StripeCheckout from "react-stripe-checkout";

import "../App.css";
class Billing extends React.Component {
  constructor() {
    super();
    this.state = { complete: false };
    
    this.onToken = this.onToken.bind(this);
  }

  onToken(token) {
    let response = fetch("https://botsentiment.herokuapp.com/api/stripe/subscribe10", {
      method: "POST",
      headers: { Accept: "application/json", 
                "Content-Type": "application/json" },
      body: JSON.stringify({
      stripeToken: token.id,
      email: token.email,
      })
    });

    if (response.status === 200)
      this.setState({
        complete: true
      });
    console.log("Purchase Complete!");
  }

  onToken2(token) {
    let response = fetch("https://botsentiment.herokuapp.com/api/stripe/subscribe50", {
      method: "POST",
      headers: { Accept: "application/json", 
                "Content-Type": "application/json" },
      body: JSON.stringify({
      stripeToken: token.id,
      email: token.email,
      })
    });

    if (response.status === 200)
      this.setState({
        complete: true
      });
    console.log("Purchase Complete!");
  }
  

  render() {

    if (this.state.complete) {
      return ( 
        <div className="purchase-complete billing-container">
          <h1>Purchase Complete</h1>
        </div>
      )
  } else {
    return (
      <div className="billing-container">
        <p className="billing-title"> Billing Page </p>

        {/* <StripeProvider apiKey="pk_test_IWDsGyB9paFAzC5KQEtIOfLG"> */}
        {/* <div className="stripe-box"> */}
        {/* <h1>React Stripe Elements Example</h1> */}
        {/* <Elements> */}
        {/* <CheckoutForm /> */}
        {/* </Elements> */}
        {/* </div> */}
        {/* </StripeProvider> */}

        <p>Click here for $10 a month subscription</p>
        <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_IWDsGyB9paFAzC5KQEtIOfLG"
        />
        <br/>
        <br/>
        <p>Click here for $50 a month subscription</p>
        <StripeCheckout
          token={this.onToken2}
          stripeKey="pk_test_IWDsGyB9paFAzC5KQEtIOfLG"
        />
      </div>
    );
  }
  }
}

export default Billing;
