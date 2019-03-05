import React from "react";
import { NavLink as Navlink } from "react-router-dom";
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

    return (
      <>
        {this.props.singleTeamMembers[0].type === "manager" ? (
          <>
            <div>
              <Navbar expand="md">
                <NavbarBrand href="/home">MOOD</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink>
                        <Navlink to="/profile">Profile</Navlink>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink>
                        <Navlink to="/teamlist">Team List</Navlink>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink>
                        <Navlink to="/survey">Survey</Navlink>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink>
                        <Navlink to="/reports">Reports</Navlink>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink>
                        <Navlink to="/billing">Billing</Navlink>
                      </NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle style={fontColor} nav caret>
                        Options
                      </DropdownToggle>
                      <DropdownMenu right style={backgroundColor}>
                        <DropdownItem>
                          <NavItem>
                            <NavLink>
                              <Navlink to="/accountset">
                                Account Settings
                              </Navlink>
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
        <NavbarBrand href="/home">MOOD</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle style={fontColor} nav caret>
              Options
            </DropdownToggle>
            <DropdownMenu right style={backgroundColor}>
              <DropdownItem>
                <NavItem>
                  <NavLink>
                    <Navlink to="/accountset">Account Settings</Navlink>
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
  );
</>
}};

function mapStateToProps(state) {
  return {
    singleTeamMembers: state.teamMembersReducer.singleTeamMembers
  };
}

export default connect(
  mapStateToProps,
  {}
)(NavBar);
