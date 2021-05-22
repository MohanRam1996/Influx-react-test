import React from "react";
import "./SideBar.css";

class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }
  render() {
    return (
      <React.Fragment>
        <div className ="sidebar-width">content</div>
      </React.Fragment>
    );
  }
}

export default Sidebar;
