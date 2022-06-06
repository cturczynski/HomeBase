import React from "react";
import '../css/App.css';
import '../css/ManageTeam.css';
import AddEmployeeModal from "./AddEmployeeModal";
import Header from './Header';
import MenuBar from "./MenuBar";

function ManageTeam() {

  const user = {adminFlag: true};

  function Employee(props) {
    return (
      <div className="employee-div">
          <div className="employee-content">
              <h3>Employee name</h3>
              <p>Phone: 8888888888</p>
              <p>Email: cturczynski97@gmail.com</p>
          </div>
          <div className="remove-btn-div">
              <button className="remove-btn">Delete</button>
          </div>
      </div>
      );
  }

  return (
    <div className="manage-team">
      <Header />
      <MenuBar current={2} />
      <div className="add-member-div">
          <button className="add-member-btn">Add Employee</button>
      </div>
      <div className="employee-list">
          <Employee /> <Employee /> <Employee /> <Employee /> <Employee /> <Employee /> <Employee />
      </div>
      <AddEmployeeModal />
    </div>
  );
}

export default ManageTeam;