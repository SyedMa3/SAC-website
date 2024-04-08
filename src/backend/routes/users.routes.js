const express = require("express");
const router = express.Router();
const passport = require("../middlewares/googleauth");

const {
  fetchAllUsers,
  fetchUsersById,
} = require("../controllers/users.controllers");

const {
  isLoggedIn, authRole, canViewUser
} = require("../controllers/auth.controllers");

//routes for fetching all users and user by id
router.route("/").get(fetchAllUsers, isLoggedIn, authRole(["Admin"]));
router.route("/:id").get(fetchUsersById, isLoggedIn, canViewUser, (req, res) => {
  const userId = req.params.id;
});

module.exports = router;