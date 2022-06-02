const { User } = require("../models");

const usersController = {
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getUserbyId({ params }, res) {
    User.findOne({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json())
      .catch((err) => res.json(err));
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No usesr found with this ID" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "No user found with this id" });
        }
      })
      .then(() => {
        res.json({ message: "user has been deleted" });
      })
      .catch((err) => res.status(400).json(err));
  },

  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendsId } },
      { new: true }
    )
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUsersData) => {
        if (!dbUsers) {
          res.status(404).json({ message: "No User with this id" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.json(err));
  },

  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendID } },
      { new: true }
    );
    populate({
      path: "friends",
      select: "-__v",
    })
      .select("-__v")
      .then((dbUsersData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user with this id" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = usersController;
