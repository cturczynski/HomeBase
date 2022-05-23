import React from "react";
import '../css/App.css';
import '../css/Login.css';
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  }

  const submitLogin = event => {
      event.preventDefault();
    if (username === 'admin' && password === 'admin') {
      navigate('/ownSchedule');
    }
  }

  return (
    <div className="login">
      <header className="login-header">
        <h1>HomeBase</h1>
        <form className="login-form" onSubmit={submitLogin}>
          <div className="input-row">
            <input type="text" name="user" value={username} onChange={handleUsernameChange} />
          </div>
          <div className="input-row">
            <input type="text" name="pass" value={password} onChange={handlePasswordChange} />
          </div>
          <div className="input-btn">
            <input type="submit" value="LOGIN" />
          </div>
        </form>
      </header>
    </div>
  );
}

export default Login;
