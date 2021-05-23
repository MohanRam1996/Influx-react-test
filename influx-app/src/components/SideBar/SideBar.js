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

  handleChange = (id) => {};

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
          <div className="accordion accordion-flush" id="accordionEvents">
            {this.state.displayData.length !== 0
              ? this.state.displayData.map((item, count) => (
                  <div key={count}>
                    <div className="row row-margin">
                      <div className="accordion-item">
                        <div
                          className="accordion-header"
                          id={"heading" + count}
                        >
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={"#collapse" + count}
                            aria-expanded="false"
                            aria-controls={"collapse" + count}
                          >
                            <div className="col-md-3">
                              <img
                                src={item.leagueimageurl}
                                aria-hidden
                                alt="League Image"
                                className="custom-img"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    "./asserts/placeholder-grey.jpeg";
                                }}
                              />
                            </div>
                            <div className="col-md-7">
                              <span className="title">{item.title}</span>
                              <br />

                              {/* <button className="btn btn-outline-primary rounded-pill">
                        {item.channelInfo.name}
                      </button> */}
                            </div>
                          </button>
                        </div>
                        <div
                          id={"collapse" + count}
                          className="accordion-collapse collapse"
                          aria-labelledby={"heading" + count}
                          data-bs-parent="#accordionEvents"
                        >
                          <div className="accordion-body">
                            {" "}
                            {item.events.map((event) => (
                              <React.Fragment key={event.id}>
                                <br />
                                <input
                                  type="checkbox"
                                  className="custom-check-box"
                                  id={event.id}
                                  value={event.id}
                                  checked={event.status === 1 ? true : false}
                                  onChange={(e) => this.handleChange(event.id)}
                                />
                                <label htmlFor={event.id}>
                                  &nbsp; &nbsp;{event.location}
                                </label>
                                <br />
                                <span className="event-time">
                                  {event.eventdate}
                                  {event.eventtime}
                                </span>
                                <br />
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))
              : null}
          </div>
        </div>
        <button type="button" className="btn-custom">
          CUSTOM EVENT
        </button>
      </React.Fragment>
    );
  }
}

export default Sidebar;
