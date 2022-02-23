const express = require("espress");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const {
  createThing,
  modifyThing,
  deleteThing,
  getOneThing,
  getAllThings,
} = require("../controllers/thing");

app.use("/images", express.static(path.join(__dirname, "images")));

router.post("/", auth, multer, createThing);
router.put("/:id", auth, multer, modifyThing);
router.delete("/:id", auth, deleteThing);
router.get("/:id", auth, getOneThing);
router.get("/:", auth, getAllThings);

module.exports = router;
