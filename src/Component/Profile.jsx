import React, { useContext, useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import { theme } from "./App";

export default function Profile(props) {
  const colorTheme = useContext(theme);

  const [contactEditDisplay, setContactEditDisplay] = useState(false);
  const [countryEditDisplay, setCountryEditDisplay] = useState(false);
  const [stateEditDisplay, setStateEditDisplay] = useState(false);

  const [contactEditing, setContactEditing] = useState(false);
  const [countryEditing, setCountryEditing] = useState(false);
  const [stateEditing, setStateEditing] = useState(false);

  const [contact, setContact] = useState(parseInt(props.user.contact));
  const [country, setCountry] = useState(props.user.country);
  const [state, setState] = useState(props.user.state);
  const Navigate = useNavigate();

  function capitalize(str) {
    console.log(str);
    if(str===""){
      return str;
    }
    str = str[0].toUpperCase() + str.slice(1);
    for (let i = 0; i < str.length; i++) {
      if (str[i] === " ") {
        str =
          str.substring(0, i) +
          " " +
          str[i + 1].toUpperCase() +
          str.slice(i + 2);
      }
    }
    return str;
  }
 
  function handleContactChange(event) {
    console.log("target name-> ", event.target.name);
    console.log("target value-> ", event.target.value);
    setContact(event.target.value);
  }

  function handleStateChange(event) {
    console.log("target name-> ", event.target.name);
    console.log("target value-> ", event.target.value);
    setState(event.target.value);
  }

  function handleCountryChange(event) {
    console.log("target name-> ", event.target.name);
    console.log("target value-> ", event.target.value);
    setCountry(event.target.value);
  }

  function updateContact() {
    console.log("updated contact value-> ", contact);
    fetch("/editProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: props.user.email,
        fieldName: "contact",
        fieldValue: contact,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        props.user.contact = contact;
        Navigate("/home");
      });
  }

  function updateState() {
    console.log("updated state value-> ", state);
    fetch("/editProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: props.user.email,
        fieldName: "state",
        fieldValue: state,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        props.user.state = state;
        Navigate("/home");
      });
  }

  function updateCountry() {
    console.log("updated country value-> ", country);
    fetch("/editProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: props.user.email,
        contact: props.user.contact,
        fieldName: "country",
        fieldValue: country,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        props.user.country = country;
        props.user.contact = data.contactNo;
        Navigate("/home");
      });
  }

  useEffect(() => {
    fetch("/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("userEmail"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("profile-fetch -> ", data);
      });
  }, []);

  return (
    <div class="container px-3 py-2">
      <span
        href="#"
        class="list-group-item list-group-item-action d-flex gap-3 py-2 justify-content-center"
        aria-current="true"
      >
        <h2>Profile Page</h2>
      </span>

      <span
        href="#"
        class="list-group-item list-group-item-action d-flex gap-3 py-2 justify-content-center"
        aria-current="true"
      >
        <img
          src={props.user.photo}
          alt="profile"
          width="80px"
          height="80px"
          class="rounded-circle flex-shrink-0"
        />
      </span>

      <span
        href="#"
        class="list-group-item list-group-item-action d-flex gap-3 py-3 justify-content-center"
        aria-current="true"
      >
        <h5>
          <PersonIcon />
        </h5>
        <h5 class="mb-0 opacity-75">
          {props.user && capitalize(props.user.name)}
        </h5>
      </span>

      <span
        href="#"
        class="list-group-item list-group-item-action d-flex gap-3 py-3 justify-content-center"
        aria-current="true"
      >
        <EmailIcon />
        <h6 class="mb-0 opacity-75">{props.user.email}</h6>
      </span>

      <span
        href="#"
        class="list-group-item list-group-item-action d-flex gap-3 py-3 justify-content-center"
        aria-current="true"
        onMouseEnter={() => {
          setContactEditDisplay(true);
        }}
        onMouseLeave={() => {
          setContactEditDisplay(false);
        }}
      >
        <PhoneIcon />
        {!contactEditing && (
          <h6 class="mb-0 opacity-75">{props.user.contact}</h6>
        )}
        {contactEditing && (
          <form className="was-validated">
            <input
              type="number"
              onChange={handleContactChange}
              className="form-control"
              placeholder="1234567890"
              name="Contact"
              value={contact}
              required
              min="1000000000"
              max="9999999999"
            />
            <div class="valid-feedback">Valid.</div>
            <div class="invalid-feedback">Invalid.</div>
          </form>
        )}
        {!contactEditing && contactEditDisplay && (
          <button
            type="button"
            style={{
              color: colorTheme.textColor,
              backgroundColor: colorTheme.themeColor,
              border: "none",
            }}
            data-toggle="tooltip"
            data-placement="bottom"
            title="Edit"
          >
            <EditIcon
              onClick={() => {
                setContactEditing(true);
              }}
            />
          </button>
        )}
        {contactEditing && (
          <>
            <button
              type="button"
              style={{
                color: colorTheme.textColor,
                backgroundColor: colorTheme.themeColor,
                border: "none",
              }}
              data-toggle="tooltip"
              data-placement="bottom"
              title="Save"
            >
              <SaveIcon
                onClick={() => {
                  updateContact();
                  setContactEditing(false);
                }}
              />
            </button>

            <button
              type="button"
              style={{
                color: colorTheme.textColor,
                backgroundColor: colorTheme.themeColor,
                border: "none",
              }}
              data-toggle="tooltip"
              data-placement="bottom"
              title="Close"
            >
              <ClearIcon
                onClick={() => {
                  setContactEditing(false);
                }}
              />
            </button>
          </>
        )}
      </span>

      <span
        href="#"
        class="list-group-item list-group-item-action d-flex gap-3 py-3 justify-content-center"
        aria-current="true"
      >
        <PlaceIcon />
        <h6 class="mb-0 opacity-75">
          <span
            onMouseEnter={() => {
              setStateEditDisplay(true);
            }}
            onMouseLeave={() => {
              setStateEditDisplay(false);
            }}
          >
            {!stateEditing && (
              <span>{props.user && capitalize(props.user.state)}</span>
            )}
            {stateEditing && (
              <form className="was-validated">
                <input
                  type="text"
                  onChange={handleStateChange}
                  className="form-control"
                  placeholder="state"
                  name="State"
                  value={state}
                  required
                  minLength="3"
                />
                <div class="valid-feedback">Valid.</div>
                <div class="invalid-feedback">Invalid.</div>
              </form>
            )}
            {!stateEditing && stateEditDisplay && (
              <button
              type="button"
            style={{
              color: colorTheme.textColor,
              backgroundColor: colorTheme.themeColor,
              border: "none",
            }}
            data-toggle="tooltip"
            data-placement="bottom"
            title="Edit"
            >
              <EditIcon
                onClick={() => {
                  setStateEditing(true);
                }}
              /></button>
            )}
            {stateEditing && (
              <>
              <button
              type="button"
              style={{
                color: colorTheme.textColor,
                backgroundColor: colorTheme.themeColor,
                border: "none",
              }}
              data-toggle="tooltip"
              data-placement="bottom"
              title="Save"
              >
                <SaveIcon
                  onClick={() => {
                    updateState();
                    setStateEditing(false);
                  }}
                /></button>
                <button
                type="button"
              style={{
                color: colorTheme.textColor,
                backgroundColor: colorTheme.themeColor,
                border: "none",
              }}
              data-toggle="tooltip"
              data-placement="bottom"
              title="Close"
              >
                <ClearIcon
                  onClick={() => {
                    setStateEditing(false);
                  }}
                /></button>
              </>
            )}
          </span>
          ,
          <span
            className="ms-2"
            onMouseEnter={() => {
              setCountryEditDisplay(true);
            }}
            onMouseLeave={() => {
              setCountryEditDisplay(false);
            }}
          >
            {!countryEditing && (
              <span>{props.user && capitalize(props.user.country)}</span>
            )}
            {countryEditing && (
              <form className="was-validated">
                <input
                  type="text"
                  onChange={handleCountryChange}
                  className="form-control"
                  placeholder="country"
                  name="Country"
                  value={country}
                  required
                  minLength="3"
                />
                <div class="valid-feedback">Valid.</div>
                <div class="invalid-feedback">Invalid.</div>
              </form>
            )}
            {!countryEditing && countryEditDisplay && (
              <button
              type="button"
              style={{
                color: colorTheme.textColor,
                backgroundColor: colorTheme.themeColor,
                border: "none",
              }}
              data-toggle="tooltip"
              data-placement="bottom"
              title="Edit"
              >
              <EditIcon
                onClick={() => {
                  setCountryEditing(true);
                }}
              /></button>
            )}
            {countryEditing && (
              <><button
              type="button"
              style={{
                color: colorTheme.textColor,
                backgroundColor: colorTheme.themeColor,
                border: "none",
              }}
              data-toggle="tooltip"
              data-placement="bottom"
              title="Save"
              >
                <SaveIcon
                  onClick={() => {
                    updateCountry();
                    setCountryEditing(false);
                  }}
                /></button>
                <button
                type="button"
              style={{
                color: colorTheme.textColor,
                backgroundColor: colorTheme.themeColor,
                border: "none",
              }}
              data-toggle="tooltip"
              data-placement="bottom"
              title="Close"
              >
                <ClearIcon
                  onClick={() => {
                    setCountryEditing(false);
                  }}
                /></button>
              </>
            )}
          </span>
        </h6>
      </span>
    </div>
  );
}
