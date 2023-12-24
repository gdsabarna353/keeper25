import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
// import { user } from "./App";

function Login() {
  // var currUser = useContext(user);
  const navigate = useNavigate();
  const [login, setLogin] = useState({ Email: "", Password: "" });
  const [logflag, setLogflag] = useState(false);
  const [emailId, setEmailId] = useState("");
  const [image, setImage] = useState();
  // console.log(login);
  function handleChange(event) {
    // console.log(event.target);
    const { name, value } = event.target;
    setLogin((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }
  function handleGoogleLogin(){
    // fetch("http://localhost:8000/auth/google")
    // .then(res=> res.json())
    // .then(data=>{
    //   console.log("handleGoogleLoginData-> ", data);
    // });
    // fetch("http://localhost:8000/auth/google/home", {
    //   // mode: "no-cors",
    //   method: "GET",
    //   headers: {"Content-Type": "application/json", 
    //   // "Access-Control-Allow-Origin": "http://localhost:8000/auth/google/home"
    // }
    // }).then((response)=> response.json())
    // .then((data)=>{
    //   console.log(data);
    //   if(data.flag === true){
    //     navigate("/home");
    //   }
    // });

    // window.open("http://localhost:8000/auth/google", "_self");

    // fetch("http://localhost:8000/auth/google/home", {
    //   // mode: "no-cors",
    //   method: "GET",
    //   headers: {"Content-Type": "application/json", 
    //   // "Access-Control-Allow-Origin": "http://localhost:8000/auth/google/home"
    // }
    // }).then((response)=> response.json())
    // .then((data)=>{
    //   console.log("hi");
    //   if(data.flag === true){
    //     // navigate("/home");
    //   }
    // });
    
  }
  function handleSubmit(event) {
    event.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: login.Email, password: login.Password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("login-data-> ", data);
        if (data.flag === "true") {
          // currUser = data.user;
          // localStorage.setItem("currentUser", data.user);
          setLogflag(true);
          setEmailId(data.user.email);
          setImage(data.user.photo);
        }
        else if(data.status === "email-not-registered" || data.status === "password-not-matched"){
          alert(data.message);
        }
      });
    setLogin({
      Email: "",
      Password: "",
    });
  }

  if (logflag === true) {
    console.log("logflag is true");
    
    localStorage.setItem("authentication", "true");
    localStorage.setItem("userEmail", emailId);
    localStorage.setItem("userImage", image);
    sessionStorage.setItem("activeSession", "true");
    navigate("/home");
  }

  // console.log("emailid-> ", emailId);
  // console.log("image-> ", image);

  return (
    <>
      <Header />
      <main className="form-signin w-100 m-auto">
        <form action="/login" method="post">
          <h1 className="h3 mt-5 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating mt-3">
            <input
              type="email"
              onChange={handleChange}
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="Email"
              value={login.Email}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mt-3">
            <input
              type="password"
              onChange={handleChange}
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="Password"
              value={login.Password}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button
            className="btn btn-primary w-100 py-2 mt-3"
            type="submit"
            onClick={handleSubmit}
          >
            Sign in
          </button>
          </form>

          <div class="css-1l8wmix mb-2"><span class="css-14v43as">Or with email and password</span></div>

          <Link 
          className="btn btn-block btn-social btn-google mt-3 bg-danger text-white w-100 py-2" 
          role="button" 
          // onClick={handleGoogleLogin}
          to="https://keeper25-backend.onrender.com/auth/google"
          >
            <i className="fab fa-google"></i>
            Sign In with Google
          </Link>
      </main>
      <Footer />
    </>
  );
}

export default Login;
