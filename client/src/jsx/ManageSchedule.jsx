import React from "react";
import '../css/App.css';
import '../css/ManageSchedule.css';
import Header from './Header';
import MenuBar from "./MenuBar";

function ManageSchedule() {

  const user = {adminFlag: true};

  function Day(props) {
    return (
      <div></div>
      );
  }

  function Shift(props) {
    return (
      <div></div>
      );
  }

  return (
    <div className="manage-schedule">
      <Header />
      <MenuBar current={3} />

      
    </div>
  );
}

export default ManageSchedule;