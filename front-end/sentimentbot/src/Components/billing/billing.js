import React from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "../stripe/checkoutForm";
import StripeCheckout from "react-stripe-checkout";
import NavBar from "../NavBar/NavBar";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
// import "../App.css";
import "./billing.css"

class Billing extends React.Component {
  constructor() {
    super();
    this.state = { complete: false };

    this.onToken = this.onToken.bind(this);
    this.onToken2 = this.onToken2.bind(this);
  }

  async onToken(token) {
    let response = await fetch(
      "https://botsentiment.herokuapp.com/api/stripe/subscribe10",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          stripeToken: token.id,
          email: token.email
        })
      }
    );

    if (response.ok)
      this.setState({
        complete: true
      });
  }

  async onToken2(token) {
    let response = await fetch(
      "https://botsentiment.herokuapp.com/stripe/subscribe50",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          stripeToken: token.id,
          email: token.email
        })
      }
    );

    if (response.ok)
      this.setState({
        complete: true
      });
    console.log("Purchase Complete!");
  }

  render() {
    if (!localStorage.getItem("email")) {
      this.props.history.push("/home");
    }

    if (this.state.complete) {
      return (
        <>
          <NavBar />

          <div className="purchase-complete billing-container">
            <h1>Purchase Complete</h1>
          </div>
        </>
      );
    } else {
      return (
        <>
          <NavBar />
          <div className="billing-container">
            <h1 className="billing-title"> Billing Page </h1>

            {/* <StripeProvider apiKey="pk_test_IWDsGyB9paFAzC5KQEtIOfLG"> */}
            {/* <div className="stripe-box"> */}
            {/* <h1>React Stripe Elements Example</h1> */}
            {/* <Elements> */}
            {/* <CheckoutForm /> */}
            {/* </Elements> */}
            {/* </div> */}
            {/* </StripeProvider> */}

            <Card className="billing-card">
              <CardBody className="billing-card-body">
                <CardTitle className="billing-card-title">Enhanced</CardTitle>
                <CardSubtitle className="billing-card-subtitle">$10/mo</CardSubtitle>
                <CardText className="billing-card-text">Click here for $10 a month subscription</CardText>
                <StripeCheckout className="stripe-checkout"
                  token={this.onToken}
                  stripeKey="pk_test_IWDsGyB9paFAzC5KQEtIOfLG"
                />
              </CardBody>
            </Card>

            <Card className="billing-card">
              <CardBody className="billing-card-body">
                <CardTitle className="billing-card-title">Professional</CardTitle>
                <CardSubtitle className="billing-card-subtitle">$50/mo</CardSubtitle>
                <CardText className="billing-card-text">Click here for $50 a month subscription</CardText>
                <StripeCheckout className="stripe-checkout"
                  token={this.onToken2}
                  stripeKey="pk_test_IWDsGyB9paFAzC5KQEtIOfLG"
                />
              </CardBody>
            </Card>
          </div>
        </>
      );
    }
  }
}

export default Billing;
