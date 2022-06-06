import React from "react";
import '../css/App.css';
import '../css/AddEmployeeModal.css';
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";

function AddEmployeeModal(props) {

  const user = {adminFlag: true};


  return (
    <div className="add-employee-modal">
      <div className="employee-form-div">
          <form className="employee-form" onSubmit={() => {}}>
              <label>
                  First Name: 
                  <input type='text' onChange={() => {}} />
              </label><br />
              <label>
                  Last Name: 
                  <input type='text' onChange={() => {}} />
              </label><br />
              <label>
                  Phone: 
                  <input type='text' onChange={() => {}} />
              </label><br />
              <label>
                  Email: 
                  <input type='text' onChange={() => {}} />
              </label><br />
              <RadioGroup value={false} row onChange={() => {}}>
                  <FormControlLabel value={true} control={<Radio />} label="Yes" onChange={}/>
                  <FormControlLabel value={false} control={<Radio />} label="No" />
              </RadioGroup>
              <label>
                  Manager?: 
                  <div className="manager-radio">
                      <label>
                          <input type='radio' value='Yes' />
                          Yes
                      </label>
                  </div>
                  <div className="manager-radio">
                      <label>
                          <input type='radio' value='No' />
                          No
                      </label>
                  </div>
              </label><br />
              <input className="emp-submit-btn" type='submit' value='Add Employee' />
          </form>
      </div>
    </div>
  );
}

export default AddEmployeeModal;