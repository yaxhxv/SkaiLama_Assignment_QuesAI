const mongoose = require('mongoose');

const podcastSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  transcript: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['youtube', 'rss', 'file']
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Podcast = mongoose.model('Podcast', podcastSchema);

module.exports = Podcast; 