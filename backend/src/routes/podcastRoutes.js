const express = require('express');
const router = express.Router();
const podcastController = require('../controllers/podcastController');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// Create a new podcast
router.post('/', podcastController.createPodcast);

// Get all podcasts for a project
router.get('/', podcastController.getPodcasts);

// Get a single podcast
router.get('/:id', podcastController.getPodcast);

// Delete a podcast
router.delete('/:id', podcastController.deletePodcast);

module.exports = router; 