require("dotenv").config();
const express = require("express");
const fs = require("fs");
var path = require("path");
const cookieSession = require("cookie-session");
var passport = require("passport");
const cors = require("cors");
const cloudinary = require("cloudinary").v2; 
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const findOrCreate = require("mongoose-findorcreate");
const { body, validationResult } = require("express-validator");

var GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();
const port = process.env.PORT || 8000;

const buildPath = path.join(__dirname, 'build');

app.use(express.json());
app.use(bodyParser.json());
// app.use(express.static("public"));
// app.use(express.static(buildPath));
app.use(express.static('build'));

app.use(
  cookieSession({
    name: "session",
    keys: ["openreplay"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "https://keeper22-frontend.vercel.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

mongoose.connect(
  "mongodb+srv://sabgd:abcd1234@cluster0.zgfpmyx.mongodb.net/keeperDB?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, results) {
    if (err) {
      console.log("the error is:-> ", err);
    } else {
      console.log("database is connected !!");
    }
  }
);

if (!fs.existsSync("./uploads")) { 
	fs.mkdirSync("./uploads"); 
} 

var multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({ storage: storage });

app.use(express.static(__dirname + "/public")); 
app.use("/uploads", express.static("uploads")); 

cloudinary.config({ 
	cloud_name: "djhqfh2ii", 
	api_key: "717459284765377", 
	api_secret: "NPX4RlYaad1C6N0m_k4RMkVdODE", 
}); 

const keeperSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  photo: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
  },

});

const taskSchema = mongoose.Schema({
  email: String,
  taskTitle: String,
  taskContent: String,
});
keeperSchema.plugin(findOrCreate);
const User = mongoose.model("User", keeperSchema);
const Task = mongoose.model("Task", taskSchema);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/home",
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

function validateErrors(obj, pic) {
  var errors = [];
  console.log("validate-request-errors", obj);
  const { Name, Country, State, Contact, Email, Password, ConfirmPassword } =
    obj;
  const Photo = pic;
  var i = 0;

  if (Name.length === 0) {
    errors[i] = {
      field: "Name",
      message: "Name field shouldn't be empty",
    };
    i++;
  } else if (Name.length < 3) {
    errors[i] = {
      field: "Name",
      message: "length of Name field should be minimum 3",
    };
    i++;
  } else {
    errors[i] = {
      field: "Name",
      message: "",
    };
    i++;
  }

  if (!Photo) {
    errors[i] = {
      field: "Photo",
      message: "Photo field shouldn't be empty",
    };
    i++;
  }
  else if (!Photo.mimetype.startsWith("image/")) {
    errors[i] = {
      field: "Photo",
      message: "Photo field should be an image file",
    };
    i++;
  } else {
    errors[i] = {
      field: "Photo",
      message: "",
    };
    i++;
  }

  if (Country.length === 0) {
    errors[i] = {
      field: "Country",
      message: "Country field shouldn't be empty",
    };
    i++;
  } else if (Country.length < 3) {
    errors[i] = {
      field: "Country",
      message: "length of Country field should be minimum 3",
    };
    i++;
  } else {
    errors[i] = {
      field: "Country",
      message: "",
    };
    i++;
  }

  if (State.length === 0) {
    errors[i] = {
      field: "State",
      message: "State field shouldn't be empty",
    };
    i++;
  } else if (State.length < 3) {
    errors[i] = {
      field: "State",
      message: "length of State field should be minimum 3",
    };
    i++;
  } else {
    errors[i] = {
      field: "State",
      message: "",
    };
    i++;
  }

  if (Contact.length === 0) {
    errors[i] = {
      field: "Contact",
      message: "Contact field shouldn't be empty",
    };
    i++;
  } else if (parseInt(Contact) < 1000000000 || parseInt(Contact) > 9999999999) {
    errors[i] = {
      field: "Contact",
      message: "Contact field should be a 10-digit number",
    };
    i++;
  } else {
    errors[i] = {
      field: "Contact",
      message: "",
    };
    i++;
  }

  var validEmailRegex = "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$";

  if (Email.length === 0) {
    errors[i] = {
      field: "Email",
      message: "Email field shouldn't be empty",
    };
    i++;
  } else if (!Email.match(validEmailRegex)) {
    errors[i] = {
      field: "Email",
      message: "Email field should be an email",
    };
    i++;
  } else {
    errors[i] = {
      field: "Email",
      message: "",
    };
    i++;
  }

  validPasswordRegex =
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$@!%&*?]).{8,30}$";

  if (Password.length === 0) {
    errors[i] = {
      field: "Password",
      message: "Password field shouldn't be empty",
    };
    i++;
  } else if (Password.length < 8) {
    errors[i] = {
      field: "Password",
      message: "length of Password field should be minimum 8",
    };
    i++;
  } else if (!Password.match(validPasswordRegex)) {
    errors[i] = {
      field: "Password",
      message: "Password field should be a strong password",
    };
    i++;
  } else {
    errors[i] = {
      field: "Password",
      message: "",
    };
    i++;
  }

  if (ConfirmPassword.length === 0) {
    errors[i] = {
      field: "ConfirmPassword",
      message: "ConfirmPassword field shouldn't be empty",
    };
    i++;
  } else if (ConfirmPassword.length < 8) {
    errors[i] = {
      field: "ConfirmPassword",
      message: "length of ConfirmPassword field should be minimum 8",
    };
    i++;
  } else if (!ConfirmPassword.match(validPasswordRegex)) {
    errors[i] = {
      field: "ConfirmPassword",
      message: "Confirm Password field should be a strong password",
    };
    i++;
  } else if (Password !== ConfirmPassword) {
    errors[i] = {
      field: "ConfirmPassword",
      message:
        "Password & Confirm Password both fields should match each other",
    };
    i++;
  } else {
    errors[i] = {
      field: "ConfirmPassword",
      message: "",
    };
    i++;
  }

  return errors;
}

