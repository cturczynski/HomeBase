import React from "react";
import '../css/App.css';
import '../css/OwnSchedule.css';

function OwnSchedule() {


  return (
    <div className="own-schedule">
      <header className="own-schedule-header">
        <h1 className="own-schedule-h1">HomeBase</h1>
      </header>
      <div className="menu-bar">
        <div className="tab-container">
          <div className="tab-divs">
            <button className="tab-btn">Your Schedule</button>
          </div>
          <div className="tab-divs">
            <button className="tab-btn">All Shifts</button>
          </div>
          <div className="tab-divs">
            <button className="tab-btn">Manage Team</button>
          </div>
          <div className="tab-divs">
            <button className="tab-btn">Manage Schedule</button>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default OwnSchedule;