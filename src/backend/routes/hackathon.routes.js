const express = require("express");
const router = express.Router();

const {
  getAllHackathons,
  getSingleHackathon,
  postHackathon,
  patchHackathon,
  deleteHackathon,
} = require("../controllers/hackathons.controllers");

router.get("/", getAllHackathons);
router.get("hackathon/:id", getSingleHackathon);
router.post("/hackathon/create", postHackathon);
router.patch("hackathon/:id/update", patchHackathon)
router.delete("hackathon/:id/delete", deleteHackathon)

module.exports = router;
