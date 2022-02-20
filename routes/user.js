const express = require("express");
const router = express.Router();

// importe les 2 clés dont on n'a besoin - on vient de céer un objet destructuring
const { signup, login } = require("../controllers/user");
const {
  createThing,
  modifyThing,
  deleteThing,
  getOneThing,
  getAllThings,
} = require("../controllers/thing");

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/signup", signup);
router.post("/login", login);
router.post("/", auth, multer, createThing);
router.put("/:id", auth, multer, modifyThing);
router.delete("/:id", auth, multer, deleteThing);
router.get("/:id", auth, multer, getOneThing);
router.get("/:", auth, multer, getAllThings);

module.exports = router;
