import React, { useState } from "react";
import youtubeLogo from "../../assets/youtubeLogo.png";
import "./YoutubeUploadModal.css";

const YoutubeUploadModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    transcript: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", transcript: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content youtube-modal">
        <div className="modal-header">
          <div className="modal-title">
            <img src={youtubeLogo} alt="YouTube" className="youtube-logo" />
            <h2>Upload from Youtube</h2>
          </div>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter video name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="transcript">Transcript</label>
            <textarea
              id="transcript"
              name="transcript"
              value={formData.transcript}
              onChange={handleChange}
              placeholder="Enter video transcript"
              rows="6"
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="upload-btn">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default YoutubeUploadModal;
