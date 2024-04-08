const express = require("express");
const router = express.Router();

const {
  fetchAllThreads,
  fetchThreadById,
} = require("../controllers/threads.controllers");

const {
  isLoggedIn, authRole
} = require("../controllers/auth.controllers");

router.route("/").get(fetchAllThreads,isLoggedIn,authRole(["Admin"]));

router.route("/:id").get(fetchThreadById,isLoggedIn);

module.exports = router;
