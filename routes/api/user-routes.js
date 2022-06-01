const router = require("express").Router();

const {
  getAllUsers,
  getUsersById,
  createUsers,
  updateUsers,
  deleteUsers,
  addFriend,
  deleteFriend,
} = require("../../controllers/user-controller");

router.route("/").get(getAllUsers).post(createUsers);

router.route("/:id").get(getUsersById).put(updateUsers).delete(deleteUsers);

module.exports = router;
