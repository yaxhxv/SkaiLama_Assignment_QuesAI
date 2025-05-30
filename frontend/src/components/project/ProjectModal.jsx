import React, { useState } from "react";
import "./ProjectModal.css";

const ProjectModal = ({ isOpen, onClose, onSubmit }) => {
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!projectName.trim()) {
      setError("Project Name Can't be empty");
      return;
    }
    onSubmit(projectName);
    setProjectName("");
    setError("");
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Enter Project Name:</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
                setError("");
              }}
              placeholder="Type here"
              className={error ? "error" : ""}
            />
            {error && <div className="error-message">{error}</div>}
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="create-btn">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
