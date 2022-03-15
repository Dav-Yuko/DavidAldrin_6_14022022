const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const {
  createThing,
  modifyThing,
  deleteThing,
  getOneThing,
  getAllThings,
  likeSauce,
} = require("../controllers/thing");

router.post("/", auth, multer, createThing);
router.put("/:id", auth, multer, modifyThing);
router.delete("/:id", auth, deleteThing);
router.get("/:id", auth, getOneThing);
router.get("/", auth, getAllThings);
router.post("/:id/like", auth, multer, likeSauce);

module.exports = router;
