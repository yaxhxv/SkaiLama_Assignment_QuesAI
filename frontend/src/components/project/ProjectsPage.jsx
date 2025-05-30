import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import "./ProjectsPage.css";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);

  // TODO: Replace this with actual API call
  useEffect(() => {
    // Mock data with valid MongoDB ObjectId format
    setProjects([
      {
        id: "507f1f77bcf86cd799439011", // Valid MongoDB ObjectId format
        name: "Sample Project",
        lastModified: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
      // Add more mock projects as needed
    ]);
  }, []);

  return (
    <div className="projects-page">
      <div className="projects-title-row">
        <h1>Projects</h1>
        <button className="create-project-btn">
          <span>+</span> Create New Project
        </button>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            name={project.name}
            lastModified={project.lastModified}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
