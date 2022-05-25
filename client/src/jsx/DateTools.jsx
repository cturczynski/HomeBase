import React from "react";
import '../css/App.css';
import '../css/Calendar.css';

function DateTools() {
    return (
      <div className="date-changer-div">
        <div className="date-tools">
          <div className="date-display">
            <h3>start date - end date</h3>
          </div>
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
      </div>
    );
}

export default DateTools;