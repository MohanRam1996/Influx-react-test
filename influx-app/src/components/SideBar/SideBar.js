import React from "react";
import "./SideBar.css";
import axios from "axios";
import moment from "moment-timezone";

class Sidebar extends React.Component {
  constructor() {
    super();
    /*  STATE values stored are : 
      1. 'data' - stores all the values from sample.json
      2. 'displayData' - stores the information needed to be displayed
          format ; 
          [
           {
             title: "",
             leagueimageurl: "",
             events: [
              {
              id: ""
              location: ""
              eventtime: ""
              channel: ""
              status: ""
              },
             ],
           }
          ]
     */
    this.state = {
      data: [],
      displayData: [],
    };
  }

  /* This handle change method is called when checked box is clicked 
  input : id of the object present in Sample.json 

  Note : this function first updates the state in data (Sample.json copy) 
  and then uses it to regenerate displayData */
  handleChange = (id) => {
    let data = this.state.data;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        data[i].status = data[i].status === 0 ? 1 : 0;
      }
    }
    this.populateDisplayData(data);
  };

  /* This function is used to generate the date in the required format
  input : eventtime present in Sample.json */
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

  /* This function is used by populateDisplayData to check if a 
  paticular event is already present in the list 
  input : it takes the array and the display title of the event as input */
  checkIfEventExists = (arr, title) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].title === title) {
        return i;
      }
    }
    return -1;
  };

  /* This method is used to generate the displayData array  
  input : array containg json objects from (Sample.json) */
  populateDisplayData = (data) => {
    let temp = [];
    data.forEach((value) => {
      let pos = this.checkIfEventExists(temp, value.displaytitle);
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
          title: value.displaytitle,
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

  /* This function is used to fetch the data from Sample.json 
  during component mounting phase */
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
    // Extra utility to view the updated state in the console
    console.log("********************************************");
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
                    <div className="row ">
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
                            <div className="col-md-3 ">
                              {/* Displays images from the league image url from Sample.json , if not present displayes placeholder image */}
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
                            {/* Title is displayed here */}
                            <div className="col-md-7 ">
                              <span className="title">{item.title}</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                    <hr />
                    {/* Accordian Header Ends Here */}
                    {/* Accordian Body Starts Here 
                     This displays the checkboxes ,location ,timings and channel info */}
                    <div
                      id={"collapse" + count}
                      className="accordion-collapse collapse"
                      aria-labelledby={"heading" + count}
                      data-bs-parent="#accordionEvents"
                    >
                      <div className="accordion-body">
                        <table className="table table-striped">
                          <tbody>
                            {item.events.map((event) => (
                              <tr key={event.id}>
                                {/* custom check box is displayed here */}
                                <th scope="row">
                                  <label className="main">
                                    <input
                                      type="checkbox"
                                      className="main"
                                      id={event.id}
                                      value={event.id}
                                      checked={
                                        event.status === 1 ? true : false
                                      }
                                      onChange={(e) =>
                                        this.handleChange(event.id)
                                      }
                                    />
                                    <span className="geekmark"></span>
                                  </label>
                                </th>
                                <td
                                  onClick={(e) => this.handleChange(event.id)}
                                >
                                  <div className="location-name">
                                    <b>&nbsp; &nbsp;{event.location}</b>
                                  </div>
                                  {/* Date in required format is displayed here  */}
                                  <span
                                    htmlFor={event.id}
                                    className="event-time"
                                  >
                                    {this.generateDate(event.eventtime)}
                                  </span>
                                </td>
                                <td>
                                  {/* Channel Info Is displayed here */}
                                  <button className="btn btn-outline-primary rounded-pill">
                                    {" "}
                                    {event.channel}{" "}
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <hr />
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
