import Form from "../Components/Form";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { axiosLoginRegistrationInstance } from "../axiosInstance";
import "./Page.css";
const loginURL = "http://127.0.0.1:8000/loginUser/";

export default function IndexPage(props) {
  const [loginObject, setLoginObject] = useState({});
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  console.log(loginObject);

  // useEffect(() => {
  //   axios
  //     .post(loginURL, loginObject)
  //     .then((response) => {
  //       console.log(response.data);
  //       console.log("headers",response.headers)
  //       if (response.data["status_code"] == 200) {
  //         localStorage.setItem(
  //           "user_data",
  //           JSON.stringify(response.data["user_data"])
  //         );
  //         localStorage.setItem("LoggedIn", 1);
  //         setShowErrorMessage(false);
  //         props.setData(loginObject);
  //         console.log("Logged in!");
  //         navigate("/HomePage/");
  //       } else {
  //         setErrorMessage(response.data["message"]);
  //         setShowErrorMessage(true);
  //         console.log("ERROR!");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [loginObject]);

  useEffect(() => {
    axiosLoginRegistrationInstance
      .post(loginURL, loginObject)
      .then((response) => {
        console.log("RESPONSE DATAAAAAA----->", response.data)
        if (response.data["status_code"] == 200) {
          localStorage.setItem(
            "user_data",
            JSON.stringify(response.data["user_data"])
          );
          localStorage.setItem("LoggedIn", 1);
          setShowErrorMessage(false);
          props.setData(loginObject);
          console.log("Logged in!");
          navigate("/HomePage/");
        } else {
          setErrorMessage(response.data["error"]);
          setShowErrorMessage(true);
          console.log("ERROR!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loginObject]);

  return (
    <>
      <div className="page-container">
        {showErrorMessage && <span className="error-message">Error: {errorMessage}</span>}
        <Form type="Login" returnObject={setLoginObject} />

        <div className="alternate-option">
          <p>Register!</p>
          <button
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
}
