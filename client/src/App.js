import React from "react";
import { Routes, Route } from "react-router-dom";
import './css/App.css';
import Login from "./jsx/Login"
import OwnSchedule from "./jsx/OwnSchedule";
import AllShifts from "./jsx/AllShifts";

function App() {

  const user = false;

  return (
    <div className="App" >
      <Routes>
        <Route path="/" element={user ? <OwnSchedule /> : <Login />} />
        <Route path="/ownSchedule" element={<OwnSchedule />} />
        <Route path="/allShifts" element={<AllShifts />} />
      </Routes>
    </div>
  );
}

export default App;
