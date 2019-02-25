import React from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "../stripe/checkoutForm";
import StripeCheckout from "react-stripe-checkout";
import { Route, Link } from "react-router-dom";
import Home from "../Home";
import "../App.css";

class Billing extends React.Component {
  constructor() {
    super();
    this.state = { complete: false };

    this.onToken = this.onToken.bind(this);
    this.onToken2 = this.onToken2.bind(this);
  }

  async onToken(token) {
    let response = await fetch("https://botsentiment.herokuapp.com/api/stripe/subscribe10", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        stripeToken: token.id,
        email: token.email
      })
    });

    if (response.ok)
      this.setState({
        complete: true
      });
    console.log("Purchase Complete!");
  }

  async onToken2(token) {
    let response = await fetch("https://botsentiment.herokuapp.com/stripe/subscribe50", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        stripeToken: token.id,
        email: token.email
      })
    });

    if (response.ok) 
      this.setState({
        complete: true
      });
    console.log("Purchase Complete!");
  }

  render() {
    if(!localStorage.getItem('email')){
      this.props.history.push('/home')
    }

    if (this.state.complete) {
      return (
        <>
          <nav>
            <Link to={`/home`}>Home</Link>
            <Route path="/home" render={props => <Home {...props} />} />
          </nav>

          <div className="purchase-complete billing-container">
            <h1>Purchase Complete</h1>
          </div>
        </>
      );
    } else {
      return (
        <>
          <nav>
            <Link to={`/home`}>Home</Link>
            <Route path="/home" render={props => <Home {...props} />} />
          </nav>
          
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
            <br />
            <br />
            <p>Click here for $50 a month subscription</p>
            <StripeCheckout
              token={this.onToken2}
              stripeKey="pk_test_IWDsGyB9paFAzC5KQEtIOfLG"
            />
          </div>
        </>
      );
    }
  }
}

export default Billing;
