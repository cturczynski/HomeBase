import React from "react";
import '../css/App.css';
import '../css/AllShifts.css';
import '../css/Calendar.css';
import Header from './Header';
import MenuBar from "./MenuBar";

function AllShifts() {

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

  function Shift(props) {
    
  }

  return (
    <div className="all-shifts">
      <Header />
      <MenuBar current={1} />

      <div className="date-changer">
        <div className="button-container">
          <div className="date-changer-divs">
            <button className="back-arrow date-btn">{String.fromCharCode(60)}</button>
          </div>
          <div className="date-changer-divs">
            <button className="calendar-btn date-btn">Calendar</button>
          </div>
          <div className="date-changer-divs">
            <button className="forward-arrow date-btn">{String.fromCharCode(62)}</button>
          </div>
        </div>
      </div>

      <div className="calendar-div">
        <div className="calendar-grid">
          <Day /> <Day /> <Day /> <Day /> <Day /> <Day /> <Day />

        </div>
      </div>
    </div>
  );
}

export default AllShifts;