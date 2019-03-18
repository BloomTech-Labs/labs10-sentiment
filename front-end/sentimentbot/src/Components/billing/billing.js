import React from "react";
import StripeCheckout from "react-stripe-checkout";
import NavBar from "../NavBar/NavBar";
import "./billing.css";

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
        <div className="page-container">
          <NavBar />
          <div className="content-container">
            <div className="purchase-complete">
              <h1>Purchase Complete</h1>
            </div>
          </div>
          {/* <FooterPage /> */}
        </div>
      );
    } else {
      return (
        <div className="billingpage-container">
          <NavBar />
          <div className="billingcontent-container">
            <h1 className="billing-title">Billing</h1>

            {/* <StripeProvider apiKey="pk_test_IWDsGyB9paFAzC5KQEtIOfLG"> */}
            {/* <div className="stripe-box"> */}
            {/* <h1>React Stripe Elements Example</h1> */}
            {/* <Elements> */}
            {/* <CheckoutForm /> */}
            {/* </Elements> */}
            {/* </div> */}
            {/* </StripeProvider> */}

            <div className="billing-card-container">
              <div className="billing-card-body">
                <h2 className="billing-card-title">Enhanced</h2>
                <h3 className="billing-card-subtitle">$10/mo</h3>
                <p className="billing-card-text">
                  Click here for $10 a month subscription
                </p>
                <ul>
                  <li>50 Users</li>
                  <li>10000 Messages</li>
                  <li>50 Channels</li>
                </ul>
                <StripeCheckout
                  className="stripe-checkout"
                  token={this.onToken}
                  stripeKey="pk_test_IWDsGyB9paFAzC5KQEtIOfLG"
                  image="https://i.gyazo.com/59da540e04d2a13f71991c8b168a4ab5.png"
                  description="$10/mo"
                  name="M.O.O.D."
                />
              </div>

              <div className="billing-card-body">
                <h2 className="billing-card-title">Professional</h2>
                <h3 className="billing-card-subtitle">$50/mo</h3>
                <p className="billing-card-text">
                  Click here for $50 a month subscription
                </p>
                <ul>
                  <li>150 Users</li>
                  <li>Unlimited Messaging</li>
                  <li>Unlimted Channels</li>
                </ul>
                <StripeCheckout
                  className="stripe-checkout"
                  token={this.onToken2}
                  stripeKey="pk_test_IWDsGyB9paFAzC5KQEtIOfLG"
                  image="https://i.gyazo.com/59da540e04d2a13f71991c8b168a4ab5.png"
                  description="$50/mo"
                  name="M.O.O.D."
                />
              </div>
            </div>
          </div>
          {/* <FooterPage /> */}
        </div>
      );
    }
  }
}

export default Billing;




// /* Billing Container */




// /* Billing Card Container */
// .billing-card-container {
//   /* display: flex;
//   width: 80%; */
// }

// @media (max-width:900px) and (min-width:501px) {

//   /* .billing-card-container {
//       width: 70%;
//       /* margin-left: 12rem; 
//   } */
// }

// @media (max-width:500px) {

//   /* .billing-card-container {
//       width: 60%;
//       margin-top: 0;
//       margin-left: 0;
//       margin-right: 0;
//   } */
// }

// /* Billing Title */

// .billing-title {
//   /* font-size: 2rem;
//   border-bottom: 2px solid black;
//   width: 50%;
//   padding: 0.625rem;
//   margin: 0.625rem; */
// }

// @media (max-width:900px) and (min-width:501px){

//   .billing-title {
//       /* width: 60%;
//       margin-left: 20px; */
//   }
// }

// @media (max-width:500px) {

//   .billing-title {
//       /* width: 140%;
//       margin-left: 20px; */
//   }
// }

// /* Billing Card */

// .billing-card {
//   /* width: 100%;
//   border: none;
//   margin: 2rem; */
// }

// /* Billing Card Body */

// .billing-card-body {
//   /* width: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   /* height: 300px; 
//   color: #000;
//   border: 4px solid #f58a91;
//   border-radius: 8px;
//   box-shadow: 10px 10px 5px 0px #7cdbd5; */
// }

// @media (max-width:900px) and (min-width:501px) {

//   .billing-card-body {
//       /* width: 83%; */
//       /* width: 100%; */
//       /* width: 30rem; */
//       /* margin-right: 5rem; */
//   }
// }

// @media (max-width:500px) {

//   .billing-card-body {
//       /* width: 180%; */
//       /* padding-right: 800px; */
//   }
// }

// /* Billing Card Title */

// .billing-card-title {
//   /* font-family: 'Fredoka One', cursive;
//   border-bottom: 1px solid black; */
//   /* width: 28%; */
// }

// .enhanced {
//   /* width: 23%; */
// }

// @media (max-width:500px) {
// /* 
//   .billing-card-title {
//       /* width: 37%; 
//       width: 7rem;
//   }

//   .enhanced {
//       /* width: 29%; 
//       width: 6rem;
//   } */
// }

// /* Billing Card Subtitle */

// /* .billing-card-subtitle {
//   font-weight: bold;
// } */

// /* Billing Card Text */
// /* 
// .billing-card-text {
//   padding-top: 1.6rem;
//   padding-left: 1.8rem;
//   font-size: 1.1rem;
// } */

// /* Stripe checkout */

// /* .stripe-checkout {
//   width: 55%;
//   margin-left: 5rem;
// }   */


