const express = require("express");
const { Announcement } = require('../models/announcement.js'); // Assuming the Sequelize Announcement model is defined in announcement.js
const { User } = require('./user.js');
const router = express.Router();

const {
  fetchAllAnnouncements,
  fetchAnnouncementById,
} = require("../controllers/announcements.controllers");

//routes for fetching all announcements and announcement by id
router.route("/").get(fetchAllAnnouncements);
router.route("/:id").get(fetchAnnouncementById);


// Route handler for GET /announcements
router.get('/announcements', async (req, res) => {
  try {
      // Fetch announcement data including associated user data from the database
      const announcements = await Announcement.findAll({
          include: [{
              model: User,
              attributes: ['photo', 'name'], // Include user's photo and name in the response
          }],
          attributes: ['id', 'title', 'content', 'date', 'attachments'], // Specify the attributes to include in the response
      });

      // Send the fetched announcements as a response
      res.json(announcements);
  } catch (error) {
      console.error('Error fetching announcements:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
