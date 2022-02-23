const Thing = require("./models/Thing");

function createThing(req, res) {
  delete req.body._id;
  const thing = new Thing({
    ...req.body,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  thing
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
}

function modifyThing(req, res) {
  const thing = req.file
    ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Thing.updateOne({ _id: req.params.id }, { ...thing, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
}

function deleteThing(req, res) {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
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

module.exports = {
  createThing,
  modifyThing,
  deleteThing,
  getOneThing,
  getAllThings,
};
