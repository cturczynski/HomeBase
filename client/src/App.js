import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import Login from "./jsx/Login"
import OwnSchedule from "./jsx/OwnSchedule";

function App() {

  const user = false;

  return (
    <div className="App" >
      <Routes>
        <Route path="/" element={user ? <OwnSchedule /> : <Login />} />
        <Route path="/ownSchedule" element={<OwnSchedule />} />
      </Routes>
    </div>
  );
}

export default App;
