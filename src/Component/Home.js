import React, { useState, useEffect } from "react";
import Note from "./Note";
// import notes from "../notes";
import CreateArea from "./CreateArea";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Home() {
  console.log("localstorage-home-email -> ", localStorage.getItem("userEmail"));
    console.log("localstorage-home-image -> ", localStorage.getItem("userImage"));
    console.log("localstorage-home-auth -> ", localStorage.getItem("authentication"));
    console.log("sessionstorage-home-session -> ", sessionStorage.getItem("activeSession"));

  const [currUser, setCurrUser] = useState();
  const [notes, setNotes] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
console.log("UseEffect-1");
    // if (localStorage.getItem("userEmail") !== null) {
      // console.log("UseEffect-2");
      fetch("/home",
      {
      //   method: "GET",
        // credentials: "include",
        headers: {
          // Accept: "application/json",
          // "Content-Type": "application/json",
          // "Access-Control-Allow-Credentials": "true",
          Authorization: localStorage.getItem("userEmail"),
        },
      }
      )
        .then((res) => res.json())
        .then((data) => {
          // alert("normal hello");
          console.log("home-data-> ", data);
          // if(data.satisfy === "unauth"){
          setCurrUser(data.user);
          setNotes(data.savedTasks);
          // }else{
          data.user && localStorage.setItem("userEmail", data.user.email);
          data.user && localStorage.setItem("authentication", "true");
          data.user && sessionStorage.setItem("activeSession", "true");
          // navigate("/home");
          // window.location.reload(false);
          // }
        });
    // }
  }, []);

  useEffect(() => {
    console.log("UseEffect-3");
    if (localStorage.getItem("userEmail") === null) {
      console.log("UseEffect-4");
      fetch("/auth/login/success",
      {
        method: "GET",
        "credentials": "include",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "",
          // "Authorization": localStorage.getItem("userEmail")
        },
      }
      )
        .then((res) => {
          if (res.status === 200) return res.json();
          throw new Error("authentication has been failed!");
         })
        .then((data) => {
          // if(!data.user.contact){
          //  const contact = prompt();
          //  data.user.contact = contact;
          // }
          setCurrUser(data.user);
          console.log("google login data-> ", data);
          // localStorage.setItem("googleUser", JSON.stringify(data));
          // console.log("google localstorage-> ", localStorage.getItem("googleUser"));
          data.user && localStorage.setItem("userEmail", data.user.email);
          data.user && localStorage.setItem("authentication", "true");
          data.user && sessionStorage.setItem("activeSession", "true");
          // navigate("/home");
          // window.location.reload(false);
        })
        .catch((err) => {
          console.log("front-auth-login-success-error-> ", err);
        });
    }
  }, []);

function buttonClick(){
    fetch("/auth/login/success2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({message: "google login secret"}),
    })
    .then(res=> res.json())
    .then(data=> console.log("google json data-> ", data));
  }



  console.log("currUser-> ", currUser);
  console.log("localstorage-> ", localStorage.getItem("userEmail"));

  function addNote(obj) {
    console.log("add is called");
    console.log(obj);
    fetch("/home", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: obj.title,
        content: obj.content,
        userEmail: localStorage.getItem("userEmail"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNotes(data.savedTasks);
      });
    navigate("/home");

    // setNotes(prevValue => {
    //     return [...prevValue, obj];
    // });
  }

  function deleteNote(id) {
    console.log(id);
    console.log("delete is called");
    // setNum(id);
    // setDelnote(notes[id]);
    // console.log(delnote);

    // const newNotes = notes.filter((value, index) => {
    //     return id !== index;
    // });
    // setNotes(newNotes);

    fetch("/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        flag: "hello",
        userEmail: localStorage.getItem("userEmail"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNotes(data.savedTasks);
      });
    navigate("/home");
  }

  function editNote(id, obj) {
    console.log(id, obj);
    console.log("edit is called");

    fetch("/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        obj: obj,
        flag: "hello",
        userEmail: localStorage.getItem("userEmail"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNotes(data.savedTasks);
      });
    navigate("/home");
  }

  function fetchButtonClick(){
    fetch("/auth/login/success")
    .then(res=> res.json())
    .then(data=> console.log("fetchButtonClickData-> ", data));
  }

  return (
    <>
      <Header user={currUser} />
      {/* {currUser && !currUser.contact && <CreatePortalModel><h1>hello</h1></CreatePortalModel>} */}
      <main className="flex-shrink-0">
      
        <div className="container">
          {/* {console.log("authentication is: ", localStorage.getItem("authentication"))} */}
          {localStorage.getItem("authentication") ? (
            <div className="my-5">
              <CreateArea addNote={addNote} />
              {notes && notes.map((note, index) => (
                <Note
                  key={index}
                  id={note._id}
                  title={note.taskTitle}
                  content={note.taskContent}
                  deleteNote={deleteNote}
                  editNote={editNote}
                />
              ))}
            </div>
          ) : (
            <div className="px-4 py-5 my-5 text-center">
              <h1 className="display-5 fw-bold text-body-emphasis">
                Welcome to Keeper
              </h1>
              <div className="col-lg-6 mx-auto">
                <p className="lead mb-4">
                  Sign in and getting started with Keeper{window.location.href}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      <button onClick={fetchButtonClick}>FETCH</button> 
      <a href="http://localhost:8000/auth/google/home">GOOGLE</a>
      <Footer />
    </>
  );
}

export default Home;
