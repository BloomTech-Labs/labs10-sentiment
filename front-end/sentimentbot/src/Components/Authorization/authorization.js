// Check if email matches an existing email
// If they have registered but are not a team, 
// Or if the are on team then it takes them to their profile.
// CDM with axios to db GET as JSON obj

import React from "react";

class Authorization extends React.Component {

  render() {
    if (localStorage.getItem("email")) {
        return (<div><p>Test</p></div>)
    };
  }
}

export default Authorization;
