const express = require("express");
const app = express();
// const port = 3000;
// const mongoose = require("mongoose");
// const stuffRoots = require("./roots/stuff");
// const userRoots = require("./roots/user");

// mongoose
//   .connect(
//     "mongodb+srv://Yuko:Monodie77@cluster0.y6vxi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
//     { useNewUrlParser: true, useUnifiedTopology: true }
//   )
//   .then(() => console.log("Connexion à MongoDB réussie !"))
//   .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// routes
app.post("/api/auth/signup", (req, res) => {
  console.log("Signup request : ", req.body);
});

// app.use("/api/stuff", stuffRoots); //pour la route api/stuff, on utilise stuffRoots qui nous renvoi à la logique dans roots/stuff.js
// app.use("/api/auth", userRoots);

module.exports = app;
// app.listen(port, () => console.log("listening on port " + port));
