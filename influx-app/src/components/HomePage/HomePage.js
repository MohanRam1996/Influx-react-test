import React from "react";
import "./HomePage.css";
import { Navbar } from "react-bootstrap";
import SideBar from "../SideBar/SideBar.js";
import Drawer from "@material-ui/core/Drawer";

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      sideBar: false,
    };
  }
  // function to toggle side bar visibility
  setVisible = () => {
    this.setState({ sideBar: !this.state.sideBar });
  };

  render() {
    return (
      <React.Fragment>
          {/* A Simple NavBar */}
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Influx</Navbar.Brand>
        </Navbar>
        <br />
        {/* Drawer from Material Ui that opens on click of Add Events Button */}
        <Drawer
          anchor="right"
          open={this.state.sideBar}
          onClose={this.setVisible}
        >
            {/* SideBar contents populated via separate component */}
          <SideBar />
        </Drawer>
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-2 offset-lg-10">
                {/* button to open sideBar/Drawer */}
              <button
                type="button"
                className ="btn btn-default"
                onClick={this.setVisible}
              >
                + Add Events
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HomePage;
