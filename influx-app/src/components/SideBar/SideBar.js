import React from "react";
import "./SideBar.css";
import axios from "axios";
import moment from "moment-timezone";

class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      displayData: [],
    };
  }

  handleChange = (id) => {
    let data = this.state.data;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        data[i].status = data[i].status === 0 ? 1 : 0;
      }
    }
    this.populateDisplayData(data);
  };

  generateDate = (value) => {
    let date = moment(value, "YYYY-MM-DD HH:mm:ss");
    return (
      date.tz("America/Denver").format("hh:mm A") +
      " MST, " +
      date.format("dddd") +
      ", " +
      date.format("MMM DD")
    );
  };

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
              eventtime: value.eventtime,
              channel: value.channelInfo.name,
              status: value.status,
            },
          ],
        });
      }
    });
    this.setState({ data: data, displayData: temp });
  };

  componentDidMount = () => {
    axios
      .get("./Sample.json")
      .then((result) => {
        this.populateDisplayData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    console.log(
      "***************************************************************"
    );
    this.state.data.forEach((a) => {
      console.log(
        a.title + " " + a.locations[0].location_name + " " + a.status
      );
    });
    return (
      <React.Fragment>
        <div className="sidebar-width">
          <h3>Events</h3>
          <hr />
          {/* Accordian Header Starts Here  */}
          <div className="accordion accordion-flush" id="accordionEvents">
            {this.state.displayData.length !== 0
              ? this.state.displayData.map((item, count) => (
                  <div key={count}>
                    <div className="row">
                      <div className="accordion-item">
                        <div
                          className="accordion-header"
                          id={"heading" + count}
                        >
                          <button
                            className="accordion-button collapsed"
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
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                    <hr />
                    {/* Accordian Header Ends Here */}
                    {/* Accordian Body Starts Here */}
                    <div
                      id={"collapse" + count}
                      className="accordion-collapse collapse"
                      aria-labelledby={"heading" + count}
                      data-bs-parent="#accordionEvents"
                    >
                      <div className="accordion-body">
                        <table class="table table-striped">
                          <tbody>
                            {item.events.map((event) => (
                              <tr key={event.id}>
                                <td scope="row">
                                  <input
                                    type="checkbox"
                                    className="custom-check-box"
                                    id={event.id}
                                    value={event.id}
                                    checked={event.status === 1 ? true : false}
                                    onChange={(e) =>
                                      this.handleChange(event.id)
                                    }
                                  />
                                </td>
                                <td
                                  onClick={(e) => this.handleChange(event.id)}
                                >
                                  <label>&nbsp; &nbsp;{event.location}</label>
                                  <br />
                                  <span
                                    htmlFor={event.id}
                                    className="event-time"
                                  >
                                    {this.generateDate(event.eventtime)}
                                  </span>
                                </td>
                                <td>
                                  <button className="btn btn-outline-primary rounded-pill">
                                    {" "}
                                    {event.channel}{" "}
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {/* Accordian Body Ends Here */}
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
