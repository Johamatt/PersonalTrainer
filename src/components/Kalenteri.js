import React, { Component, useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";


import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);


export default function Demoapp(props) {

  useEffect(() => {
    getTrainings();
  }, [])


  let events = []

  const [trainings, setTrainings] = useState([]);
  const getTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data))
    .catch(err => console.error(err))
  }

class Demoapp extends Component {
  state = {
    events: [
      {
        start: moment().toDate(),
        end: moment()
          .add(1, "days")
          .toDate(),
        title: "Some title"
      }
    ]
  };
  render() {
    return (
      <div className="App">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={events}
          style={{ height: "100vh" }}
        />
      </div>
    );
  }
}
      trainings.map((k) =>
      events.push({start: moment(k.date).toDate(),
                   end: moment(k.date).add('minutes', k.duration).toDate(),
                   title: k.activity + " - " + k.customer.firstname + " " + k.customer.lastname
                  })  
      )
  return (
    <Demoapp></Demoapp>
  );
  }
