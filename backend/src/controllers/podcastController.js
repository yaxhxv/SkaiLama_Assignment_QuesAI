const Podcast = require('../models/Podcast');

// Create a new podcast
exports.createPodcast = async (req, res) => {
  try {
    const { name, transcript, type, projectId } = req.body;
    
    const podcast = new Podcast({
      name,
      transcript,
      type,
      projectId,
      userId: req.user._id // From auth middleware
    });

    await podcast.save();

    res.status(201).json(podcast);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all podcasts for a project
exports.getPodcasts = async (req, res) => {
  try {
    const { projectId } = req.query;
    
    const podcasts = await Podcast.find({ 
      projectId,
      userId: req.user._id
    }).sort({ createdAt: -1 });

    res.json(podcasts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single podcast
exports.getPodcast = async (req, res) => {
  try {
    const podcast = await Podcast.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!podcast) {
      return res.status(404).json({ error: 'Podcast not found' });
    }

    res.json(podcast);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a podcast
exports.deletePodcast = async (req, res) => {
  try {
    const podcast = await Podcast.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!podcast) {
      return res.status(404).json({ error: 'Podcast not found' });
    }

    res.json({ message: 'Podcast deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; 