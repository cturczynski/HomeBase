import React from "react";
import { Routes, Route } from "react-router-dom";
import './css/App.css';
import Login from "./jsx/Login"
import OwnSchedule from "./jsx/OwnSchedule";
import AllShifts from "./jsx/AllShifts";
import ManageTeam from "./jsx/ManageTeam";
import ManageSchedule from "./jsx/ManageSchedule";

function App() {

  const user = false;

  return (
    <div className="App" >
      <Routes>
        <Route path="/" element={user ? <OwnSchedule /> : <Login />} />
        <Route path="/ownSchedule" element={<OwnSchedule />} />
        <Route path="/allShifts" element={<AllShifts />} />
        <Route path="/manageTeam" element={<ManageTeam />} />
        <Route path="/manageSchedule" element={<ManageSchedule />} />
      </Routes>
    </div>
  );
}

export default App;
