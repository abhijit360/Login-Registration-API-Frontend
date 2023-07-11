import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MainPage.css";
import "./Page.css";
export default function UserHomePage(props) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function logOutHandler() {
    localStorage.clear();
    navigate("/");
  }

  function editUserHandler() {
    navigate("/editProfile");
  }

  useEffect(() => {
    let user_data = JSON.parse(localStorage.getItem("user_data"));
    console.log(user_data);
    setName(user_data["name"]);
    setEmail(user_data["email"]);
    setPhone(user_data["phone"]);
  }, [props.data]);

  return (
    <>
      <div className="page-container">
        <div className="main-page-container">
          <h1 id="welcome-header"> Welcome {name}! </h1>

          <div className="user-details">
            <p id="data-header">User Details:</p>
            <p id="user-data">Name: {name}</p>
            <p id="user-data">Email: {email}</p>
            <p id="user-data">Phone number: {phone}</p>
            <button onClick={editUserHandler}>Edit</button>
          </div>
          <button onClick={logOutHandler}>Log Out</button>
        </div>
      </div>
    </>
  );
}
