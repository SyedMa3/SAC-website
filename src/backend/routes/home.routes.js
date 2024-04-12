const express = require("express");
const { Announcement } = require('../models/announcement.js');
const { Council } = require('../models/council.js');
const router = express.Router();

// Import other router files
const userRoutes = require("./users.routes");
const threadRoutes = require("./threads.routes");
const announcementRoutes = require("./announcements.routes");
const clubRoutes = require("./clubs.routes");

// Use the routers
router.use("/users", userRoutes);
router.use("/threads", threadRoutes);
router.use("/announcements", announcementRoutes);
router.use("/clubs", clubRoutes);

// Route handler for GET /home/announcements/public
router.get('/home/announcements/public', async (req, res) => {
    try {
        // Fetch public announcements from the database
        const announcements = await Announcement.findAll({
            attributes: ['id', 'title', 'content', 'attachments'], // Specify the attributes to include in the response
        });

        // Send the fetched announcements as a response
        res.json(announcements);
    } catch (error) {
        console.error('Error fetching public announcements:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Route handler for GET /home/councils
router.get('/home/councils', async (req, res) => {
    try {
        // Fetch councils data from the database
        const councils = await Council.findAll({
            attributes: ['logo', 'name', 'secretary', 'page'], // Specify the attributes to include in the response
        });

        // Send the fetched councils as a response
        res.json(councils);
    } catch (error) {
        console.error('Error fetching councils:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route handler for GET /dashboard/home/latest-announcements/:count
router.get('/dashboard/home/latest-announcements/:count', async (req, res) => {
    try {
        // Fetch the specified number of latest announcements from the database
        const count = parseInt(req.params.count);
        const latestAnnouncements = await Announcement.findAll({
            order: [['createdAt', 'DESC']], // Order by creation date in descending order to get the latest announcements
            limit: count, // Limit the number of announcements to fetch
            attributes: ['id', 'title', 'content', 'attachments'], // Specify the attributes to include in the response
        });

        // Send the fetched announcements as a response
        res.json(latestAnnouncements);
    } catch (error) {
        console.error('Error fetching latest announcements:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router;