app.post(
  "/validate",
  upload.single("Photo"),

  async (req, res) => {
    console.log("req.body is -> ", req.body);
    console.log("req.file is -> ", req.file);

    // console.log("req-> ", req);

    var errors2 = validateErrors(req.body, req.file);
    console.log("validation-errors2-> ", errors2);

    return res.status(400).json({ errors: errors2 });

  }
);


// gets the static files from the build folder
// app.get('/', (req, res) => {
//   res.sendFile(path.join(buildPath, 'index.html'));
// });

app.get('/', (req, res)=>{
	res.send("The Server of Keeper is Running...");
});


app.get("/home", (req, res) => {

  var email = "";
  if (req.user) {
    console.log("req.user is present..");
    email = req.user._json.email;
  } else {
    console.log("req.user is not present..");
    email = req.headers.authorization;
  }
  var tasks = [];
  User.findOne({ email: email }, function (err, userResults) {
    if (err) {
      console.log(err);
    } else {
      Task.find({ email: email }, function (err, taskResults) {
        if (err) {
          console.log(err);
        } else {
          tasks = taskResults;
          res.json({
            email: email,
            user: userResults,
            status: "success",
            message: "the task are saved and displayed successfully...",
            taskdisplayflag: true,
            savedTasks: tasks,
          });
        }
      });
    }
  });
});

app.get("/profile", (req, res) => {
  console.log("authorization email -> ", req.headers.authorization);
  User.findOne({ email: req.headers.authorization }, (err, results) => {
    if (err) {
      console.log(err);
    } else if (results) {
      console.log("profile-results -> ", results);
      res.json({
        status: "success",
        user: results,
      });
    }
  });
});

