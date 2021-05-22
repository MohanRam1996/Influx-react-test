import React from "react";
import "./SideBar.css";
import axios from "axios";

class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      displayData :[]
    };
  }

  populateDisplayData =(data) =>{

  }

  componentDidMount = () => {
    axios
      .get("./Sample.json")
      .then((result) => {
        this.populateDisplayData(result.data);
        this.setState({ data: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="sidebar-width">
          <h3>Events</h3>
          <hr />
          {this.state.data.length !== 0
            ? this.state.data.map((item) => (
                <div key={item.id}>
                  <div className="row row-margin">
                    <div className="col-md-3 offset-md-1">
                      <img
                        src={item.leagueimageurl}
                        aria-hidden
                        alt="League Image"
                        className="custom-img"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "./asserts/placeholder-grey.jpeg";
                        }}
                      />
                    </div>
                    <div className="col-md-7">
                      <span className="title">{item.displaytitle}</span>
                      <br />
                      <button className="btn btn-outline-primary rounded-pill">
                        {item.channelInfo.name}
                      </button>
                    </div>
                  </div>
                  <hr />
                </div>
              ))
            : null}
        </div>
        <button type="button" className="btn-custom">
          CUSTOM EVENT
        </button>
      </React.Fragment>
    );
  }
}

export default Sidebar;
