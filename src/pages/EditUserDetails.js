import Form from "../Components/Form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosOtherService } from "../axiosInstance";
import axios from "axios";

const url = "http://127.0.0.1:8000/updateUser/";

export default function EditUserDetails(props) {
  const [editedObject, setEditedObject] = useState({});
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  console.log(editedObject);

  useEffect(() => {
    axiosOtherService
      .post(url, editedObject)
      .then((response) => {
        console.log("RESPONSE data", response.data);
        if (response.data["status_code"] == 200) {
          localStorage.setItem(
            "user_data",
            JSON.stringify(response.data["updated_data"])
          );
          props.setData(editedObject);
          console.log("Edited User!");
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
  }, [editedObject]);

  return (
    <>
      <div className="page-container">
        {showErrorMessage && <span className="error-message">Error: {errorMessage}</span>}
        <Form
          type="Edit"
          userObject={JSON.parse(localStorage.getItem("user_data"))}
          returnObject={setEditedObject}
        />
        <div className="alternate-option">
          <p>Return back to original page</p>
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            Return
          </button>
        </div>
      </div>
    </>
  );
}
