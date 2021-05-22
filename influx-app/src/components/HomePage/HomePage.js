import React from "react";
import "./HomePage.css";
import { Button, Navbar } from "react-bootstrap";
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
            <div class="col-lg-2 offset-10">
                {/* button to open sideBar/Drawer */}
              <Button
                type="button"
                className="custom-btn"
                onClick={this.setVisible}
              >
                + Add Events
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HomePage;
