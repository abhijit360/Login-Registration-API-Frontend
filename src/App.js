import "./App.css";

import React from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import Register from "./pages/Register";
import UserHomePage from "./pages/UserHomePage";
import EditUserDetails from "./pages/EditUserDetails";

function App() {
  const [data, setData] = useState({});
  // console.log("props -> ", data);

  return (
    <>
      <Routes>
        <Route path="/" element={<IndexPage setData={setData} />} />
        <Route path="/register" element={<Register setData={setData} />} />
        <Route path="/HomePage" element={<UserHomePage data={data} />} />
        <Route
          path="/editProfile"
          element={<EditUserDetails setData={setData} />}
        />
      </Routes>
    </>
  );
}

export default App;
