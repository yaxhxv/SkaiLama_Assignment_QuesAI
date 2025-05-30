import api from './api';

const podcastService = {
  // Upload a new podcast
  uploadPodcast: async (podcastData) => {
    try {
      const response = await api.post('/podcasts', podcastData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'An error occurred while uploading the podcast';
    }
  },

  // Get all podcasts for a project
  getPodcasts: async (projectId) => {
    try {
      const response = await api.get(`/podcasts?projectId=${projectId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'An error occurred while fetching podcasts';
    }
  },

  // Update a podcast
  updatePodcast: async (podcastId, updateData) => {
    try {
      const response = await api.put(`/podcasts/${podcastId}`, updateData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'An error occurred while updating the podcast';
    }
  },

  // Delete a podcast
  deletePodcast: async (podcastId) => {
    try {
      await api.delete(`/podcasts/${podcastId}`);
    } catch (error) {
      throw error.response?.data?.error || 'An error occurred while deleting the podcast';
    }
  }
};

export default podcastService; 