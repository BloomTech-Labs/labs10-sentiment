import React from "react";
import Logout from "../login/logout";
import "./NavBar.css";
import Auth from "../Auth/auth";
import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import history from '../history'
import Eh from '../PNG/nobackgroundEh.png';

const auth = new Auth();

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const backgroundColor = {
      backgroundColor: "#02C8A7"
    };

    const fontColor = {
      color: "white"
    };

    let source = localStorage.getItem('img_url')


    return (
      <>
        {localStorage.getItem('type') === "manager" ? (
          <>
            <div>
              <Navbar expand="md">
                <NavbarBrand href="/home"><img className="navbot" src={Eh} alt="ehbot" /></NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink>
                        <div onClick={() => history.push('/profile')}>Profile</div>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink>
                        <div onClick={() => history.push('/teamlist')}>Teamlist</div>
                      </NavLink>
                    </NavItem>
                    {/* <NavItem>
                      <NavLink>
                        <div onClick={() => history.push('/survey')}>Survey</div>
                      </NavLink>
                    </NavItem> */}
                    <NavItem>
                      <NavLink>
                        <div onClick={() => history.push('/reports')}>Reports</div>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink>
                        <div onClick={() => history.push('/billing')}>Billing</div>
                      </NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle style={fontColor} nav caret>
                        {localStorage.getItem('img_url') ? (<img className="navbar-image" src={source} alt="profile-img" />) : ("Options")}
                      </DropdownToggle>
                      <DropdownMenu right style={backgroundColor}>
                        <DropdownItem onClick={() => history.push('/accountset')}>
                          <NavItem>
                            <NavLink>
                              <div>Account Settings</div>
                            </NavLink>
                          </NavItem>
                        </DropdownItem>
                        <DropdownItem>
                          <NavItem>
                            <NavLink>
                              <Logout auth={auth} />
                            </NavLink>
                          </NavItem>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          </>
        ) : (
            <Navbar expand="md">
              <NavbarBrand href="/home"><img className="navbot" src={Eh} alt="ehbot" /></NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink>
                      <div onClick={() => history.push('/profile')}>Profile</div>
                    </NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle style={fontColor} nav caret>
                      {localStorage.getItem('img_url') ? (<img className="navbar-image" src={source} alt="profile-img" />) : ("Options")}
                    </DropdownToggle>
                    <DropdownMenu right style={backgroundColor}>
                      <DropdownItem onClick={() => history.push('/accountset')}>
                        <NavItem>
                          <NavLink>
                            <div>Account Settings</div>
                          </NavLink>
                        </NavItem>
                      </DropdownItem>
                      <DropdownItem>
                        <NavItem>
                          <NavLink>
                            <Logout auth={auth} />
                          </NavLink>
                        </NavItem>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </Navbar>
          )}
      </>
    );
  }
};

function mapStateToProps(state) {
  return {
    singleTeamMembers: state.teamMembersReducer.singleTeamMembers
  };
}

export default connect(
  mapStateToProps,
  {}
)(NavBar);
