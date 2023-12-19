import React, { createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import Profile from "./Profile";

export const theme = createContext();
export const user = createContext();

function App() {
  var activeSession = sessionStorage.activeSession;
  console.log("active session-> ", activeSession);
    if (sessionStorage.loggedOutOnAuth) {
        console.log('Logged out due to expiry already');
    }
    else if (!activeSession) {
        sessionStorage.loggedOutOnAuth = true;
        window.open("https://keeper25-backend.vercel.app/auth/logout", "_self");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userImage");
        localStorage.removeItem("authentication");
    }
    console.log("keeper app is running");

  return (
    <user.Provider value={{}}>
    <theme.Provider value={{themeColor: localStorage.getItem("themeColor"), textColor: localStorage.getItem("textColor"), fontSize: localStorage.getItem("fontSize")}}>
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <Routes>
          <Route exact path="home" element={<Home />} />
          <Route index element={<Home />} />
          <Route exact path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route exact path="profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
    </theme.Provider>
    </user.Provider>
  );
}

export default App;
