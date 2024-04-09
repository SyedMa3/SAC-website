const asyncHandler = require("express-async-handler");
const { Hackathon } = require("../models/hackathon");
const { Project } = require("../models/project");
const { Team } = require("../models/team");

// to get all hackathon
const getAllHackathons = asyncHandler(async (req, res) => {
  const rows = await Hackathon.findAll();
  if (!rows) {
    return res.status(204).json({
      msg: `No rows in Hackathon relation. `,
    });
  }
  res.json(rows);
});

// to get a hackathon by id
const getSingleHackathon = asyncHandler(async (req, res) => {
  const { id: hackathonID } = req.params;

  const row = await Hackathon.findByPk(hackathonID);
  if (!row) {
    return res.status(204).json({
      msg: "Requested hackathon not found",
    });
  }

  return res.json(row);
});

const getHackathonTeams = asyncHandler(async (req, res) => {
  const { id: hackathonID } = req.params;

  const projects = await Project.findAll({
    where: {
      is_hackathon = true,
      hackathon_id = id,
    },
    attributes: ['project_id'] 
  });

  if (!projects.length) {
    return res.status(204).json({
      msg: `No projects found for the given hackathon ID`,
    });
  }

  const projectIDs = projects.map(project => project.project_id);

  const teams = await Team.findAll({
    where: {
      project_id: projectIDs
    },
  });

  if (!teams.length) {
    return res.status(204).json({
      msg: `No teams found for the given projects`,
    });
  }

  res.json(teams);
});

// post a hackathon 
const postHackathon = asyncHandler(async (req, res) => {
  // assuming the details to put is present in req.body
  const hackathon = await Hackathon.create(req.body);
  res.status(201).json({
    msg: `hackathon created with ${hackathon}`,
  });
});

const patchHackathon = asyncHandler(async (req, res) => {
  // instead of PUT
  // assuming the hackathon ID is present in req.body and req.body contains the details to update
  // i.e req.body = {
  //	hackathon_id : ,
  //	and other attributes ...
  // }
  const hackathon = await Hackathon.findByPk(req.body.id);
  if (!hackathon) {
    await Hackathon.create(req.body);
    return res.status(201).json({
      msg: `hackathon with given id, didn't exist, hence created hackathon`,
    });
  }
  if (hackathon == req.body) {
    return res.status(200).json({
      msg: `nothing to update`,
    });
  }
  hackathon.set(req.body);
  await hackathon.save();
  res.status(200).json({
    msg: `updated`,
  });
});

const deleteHackathon = asyncHandler(async (req, res) => {
  // assuming hackathon_id is present req.params
  const { id: hackathon_id } = req.params;
  // finding the hackathon by id,
  const hackathon = await Hackathon.findByPk(hackathon_id);
  // if hackathon not found return success status code with the message nothing to delete
  if (!hackathon) {
    return res.status(200).json({
      msg: `nothing to delete`,
    });
  }
  // destroy method in sequelize
  await hackathon.destroy();
  res.status(200).json({
    msg: `deleted`,
  });
});

module.exports = {
  getAllHackathons,
  getSingleHackathon,
  getHackathonTeams, 
  postHackathon,
  patchHackathon,
  deleteHackathon,
};