app.post("/editProfile", async (req, res) => {
  console.log(req.body);
  if (req.body.fieldName === "contact") {
    await User.findOneAndUpdate(
      { email: req.body.email },
      { contact: req.body.fieldValue },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log(`contact is edited...`);
          res.json({
            status: "success",
            updated: `${req.body.email} -> ${req.body.fieldName} -> ${req.body.fieldValue}`,
          });
        }
      }
    );
  } else if (req.body.fieldName === "state") {
    await User.findOneAndUpdate(
      { email: req.body.email },
      { state: req.body.fieldValue },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log(`state is edited...`);
          res.json({
            status: "success",
            updated: `${req.body.email} -> ${req.body.fieldName} -> ${req.body.fieldValue}`,
          });
        }
      }
    );
  } else if (req.body.fieldName === "country") {
    const countryName = req.body.fieldValue;
    var countryCode = "";
    await fetch(
      `https://restcountries.com/v3.1/name/${countryName}?fullText=true&fields=name,idd`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("api data-> ", data);
        if (data.status != 404) {
          countryCode += data[0].idd.root + data[0].idd.suffixes[0];
          console.log("cc3-> ", countryCode);
          if (req.body.contact.length === 10) {
            req.body.contact = countryCode + " " + req.body.contact;
          } else {
            req.body.contact =
              countryCode + " " + req.body.contact.substring(3, 14);
          }
          console.log("req-contact-3-> ", req.body.contact);
        }
      });

    await User.findOneAndUpdate(
      { email: req.body.email },
      { country: req.body.fieldValue, contact: req.body.contact },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log(`country is edited...`);
          res.json({
            status: "success",
            updated: `${req.body.email} -> ${req.body.fieldName} -> ${req.body.fieldValue} -> ${req.body.contact}`,
            contactNo: req.body.contact,
          });
        }
      }
    );
  }
});

app.post("/home", async (req, res) => {
  const newTask = new Task({
    email: req.body.userEmail,
    taskTitle: req.body.title,
    taskContent: req.body.content,
  });
  await newTask.save();

  await Task.find({ email: req.body.userEmail }, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      res.json({
        status: "success",
        message: "the task is saved in the database successfully...",
        taskflag: true,
        savedTasks: results,
      });
    }
  });
});

app.post("/delete", async (req, res) => {
  console.log(req.body);
  await Task.deleteOne({ _id: req.body.id }, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(`item with id ${req.body.id} is deleted...`);
    }
  });
  await Task.find({ email: req.body.userEmail }, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      res.json({
        status: "delete item is found",
        deletedId: req.body.id,
        deleteflag: "hi",
        savedTasks: results,
      });
    }
  });
});

app.post("/edit", async (req, res) => {
  console.log(req.body);
  await Task.findByIdAndUpdate(
    { _id: req.body.id },
    { taskTitle: req.body.obj.title, taskContent: req.body.obj.content },
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log(`item with id ${req.body.id} is edited...`);
      }
    }
  );
  await Task.find({ email: req.body.userEmail }, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      res.json({
        status: "delete item is found",
        editedId: req.body.id,
        editflag: "hi",
        savedTasks: results,
      });
    }
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (!result) {
      console.log("email id is not registered!! please sign up....");
      res.json({
        status: "email-not-registered",
        flag: "false",
        message:
          "Email id is not registered. Please sign up... or sign in with google",
        email: email,
      });
    } else {
      bcrypt.compare(password, result.password, (err, foundResult) => {
        if (err) {
          console.log("bcrypt login error -> ", err);
        } else if (foundResult) {
          res.json({
            status: "login-success",
            flag: "true",
            message: "login successful",
            email: email,
            password: password,
            user: result,
          });
        } else {
          res.json({
            status: "password-not-matched",
            flag: "false",
            message: "password is not matched!!",
          });
        }
      });
    }
  });
});

