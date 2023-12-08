import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
// import { useForm } from "react-hook-form";

function SignUp() {

  


  // (function () {
  //   'use strict'
  
  //   // Fetch all the forms we want to apply custom Bootstrap validation styles to
  //   var forms = document.querySelectorAll('.needs-validation')
  
  //   // Loop over them and prevent submission
  //   Array.prototype.slice.call(forms)
  //     .forEach(function (form) {
  //       form.addEventListener('submit', function (event) {
  //         if (!form.checkValidity()) {
  //           event.preventDefault()
  //           event.stopPropagation()
  //         }
  
  //         form.classList.add('was-validated')
  //       }, false)
  //     })
  // })()


  // console.log("hello signup");
  // console.log("localstorage-signup-email -> ", localStorage.getItem("userEmail"));
    // console.log("localstorage-signup-image -> ", localStorage.getItem("userImage"));
    // console.log("localstorage-signup-auth -> ", localStorage.getItem("authentication"));
    // console.log("localstorage-signup-session -> ", localStorage.getItem("activeSession"));
  // const {register} = useForm();
  // const form = document.getElementById("reactform");
  // const formData = new FormData(form);

  const navigate = useNavigate();
  const [errs, setErrs] = useState([]);
  const [file, setFile] = useState();
  const [emailId, setEmailId] = useState("");
  const [image, setImage] = useState();
  const [signup, setSignup] = useState({
    Name: "",
    // Photo: {
    //     lastModified: "",
    //     lastModifiedDate: "",
    //     name: "",
    //     size: "",
    //     type: "",
    //     webkitRelativePath: "",
    // },

    // Photo: "",

    Country: "",
    State: "",
    Contact: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });
  const [logflag, setLogflag] = useState(false);
  // const [errorState, setErrorState] = useState([]);
  // const [e1, e2, e3, e4, e5, e6, e7] = errorState;
  // const [errorResponse, setErrorResponse] = useState("");
  // const [errMessage, setErrMessage] = useState("");

  // console.log(login);


  // function valify(str){
  //   errs.forEach((err)=>{
  //     if(err.field === str && err.message === ""){
  //       return true;
  //     }
  //     else if(err.field === str && err.message !== ""){
  //       return false;
  //     }
  //   });
  //   return false;
  // }


  function handleChange(event) {

    event.preventDefault();


  //   $(document).ready(function() {
  //     $('#uploadForm').bootstrapValidator({
  //         feedbackIcons: {
  //             valid: 'glyphicon glyphicon-ok',
  //             invalid: 'glyphicon glyphicon-remove',
  //             validating: 'glyphicon glyphicon-refresh'
  //         },
  //         fields: {
  //             avatar: {
  //                 validators: {
  //                     file: {
  //                         extension: 'jpeg,png',
  //                         type: 'image/jpeg,image/png',
  //                         maxSize: 2048 * 1024,   // 2 MB
  //                         message: 'The selected file is not valid'
  //                     }
  //                 }
  //             }
  //         }
  //     });
  // });

    // console.log("formdata-1 is-> ", formData);

    // console.log("signup 1 -> ", signup);
    // if(file)  console.log("signup file 1 -> ", file);

    

    const name = event.target.name;
    // const value = event.target.value;

    const value = event.target.files !== null ? event.target.files[0] : event.target.value;

    console.log("name-> ", name);
    console.log("value-> ", value);
    console.log("file-> ", file);


    if(event.target.files !== null){
      // console.log("event-target-> ", event.target.files);
      // value = event.target.files;
      setFile(event.target.files[0]);

      // setFile(URL.createObjectURL(event.target.files[0]));

    }


    // console.log("field -> ", name.toLowerCase());
    // setErrorResponse(name.toLowerCase());
    // errorState.forEach((err)=>{
    //   if(err.path === name.toLowerCase()){
    //     setErrMessage(err.msg);
    //   }
    //   // else{
    //   //   setErrMessage("");
    //   // }
    // });

  
      // if(errorState.length !== 0 && errorState[0].path === "name"){
      //   setErrorResponse("name");
      // }else{
      //   setErrorResponse("");
      // }
    
    
    setSignup((prevValue) => {
      // console.log(URL.createObjectURL(event.target.files[0]));
      // if(name === "Photo"){
      //   console.log("file-> ", file);
      //   return {
      //     ...prevValue,
      //     [name]: file,
      //   };
      // }
      return {
        ...prevValue,
        [name]: value,
      };
    });




    const form = document.getElementById("reactform");
      const formData = new FormData(form);


      if(event.target.files !== null){
        formData.append('Photo', event.target.files[0]);
      }else{
        formData.append('Photo', file);
      }
      // console.log("formdata-2 is-> ", formData.get('Photo'));

      // console.log("newfile-> ", newFile);




      fetch("https://keeper-server1.onrender.com/validate", {
        method: "POST",
        // headers: { "Content-Type": "multipart/form-data" },
        body: formData,
      //   body: JSON.stringify({
      //     // name: "hi",
      //     hello: "good",
      //     photo: formData.get('file'),
      //     contact: formData.get('Contact'),
      // }),

        // body: JSON.stringify({
        //   // hi: newFile,
        //   name: signup.Name,
        //   // photo: newFile,
        //   // photo: file,
        //   photo: formData,
        //   // photo: JSON.stringify(file),
        //   country: signup.Country,
        //   state: signup.State,
        //   contact: signup.Contact,
        //   email: signup.Email,
        //   password: signup.Password,
        //   confirmPassword: signup.ConfirmPassword,
        // }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data data data-> ", data);
          if(data.errors){
            console.log("error error-> ", data);
            setErrs(data.errors);
            // console.log(data.errors);
            // alert("enter valid credentials");
            var err_message = "";
            // data.errors.forEach((err)=> err_message += err.path + ": " + err.msg + "\n");
            data.errors.forEach((err)=> err_message += err.field + ": " + err.message + "\n");
            // alert(err_message);
          }
        });





    // fetch("http://localhost:8000/signup", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       name: signup.Name,
    //       country: signup.Country,
    //       state: signup.State,
    //       contact: signup.Contact,
    //       email: signup.Email,
    //       password: signup.Password,
    //       confirmPassword: signup.ConfirmPassword,
    //     }),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       if(!data.success){
    //         // console.log(data.errors);
    //         setErrorState(data.errors);

    //         // alert("enter valid credentials");
    //         var err_message = "";
    //         data.errors.forEach((err)=> {
    //           err_message += err.path + ": " + err.msg + "\n";
    //           if(err.path === errorResponse){
    //             setErrMessage(err.msg);
    //           }
    //         });
    //         // alert(err_message);
    //       }})
  }

  // if(errorState.length !== 0)
  //   console.log(errorState);
  // if(file){
  //   console.log("file-image-> ", typeof(file.name));
  //   console.log("file-image-> ", typeof(file.lastModified));
  //   console.log("file-image-> ", typeof(file.lastModifiedDate));
  //   console.log("file-image-> ", typeof(file.size));
  //   console.log("file-image-> ", typeof(file.webkitRelativePath));
  //   console.log("file-image-> ", typeof(file.type));
  // }

  function handleSubmit(event) {
    
    event.preventDefault();
    // if (signup.Password === signup.ConfirmPassword) {
      console.log("signup 2 -> ", signup);
      console.log("signup file 2 -> ", file);
      console.log("errs-> ", errs);
      // console.log("json string file -> ", JSON.stringify(file));

      // const newFile = {
      //   lastModified: file.lastModified,
      //   lastModifiedDate: file.lastModifiedDate,
      //   name: file.name,
      //   size: file.size,
      //   type: file.type,
      //   webkitRelativePath: file.webkitRelativePath,
      // };

      // const hello = {
      //   first: "sab",
      //   second: "maju",
      //   third: 2,
      // };

      const form = document.getElementById("reactform");
      const formData = new FormData(form);

      formData.append('Photo', file);
      // console.log("formdata-2 is-> ", formData.get('Photo'));

      // console.log("newfile-> ", newFile);

      fetch("https://keeper-server1.onrender.com/signup", {
        method: "POST",
        // headers: { "Content-Type": "multipart/form-data" },
        body: formData,
      //   body: JSON.stringify({
      //     // name: "hi",
      //     hello: "good",
      //     photo: formData.get('file'),
      //     contact: formData.get('Contact'),
      // }),

        // body: JSON.stringify({
        //   // hi: newFile,
        //   name: signup.Name,
        //   // photo: newFile,
        //   // photo: file,
        //   photo: formData,
        //   // photo: JSON.stringify(file),
        //   country: signup.Country,
        //   state: signup.State,
        //   contact: signup.Contact,
        //   email: signup.Email,
        //   password: signup.Password,
        //   confirmPassword: signup.ConfirmPassword,
        // }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data data data-> ", data);
          if(data.errors){
            console.log("error error-> ", data);
            setErrs(data.errors);
            // console.log(data.errors);
            // alert("enter valid credentials");
            var err_message = "";
            // data.errors.forEach((err)=> err_message += err.path + ": " + err.msg + "\n");
            data.errors.forEach((err)=> err_message += err.field + ": " + err.message + "\n");
            alert(err_message);
          }else{
          // console.log(data);
          if (data.flag === "true") {
            console.log("signup signup data-> ", data);
            setLogflag(true);
            setEmailId(data.userEmail);
            setImage(data.userImage);
            // console.log("file-> ", file);
            // localStorage.setItem("userEmail", data.userEmail);
            // localStorage.setItem("userImage", data.userImage);
            // localStorage.setItem("authentication", "true");
            // sessionStorage.setItem("activeSession", "true");
            console.log("signup is successful.............");
            // navigate("/home");

            // localStorage.setItem("userImage", file);

            // localStorage.setItem("userImage", URL.createObjectURL(file));
          }
          else if (data.flag === "false") {
            alert(data.message);
            navigate("/login");
          }
        }
        });

    // } 
    // else {
    //   alert("password & confirm-password fields should match each other");
    // }

    // setSignup({
    //   Name: "",
    //   Photo: "",
    //   Country: "",
    //   State: "",
    //   Contact: "",
    //   Email: "",
    //   Password: "",
    //   ConfirmPassword: "",
    // });
  }

  if (logflag === true) {
    console.log("logflag is true");
    
    localStorage.setItem("authentication", "true");
    localStorage.setItem("userEmail", emailId);
    localStorage.setItem("userImage", image);

    sessionStorage.setItem("activeSession", "true");

    navigate("/home");

    // localStorage.setItem("authentication", "true");
    // navigate("/home");
    // console.log("last call-> ", localStorage.getItem("userEmail"));

  }

  return (
    <>
      <Header />
      <main className="form-signup w-100 m-auto">

        <form action="/signup" method="post" class="needs-validation container" id="reactform" encType="multipart/form-data" novalidate>
          <h1 className="h3 mt-5 mb-3 fw-normal">Please sign up</h1>
          <div className="row g-3">
          <div className="form-floating col-12">
            <input
              type="text"
              onChange={handleChange}
              // className="form-control is-invalid"
              // className={`form-control ${valify("Name")=== true ? "is-valid" : "is-invalid"}`}
              className={`form-control ${errs[0] && (errs[0].message==="" ? "is-valid" : "is-invalid")}`}
              id="floatingInput"
              placeholder="name@example.com"
              name="Name"
              value={signup.Name}
            required minLength="3" />
            <label htmlFor="floatingInput">Name</label>
            <div class="valid-feedback">{errs[0] && errs[0].message==="" && "Valid."}</div>
            <div class="invalid-feedback">{errs[0] && errs[0].message!=="" && errs[0].message}</div>
            {/* <div class="">{errorResponse !== "name" && "valid"}</div>
      <div class="">{errorResponse === "name" && errMessage}</div> */}
      {/* {console.log(errorResponse + "-> " + errMessage)} */}
          </div>
          <div className="form-floating col-12">
            <input
              type="file"
              onChange={handleChange}
              // className="form-control"
              className={`form-control ${errs[1] && (errs[1].message==="" ? "is-valid" : "is-invalid")}`}
              id="floatingInput"
              placeholder="name@example.com"
              // accept=".jpeg"
              accept="image/*" 
              data-bv-file-type="image/jpeg"
              // mimeType="image/jpeg"/
              // name="Photo"
              // value={file}
              // value={signup.Photo}
              // value=""
            required pattern="^\w+\.(gif|png|jpg|jpeg)$" />
            <label htmlFor="floatingInput">Photo</label>
            <div class="valid-feedback">{errs[1] && errs[1].message==="" && "Valid."}</div>
            <div class="invalid-feedback">{errs[1] && errs[1].message!=="" && errs[1].message}</div>
            {/* <div class="valid-feedback">Valid.</div> */}
      {/* <div class="invalid-feedback">Invalid.</div> */}
      {/* {console.log("errs1-photo-> ", errs)} */}
      {/* <div class="invalid-feedback">{errs[1] && errs[1].message}</div> */}
            {/* <div class="">{errorResponse !== "name" && "valid"}</div>
      <div class="">{errorResponse === "name" && errMessage}</div> */}
      {/* {console.log(errorResponse + "-> " + errMessage)} */}
          </div>
          <div className="form-floating col-sm-12 col-lg-6">
            <input
              type="text"
              onChange={handleChange}
              className={`form-control ${errs[2] && (errs[2].message==="" ? "is-valid" : "is-invalid")}`}
              id="floatingInput"
              placeholder="name@example.com"
              name="Country"
              value={signup.Country}
            required minLength="3"/>
            <label htmlFor="floatingInput">Country</label>
            <div class="valid-feedback">{errs[2] && errs[2].message==="" && "Valid."}</div>
            <div class="invalid-feedback">{errs[2] && errs[2].message!=="" && errs[2].message}</div>
            {/* <div class="">{errorResponse !== "country" && "valid"}</div>
      <div class="">{errorResponse === "country" && errMessage}</div> */}
      {/* {console.log(errorResponse + "-> " + errMessage)} */}
          </div>
          <div className="form-floating col-sm-12 col-lg-6">
            <input
              type="text"
              onChange={handleChange}
              className={`form-control ${errs[3] && (errs[3].message==="" ? "is-valid" : "is-invalid")}`}
              id="floatingInput"
              placeholder="name@example.com"
              name="State"
              value={signup.State}
            required minLength="3"/>
            <label htmlFor="floatingInput">State</label>
            <div class="valid-feedback">{errs[3] && errs[3].message==="" && "Valid."}</div>
            <div class="invalid-feedback">{errs[3] && errs[3].message!=="" && errs[3].message}</div>
          </div>
          <div className="form-floating col-sm-12 col-lg-6">
            <input
              type="number"
              onChange={handleChange}
              className={`form-control ${errs[4] && (errs[4].message==="" ? "is-valid" : "is-invalid")}`}
              id="floatingInput"
              placeholder="name@example.com"
              name="Contact"
              value={signup.Contact}
            required min="1000000000" max="9999999999"/>
            <label htmlFor="floatingInput">Contact No.</label>
            <div class="valid-feedback">{errs[4] && errs[4].message==="" && "Valid."}</div>
            <div class="invalid-feedback">{errs[4] && errs[4].message!=="" && errs[4].message}</div>
          </div>

          <div className="form-floating col-sm-12 col-lg-6">
            <input
            // {...register("Email", {
            //   required: true
            // })}
              type="email"
              onChange={handleChange}
              className={`form-control ${errs[5] && (errs[5].message==="" ? "is-valid" : "is-invalid")}`}
              id="floatingInput"
              placeholder="name@example.com"
              name="Email"
              value={signup.Email}
            required pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"/>
            <label htmlFor="floatingInput">Email</label>
            <div class="valid-feedback">{errs[5] && errs[5].message==="" && "Valid."}</div>
            <div class="invalid-feedback">{errs[5] && errs[5].message!=="" && errs[5].message}</div>
          </div>
          <div className="form-floating col-sm-12 col-lg-6">
            <input
              type="password"
              onChange={handleChange}
              className={`form-control ${errs[6] && (errs[6].message==="" ? "is-valid" : "is-invalid")}`}
              id="floatingPassword"
              placeholder="Password"
              name="Password"
              value={signup.Password}
            required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$"/>
            <label htmlFor="floatingPassword">Password</label>
            <div class="valid-feedback">{errs[6] && errs[6].message==="" && "Valid."}</div>
            <div class="invalid-feedback">{errs[6] && errs[6].message!=="" && errs[6].message}</div>
          </div>
          <div className="form-floating col-sm-12 col-lg-6">
            <input
              type="password"
              onChange={handleChange}
              className={`form-control ${errs[7] && (errs[7].message==="" ? "is-valid" : "is-invalid")}`}
              // className={errs[7] && (errs[7].message==="" ? "form-control is-valid" : "form-control is-invalid")}
              id="floatingPassword"
              placeholder="Password"
              name="ConfirmPassword"
              value={signup.ConfirmPassword}
            required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$"/>
            <label htmlFor="floatingPassword">Confirm Password</label>
            <div class="valid-feedback">{errs[7] && errs[7].message==="" && "Valid."}</div>
            <div class="invalid-feedback">{errs[7] && errs[7].message!=="" && errs[7].message}</div>
      {/* <div class="invalid-feedback">Invalid.</div> */}
      {/* <div class="invalid-feedback">{errs[7] && errs[7].message}</div> */}

      {/* {errs[7] && (
        errs[7].message==="" ? 
        <div class="valid-feedback">Valid</div> 
        : 
        <div class="invalid-feedback">{errs[7].message}</div>
        )} */}
          </div>

          <button
            className="btn btn-primary w-100 py-2 col-12"
            type="submit"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default SignUp;
