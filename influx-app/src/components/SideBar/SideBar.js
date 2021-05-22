import React from "react";
import "./SideBar.css";
import axios from "axios";

class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      displayData: [],
    };
  }

  checkIfEventExists = (arr, title) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].title === title) {
        return i;
      }
    }
    return -1;
  };

  populateDisplayData = (data) => {
    let temp = [];
    data.forEach((value) => {
      let pos = this.checkIfEventExists(temp, value.title);
      if (pos !== -1) {
        temp[pos].events = [
          ...temp[pos].events,
          {
            id: value.id,
            location: value.locations[0].location_name,
            eventdate: value.eventdate,
            eventtime: value.eventtime,
            channel: value.channelInfo.name,
            status: value.status,
          },
        ];
      } else {
        temp.push({
          title: value.title,
          leagueimageurl: value.leagueimageurl,
          events: [
            {
              id: value.id,
              location: value.locations[0].location_name,
              eventdate: value.eventdate,
              eventtime: value.eventtime,
              channel: value.channelInfo.name,
              status: value.status,
            },
          ],
        });
      }
    });
    console.log(temp);
    this.setState({ displayData: temp });
  };

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
          {this.state.displayData.length !== 0
            ? this.state.displayData.map((item) => (
                <div key={item.title}>
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
                      <span className="title">{item.title}</span>
                      <br />

                      {/* <button className="btn btn-outline-primary rounded-pill">
                        {item.channelInfo.name}
                      </button> */}
                      {item.events.map((event) => (
                        <React.Fragment key={event.id}>
                          {/* {event.id}
                          <br />
                          {event.status}
                          <br />
                          {event.location}
                          <br />
                          {event.eventdate}
                          <br />
                          {event.eventtime}
                          <br />
                          {event.channel}
                          <br />
                          <br /> */}
                          <br/>
                          <input
                            type="checkbox"
                            class="custom-check-box"
                            id={event.id}
                            value={event.id}
                           checked ={event.status === 1? true:false}
                          />
                          <label for={event.id}>
                            &nbsp; &nbsp;{event.location}
                          </label>
                          <br />
                          <br />
                        </React.Fragment>
                      ))}
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
