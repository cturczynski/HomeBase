import React from "react";
import '../css/App.css';
import { useNavigate } from "react-router-dom";


function MenuBar(props) {

    const navigate = useNavigate();
    const selectedTab = "tab-divs selected-tab-div";
    const otherTab = "tab-divs";

    return (
        <div className="menu-bar">
        <div className="tab-container">
          <div className={props.current === 0 ? selectedTab : otherTab}>
            <button className="tab-btn" onClick={() => navigate('/ownSchedule')} >Your Schedule</button>
          </div>
          <div className={props.current === 1 ? selectedTab : otherTab}>
            <button className="tab-btn" onClick={() => navigate('/allShifts')} >All Shifts</button>
          </div>
          <div className={props.current === 2 ? selectedTab : otherTab}>
            <button className="tab-btn" onClick={() => navigate('/manageTeam')}>Manage Team</button>
          </div>
          <div className={props.current === 3 ? selectedTab : otherTab}>
            <button className="tab-btn" onClick={() => navigate('/manageSchedule')}>Manage Schedule</button>
          </div>
        </div>
      </div>
    );
}

export default MenuBar;