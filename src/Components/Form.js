import { useRef, useState } from "react";
import styles from "./Form.css";
export default function Form({
  returnObject,
  type,
  userObject = { name: "", email: "", phone: "" },
}) {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const phoneInputRef = useRef();

  const [editEmailData, setEmailData] = useState(userObject["email"]);
  const [editPhoneData, setPhoneData] = useState(userObject["phone"]);

  function submitHandler(event) {
    event.preventDefault();
    // props.setLoginObject({
    //   email: emailInputRef.current.value,
    //   password: passwordInputRef.current.value,
    // });

    if (type == "Login") {
      returnObject({
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      });
    } else if (type == "Register") {
      returnObject({
        name: nameInputRef.current.value,
        email: emailInputRef.current.value,
        phone: phoneInputRef.current.value,
        password: passwordInputRef.current.value,
      });
    } else if (type == "Edit") {
      returnObject({
        // when accessing this api, we need to pass the current email from the local storage
        email: userObject["email"],
        new_email: emailInputRef.current.value,
        phone: phoneInputRef.current.value,
        password: passwordInputRef.current.value,
      });
    }
  }

  let registration_form_body = (
    <>
      <div className="input-field-container">
        <div className="input-field">
          <label>Name</label>
          <input id="name" ref={nameInputRef} type="text" placeholder="name" />
        </div>
        <div className="input-field">
          <label>Email</label>
          <input
            id="email"
            type="email"
            ref={emailInputRef}
            placeholder="name@email.com"
          />
        </div>
        <div className="input-field">
          <label>Phone Number</label>
          <input
            id="phone"
            type="tel"
            ref={phoneInputRef}
            placeholder="1234567890"
          />
        </div>
        <div className="input-field">
          <label>Password</label>
          <input
            id="password"
            type="password"
            placeholder="password"
            ref={passwordInputRef}
          />
        </div>
      </div>
    </>
  );

  let login_form_body = (
    <>
      <div className="input-field-container">
        <div className="input-field">
          <label>
            <span>Email</span>
          </label>
          <input
            id="email"
            type="email"
            ref={emailInputRef}
            placeholder="name@email.com"
          />
        </div>

        <div className="input-field">
          <label>Password</label>
          <input
            id="password"
            type="password"
            placeholder="password"
            ref={passwordInputRef}
          />
        </div>
      </div>
    </>
  );

  let edit_form_body = (
    <>
      <div className="input-field-container">
        <div className="input-field">
          <label>Email</label>
          <input
            id="email"
            type="email"
            ref={emailInputRef}
            onChange={(event) => setEmailData(event.target.value)}
            value={editEmailData}
          />
        </div>
        <div className="input-field">
          <label>Phone Number</label>
          <input
            id="phone"
            type="tel"
            ref={phoneInputRef}
            placeholder={userObject["phone"]}
            onChange={(event) => setPhoneData(event.target.value)}
            value={editPhoneData}
          />
        </div>
        <div className="input-field">
          <label>Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter a new password"
            ref={passwordInputRef}
          />
        </div>
      </div>
    </>
  );

  return (
    <div className="Form-container">
      <h1>Fintoo</h1>
      <h3>Login</h3>
      <form onSubmit={submitHandler} className="form-body">
        {type == "Login" ? login_form_body : null}
        {type == "Register" ? registration_form_body : null}
        {type == "Edit" ? edit_form_body : null}
        <button type="submit">{type}</button>
      </form>
    </div>
  );
}
