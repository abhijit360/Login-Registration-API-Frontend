import Form from "../Components/Form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosLoginRegistrationInstance } from "../axiosInstance";
import axios from "axios";

const url = "http://127.0.0.1:8000/createUser/";

export default function Register(props) {
  const [registerObject, setRegisterObject] = useState({});
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axiosLoginRegistrationInstance
      .post(url, registerObject)
      .then((response) => {
        console.log("Headers-->", response.headers);
        console.log("Running 0")
        console.log("RESPONSE DATA -------->",response.data)
        if (response.data["status_code"] == 200) {
          console.log("Running 1")
          localStorage.setItem(
            "user_data",
            JSON.stringify(response.data["user_data"])
          );
          console.log("Running 2")
          props.setData(registerObject);
          console.log("Running 3")
          console.log("Registered User!");
          console.log("navigating)")
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
  }, [registerObject]);

  console.log(registerObject);
  return (
    <>
      <div className="page-container">
        {showErrorMessage && <span className="error-message">Error: {errorMessage}</span>}
        <Form type="Register" returnObject={setRegisterObject} />
        <br />
        <div className="alternate-option">
          <p>Login instead</p>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}
