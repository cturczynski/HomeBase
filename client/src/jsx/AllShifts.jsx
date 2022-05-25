import React from "react";
import '../css/App.css';
import '../css/AllShifts.css';
import '../css/Calendar.css';
import Header from './Header';
import MenuBar from "./MenuBar";
import DateTools from "./DateTools";

function AllShifts() {

  const user = {adminFlag: true};

  function Day(props) {
    return (
      <div className="day-div">
        <div className="date-row data-text-row">
          <p>num day</p>
        </div>
        <div className="shift-table">
          <Shift /> <Shift /> <Shift /> <Shift /> <Shift />
        </div>
      </div>
      );
  }

  function Shift(props) {
    return (
      <div className="shift-div">
        <h4 className="emp-name">employee name</h4>
        <p className="shift-times">start time - end time</p>
        <p className="shift-desc">shift description</p>
      </div>
      );
  }

  return (
    <div className="all-shifts">
      <Header />
      <MenuBar current={1} />
      <DateTools />

      <div className="edit-btn-div" style={user.adminFlag ? {} : {display: "none"}}>
        <button className="edit-btn">Edit Schedule</button>
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