app.post(
  "/signup",
  upload.single("Photo"),

  async (req, res) => {
    console.log("req.body is -> ", req.body);
    console.log("req.file is -> ", req.file);

    var errors2 = validateErrors(req.body, req.file);
    console.log("validation-errors2-> ", errors2);

    var errorFlag = false;

    for (var i = 0; i < errors2.length; i++) {
      if (errors2[i].message !== "") {
        console.log("hello error");
        return res.json({ errors: errors2 });
      } else {
        errorFlag = true;
      }
    }

    if (errorFlag === true) {
      errors2 = [];
    }

    console.log("signup-req-body -> ", req.body);
    const email = req.body.Email;
    const password = req.body.Password;

    User.findOne({ email: email }, async function (err, result) {
      if (err) {
        console.log(err);
      }
      if (!result) {
        var countryCode = "";
        await fetch(
          `https://restcountries.com/v3.1/name/${req.body.Country}?fullText=true&fields=name,idd`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log("api data-> ", data);
            if (data.message !== "Page Not Found" && data.status != 404) {
              countryCode += data[0].idd.root + data[0].idd.suffixes[0];
              console.log("cc1-> ", countryCode);
              req.body.Contact = countryCode + " " + req.body.Contact;
              console.log("req-contact-1-> ", req.body.Contact);
            }
          });

        bcrypt.hash(password, saltRounds, async (err, hash) => {
          if (err) {
            console.log("bcrypt signup error -> ", err);
          } else {
            console.log("req-body is-> ", req.body);
            console.log("req-file is-> ", req.file);

            console.log("cc2-> ", countryCode);
            console.log("req-contact-2-> ", req.body.Contact);

            var locaFilePath = req.file.destination + '/' + req.file.filename;
            var imageUrl = "";
            console.log("locapath-> ", locaFilePath);
            await cloudinary.uploader.upload(locaFilePath, {public_id: req.file.originalname}, function(error, result){
              console.log("cloudinary-result-> ", result);
              fs.unlinkSync(locaFilePath);
		          imageUrl = result.url;
              console.log("imageurl-cloud-> ", imageUrl);
            });
            
            const user2 = new User({
              name: req.body.Name,
              // photo: "/uploads/" + req.file.filename,
              photo: imageUrl,
              country: req.body.Country,
              state: req.body.State,
              contact: req.body.Contact,
              email: email,
              password: hash,
            });
            user2.save(function (err, result) {
              if (err) {
                console.log("user error-> ", err);
              } else {
                console.log("user result-> ", result);
                res.json({
                  status: "success",
                  flag: "true",
                  message: "data received successfully",
                  userEmail: email,
                  userImage: req.file.filename,
                });
              }
            });
          }
        });

        console.log("user saved -> hello......");

      } else {
        console.log("result-> ", result);
        console.log("email-> ", email);
        res.json({
          status: "signup failed",
          flag: "false",
          message: "Email id is already registered. Please log in....",
        });
      }
    });
  }
);

app.get("/auth/login/success", async (req, res) => {
  if (req.user) {
    console.log("auth req user-> ", req.user);
    await User.findOne(
      { email: req.user._json.email },
      async function (err, userResult) {
        if (err) {
          console.log(err);
        } else {
          const newUser = {
            name: req.user._json.name,
            email: req.user._json.email,
            photo: req.user._json.picture,
            contact: "not mentioned",
            state: "not mentioned",
            country: "not mentioned",
          };
          if (!userResult) {
            const user = new User(newUser);
            await user.save();
          }

          res.status(200).json({
            success: true,
            message: "successful",
            user: newUser,
          });
        }
      }
    );
  }
});

app.get("/auth/logout", (req, res) => {
  req.logout();
  res.redirect("https://keeper22-frontend.vercel.app/home");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/home",
  passport.authenticate("google", {
    successRedirect: "https://keeper22-frontend.vercel.app/home",
    failureRedirect: "https://keeper22-frontend.vercel.app/login",
  })
);

app.listen(port, () => {
  console.log(`server is listening on port ${port}.`);
});
