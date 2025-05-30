import React, { useState } from "react";
import "./EditTranscriptModal.css";

const TranscriptModal = ({ isOpen, onClose, onSave, podcast }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [transcript, setTranscript] = useState(podcast?.transcript || "");
  const [speaker, setSpeaker] = useState(podcast?.speaker || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...podcast, transcript, speaker });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTranscript(podcast?.transcript || "");
    setSpeaker(podcast?.speaker || "");
    setIsEditing(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content transcript-modal">
        <div className="modal-header">
          <div className="modal-title">
            <h2>Transcript</h2>
            {!isEditing && (
              <button
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
          </div>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="speaker">Speaker</label>
              <input
                type="text"
                id="speaker"
                value={speaker}
                onChange={(e) => setSpeaker(e.target.value)}
                placeholder="Enter speaker name"
                className="speaker-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="transcript">Transcript</label>
              <textarea
                id="transcript"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Enter transcript text"
                rows="15"
                className="transcript-textarea"
              />
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button type="submit" className="save-btn">
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="transcript-view">
            {speaker && (
              <div className="speaker-name">
                <strong>Speaker:</strong> {speaker}
              </div>
            )}
            <div className="transcript-content">
              {transcript || "No transcript available."}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranscriptModal;
