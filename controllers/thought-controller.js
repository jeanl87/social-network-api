const res = require("express/lib/response");
const { Thought } = require("../models");

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id });
    populate({
      path: "reactions",
      select: "-__v",
    })
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  createThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return Users.findOneAndUpdate(
          { _id: parms.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thoughts with this id" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thoughts with this ID" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thoughts with this id" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
  addReaction({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params, thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    );
    populate({
      path: "reactions",
      select: "-__v",
    })
      .select("-__v")
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: "No thoughts with this id" });
          return;
        }
        res.json(dbTHoughtsData);
      })
      .catch((err) => res.status(400).json(err));
  },
  deleteReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ essage: "No thoughts with this id" });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = thoughtController;
