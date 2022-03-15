const Thing = require("../models/Thing");
const { unlink } = require("fs");

function createThing(req, res) {
  console.log({ req });
  const thingObject = JSON.parse(req.body.sauce);
  delete thingObject._id;
  const thing = new Thing({
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  thing
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
}

function modifyThing(req, res) {
  const thing = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Thing.updateOne({ _id: req.params.id }, { ...thing, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .then(() => console.log(oldThing))
    .catch((error) => res.status(400).json({ error }));
}

function deleteThing(req, res) {
  const { id } = req.params;
  Thing.findByIdAndDelete(id)
    .then(deleteImage)
    .then((thing) => res.send({ message: thing }))
    .catch((error) => res.status(500).json({ error }));
}

function deleteImage(thing) {
  const imageUrl = thing.imageUrl;
  const fileToDelete = imageUrl.split("/").at(-1);
  unlink(`images/${fileToDelete}`, () => {
    return thing;
    // console.error("problème suppr image", err);
  });
}

function getOneThing(req, res) {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
}

function getAllThings(req, res) {
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
}

function likeSauce(req, res) {
  const { like, userId } = req.params;
  if ([0, -1, 1].includes(like)) {
    console.log("yes");
  }
  Thing.findOne({ _id: req.params.id })
    .then((thing) => console.log(thing))
    .catch((error) => res.status(400).json({ error }));
}

module.exports = {
  createThing,
  modifyThing,
  deleteThing,
  getOneThing,
  getAllThings,
  likeSauce,
};
