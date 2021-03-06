import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import { getUserByName, getUserPermissions } from "./utils/users";
import {
  setValidLogin,
  setUserData,
  setUserPermissions,
} from "./redux/actions";
import "./style.css";

function Login() {
  const [username, setUsername] = useState("Admin");
  const [password, setPassword] = useState("fullstack");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeData = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!(username && password)) {
      alert("User Name and Password are required");
      return;
    }

    const { data: user } = await getUserByName(username);
    if (user === null) {
      alert("User name does not exist");
      return;
    }

    if (user.password !== password) {
      alert("Wrong password");
      return;
    }

    const { _id: userId, firstName, lastName } = user;

    const { data: permissions } = await getUserPermissions(userId);

    dispatch(setValidLogin(true));
    dispatch(setUserData(userId, username, firstName, lastName));
    dispatch(setUserPermissions(permissions));

    // Successful login, redirect to Main page
    navigate("./main");
  };

  return (
    <div
      style={{
        height: "calc(100vh - 144px)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ marginTop: "15vh" }}>
        <Typography variant="h5" fontWeight={"bold"} fontSize={"1.3rem"}>
          Log in
        </Typography>
        <form onSubmit={handleSubmit} className="Login-Form">
          <strong>User Name </strong>
          <input
            type="text"
            name="username"
            onChange={changeData}
            value={username}
          />
          <strong>Password </strong>
          <input
            type="password"
            name="password"
            onChange={changeData}
            value={password}
          />
          <div style={{ gridColumn: "span 2" }}>
            <button type="submit" className="Login-Button">
              Log in
            </button>
          </div>
        </form>
        <Typography variant="h5" fontWeight={"bold"} fontSize={"1.1rem"}>
          New User ? : <Link to="/createAccount">Create Account</Link>
        </Typography>
      </div>
    </div>
  );
}

export default Login;
