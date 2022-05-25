import React from "react";
import '../css/App.css';
import '../css/OwnSchedule.css';
import '../css/Calendar.css';
import Header from './Header';
import MenuBar from "./MenuBar";
import DateTools from './DateTools';

function OwnSchedule() {

  function Day(props) {
    return (
      <div className="day-div">
        <div className="date-row data-text-row">
          <p>num day</p>
        </div>
        <div className="shift-hours-row data-text-row">
          <p>start time - end time</p>
          <p>shift description</p>
        </div>
        <div className="clock-times-row data-text-row">
          <p>In: xx:xx  Out: xx:xx</p>
        </div>
        <div className="tips-row data-text-row">
          <p>Tips made: $175</p>
        </div>
      </div>);
  }

  return (
    <div className="own-schedule">
      <Header />
      <MenuBar current={0} />
      <DateTools />

      <div className="calendar-div">
        <div className="calendar-grid">
          <Day /> <Day /> <Day /> <Day /> <Day /> <Day /> <Day />

        </div>
      </div>
    </div>
  );
}

export default OwnSchedule;