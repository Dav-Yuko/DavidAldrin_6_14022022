require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const password = process.env.DA_PASSWORD;
const username = process.env.DA_USER;
const { cors } = require("./middleware/cors");

//Base de données
mongoose
  .connect(
    `mongodb+srv://${username}:${password}@cluster0.y6vxi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.error("Connexion à MongoDB échouée !"));

app.use(express.json());

app.use(cors);

// routes
app.use("/api/auth", userRoutes);

module.exports = app;
