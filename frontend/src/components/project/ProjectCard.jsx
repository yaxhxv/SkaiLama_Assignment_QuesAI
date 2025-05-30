import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectCard.css";

const ProjectCard = ({ id, name, lastModified }) => {
  const navigate = useNavigate();

  // Get initials from project name
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Format the time
  const formatTime = (timestamp) => {
    const now = new Date();
    const modified = new Date(timestamp);
    const diffInHours = Math.floor((now - modified) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  const handleClick = () => {
    navigate(`/dashboard/projects/${id}`);
  };

  return (
    <div className="project-card" onClick={handleClick}>
      <div className="project-initials">{initials}</div>
      <div className="project-info">
        <h3 className="project-name">{name}</h3>
        <p className="project-time">Last modified {formatTime(lastModified)}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
