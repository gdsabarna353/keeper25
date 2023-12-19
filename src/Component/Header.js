import React, { useContext, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import HighlightIcon from "@mui/icons-material/Highlight";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SaveIcon from '@mui/icons-material/Save';
import CreatePortalModel from "./CreatePortal";
import SettingsIcon from '@mui/icons-material/Settings';
import {theme} from "./App";
import Profile from "./Profile";

const Header = (props) => {

  // console.log("localstorage emailid-> ", localStorage.getItem("userEmail"));
  // console.log("localstorage image-> ", localStorage.getItem("userImage"));

  // const image = localStorage.getItem("userImage");

  // const [file, setFile] = useState();

  const [profileView, setProfileView] = useState(false);

  const handleLogout = () =>{
    window.open("http://localhost:8000/auth/logout", "_self");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userImage");
    localStorage.removeItem("authentication");
    sessionStorage.removeItem("activeSession");
    // console.log("logged out");
  };

  const colorTheme = useContext(theme);
  // console.log(colorTheme);

  const [mode, setMode] = useState("lightmode");

  const [themeColor, setThemeColor] = useState(colorTheme.themeColor);
  const [themeChange, setThemeChange] = useState(false);

  const [textColor, setTextColor] = useState(colorTheme.textColor);
  const [textColorChange, setTextColorChange] = useState(false);

  const [fontSize, setFontSize] = useState(colorTheme.fontSize);
  const [fontSizeChange, setFontSizeChange] = useState(false);

  document.body.className = mode;


  function toggleTheme() {
    if (mode === "lightmode") {
      setMode("darkmode");
    } else {
      setMode("lightmode");
    }
  }

  function handleThemeColorChange(){
    // console.log(document.getElementById("colorpicker").value);
    setThemeColor(document.getElementById("themecolorpicker").value);
    
    // localStorage.setItem("themeColor", document.getElementById("colorpicker").value);
  }

  function handleTextColorChange(){
    // console.log(document.getElementById("colorpicker").value);
    setTextColor(document.getElementById("textcolorpicker").value);
    
    // localStorage.setItem("themeColor", document.getElementById("colorpicker").value);
  }

  function handleFontSizeChange(){
    // console.log(document.getElementById("colorpicker").value);
    setFontSize(document.getElementById("vol").value);
    
    // localStorage.setItem("themeColor", document.getElementById("colorpicker").value);
  }

  // useEffect(()=>{
  //   // localStorage.setItem("themeColor", color);
    
  // }, [color]);

  

  // localStorage.setItem("themeColor", color);
  //document.body.setAttribute("themeColor", color);
  // document.getElementById("navtheme").style.backgroundColor = color;
  // console.log(document.getElementById("navtheme").style);

  function toggleColor(){
    // console.log(color);
  }

  // function handleChange(event){
  //   // console.log(event.target.files);
  //   setFile(URL.createObjectURL(event.target.files[0]));
  // }

  // console.log("IMAGE-FILE-> ", file);

  return (
    <header>
      <nav className="navbar navbar-expand-md fixed-top" style={{backgroundColor: colorTheme.themeColor}}>
        <div className="container-fluid">
          <Link to="/home">
            <h1 style={{color: colorTheme.textColor}}>
              <HighlightIcon />
              Keeper
            </h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto mb-2 mb-md-0 d-flex">
              {/* {console.log("header login: ", localStorage.getItem("authentication"))} */}
              {!localStorage.getItem("authentication") ? (
                <>
                  <Link to="/login">
                    <h4 style={{color: colorTheme.textColor}}>Login</h4>
                  </Link>
                  <Link to="/signup">
                    <h4 style={{color: colorTheme.textColor}}>Sign Up</h4>
                  </Link>
                </>
              ) : (
                <div className="navbar-nav ms-auto mb-2 mb-md-0 d-flex gap-2">
                {/* <input type="file" onChange={handleChange}/> */}
                  <li>
                    <div className="dropdown" data-toggle="tooltip" data-placement="bottom" title="Settings">
                      <Link
                        className="btn dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{color: colorTheme.textColor}}
                        // style={{marginRight: "120px"}}
                      >
                        <SettingsIcon /> Settings{" "}
                      </Link>

                      <ul className="dropdown-menu drop-menu">
                        <li className="cursor-pointer">
                          <span
                            className="dropdown-item"
                            href="#"
                            onClick={() => {
                              toggleTheme();
                            }}
                          >
                            {mode === "lightmode" ? (
                              <>
                                <span className="d-flex gap-3">
                                  <DarkModeIcon /> Dark Mode
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="d-flex gap-3">
                                  <LightModeIcon /> Light Mode
                                </span>
                              </>
                            )}
                          </span>
                        </li>
                        <hr />
                        <li>
                          <span className="dropdown-item" href="#" 
                          onClick={()=>{
                            toggleColor();
                          }}
                          >
                            {/* <label for="colorpicker">Color Picker:</label> */}
                            
                              <span className="d-flex flex-row gap-3">
                              <label for="colorpicker">Theme</label>
                                <input
                                className="cursor-pointer"
                                  type="color"
                                  id="themecolorpicker"
                                  value={themeColor}
                                  onChange={()=>{
                                    setThemeChange(true);
                                    handleThemeColorChange();
                                    localStorage.setItem("themeColor", themeColor);
                                    }} 
                                />
                                {themeChange && <button onClick={()=>{
                                window.location.reload(false);
                              }}><SaveIcon/></button>}
                              </span>
                          </span>
                        </li>
                        <hr />

                        <li>
                          <span className="dropdown-item" href="#">
                          <span className="d-flex flex-row gap-3">
                          <label for="vol">Size</label>
                            <input className="cursor-pointer" type="range" id="vol" name="vol" min="8" max="30" step="2" value={fontSize} 
                            onChange={()=>{
                                    setFontSizeChange(true);
                                    handleFontSizeChange();
                                    localStorage.setItem("fontSize", fontSize);
                                    }} 
                            style={{width: "60px"}}/>
                            <span>{fontSize}px</span>
                            {fontSizeChange && <button onClick={()=>{
                                window.location.reload(false);
                              }}><SaveIcon/></button>}
                            </span>
                          </span>
                        </li>

                        <hr />

                        <li>
                          <span className="dropdown-item" href="#" 
                          onClick={()=>{
                            toggleColor();
                          }}
                          >
                            {/* <label for="colorpicker">Color Picker:</label> */}
                            
                              <span className="d-flex flex-row gap-3">
                              <label for="textcolorpicker">Text Color</label>
                                <input
                                 className="cursor-pointer"
                                  type="color"
                                  id="textcolorpicker"
                                  value={textColor}
                                  onChange={()=>{
                                    setTextColorChange(true);
                                    handleTextColorChange();
                                    localStorage.setItem("textColor", textColor);
                                    }} 
                                />
                                {textColorChange && <button onClick={()=>{
                                window.location.reload(false);
                              }}><SaveIcon/></button>}
                              </span>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </li>

                  {/* <hr/> */}
{/* {console.log("Html image-> ", image)} */}
                             {props.user && console.log("profile-image-src-> ", props.user.photo)}
                  <img
                    // src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    // src={file}
                    src={props.user && props.user.photo}
                    // src={image}
                    alt="profile"
                    referrerPolicy="no-referrer"
                    data-toggle="tooltip" 
                    data-placement="bottom" 
                    title={props.user && props.user.email}
                    style={{
                      width: "60px",
                      height: "50px",
                      borderRadius: "50%",
                      border: `3px solid ${colorTheme.textColor}`,
                      marginLeft: "10%",
                      cursor: "pointer"
                    }}
                  />

                  <div className="dropdown me-5">
                    <Link
                      className="btn dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      data-toggle="tooltip" 
                      data-placement="bottom" 
                      title="More Actions"
                      style={{color: colorTheme.textColor}}
                      // style={{marginRight: "120px"}}
                    ></Link>

                    <ul className="dropdown-menu profile-dropdown-menu drop-menu">
                      <li className="cursor-pointer">
                        <h5 className="dropdown-item" onClick={()=>setProfileView(true)}>
                          My Profile
                        </h5>
                      </li>
                      {profileView ? <CreatePortalModel onClose={()=> setProfileView(false)}><Profile user={props.user && props.user}/></CreatePortalModel> : null}
                      <hr />

                      <li>
                        <Link to="/login" className=" text-decoration-none">
                          <h5
                            className="dropdown-item"
                            onClick={
                              // () => {
                              // localStorage.removeItem("authentication");
                              // sessionStorage.removeItem("activeSession");
                              handleLogout
                            // }
                            }
                          >
                            Logout
                          </h5>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
          <Outlet />
        </div>
      </nav>
    </header>
  );
};

export default Header;
