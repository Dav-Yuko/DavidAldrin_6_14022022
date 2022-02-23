const express = require("express");
const router = express.Router();

// importe les 2 clés dont on n'a besoin - on vient de céer un objet destructuring
const { signup, login } = require("../controllers/user");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
