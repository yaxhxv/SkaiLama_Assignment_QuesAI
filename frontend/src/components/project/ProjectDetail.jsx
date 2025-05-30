import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoHomeOutline, IoNotificationsOutline } from "react-icons/io5";
import { FiUpload, FiLogOut } from "react-icons/fi";
import { RiYoutubeLine } from "react-icons/ri";
import { TbRss } from "react-icons/tb";
import { BiHelpCircle } from "react-icons/bi";
import YoutubeUploadModal from "../modals/YoutubeUploadModal";
import TranscriptModal from "../modals/EditTranscriptModal";
import podcastService from "../../services/podcastService";
import authService from "../../services/authService";
import "./ProjectDetail.css";

function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [isYoutubeModalOpen, setIsYoutubeModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch current user
  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  // Validate projectId
  useEffect(() => {
    if (!projectId) {
      setError("Project ID is required");
      return;
    }
  }, [projectId]);

  // Fetch podcasts when component mounts
  useEffect(() => {
    const fetchPodcasts = async () => {
      if (!projectId) return;

      try {
        setIsLoading(true);
        const podcasts = await podcastService.getPodcasts(projectId);
        setFiles(podcasts);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPodcasts();
  }, [projectId]);

  const handleYoutubeUpload = async (data) => {
    try {
      if (!currentUser) {
        setError("Please log in to upload podcasts");
        return;
      }

      if (!projectId) {
        setError("Project ID is required");
        return;
      }

      setIsLoading(true);
      setError(null);

      const uploadData = {
        name: data.name,
        transcript: data.transcript,
        projectId: projectId,
        type: "youtube",
      };

      console.log("Uploading podcast with data:", uploadData);

      const response = await podcastService.uploadPodcast(uploadData);
      const newPodcast = {
        id: response._id,
        name: response.name,
        createdAt: response.createdAt || new Date().toISOString(),
        transcript: response.transcript,
        type: response.type,
      };

      setFiles((prevFiles) => [...prevFiles, newPodcast]);
      setIsYoutubeModalOpen(false);
    } catch (err) {
      console.error("Upload error:", err);
      setError(
        err.response?.data?.error || err.message || "Failed to upload podcast"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    try {
      // Show confirmation dialog
      if (
        !window.confirm(
          `Are you sure you want to delete "${name}"? This action cannot be undone.`
        )
      ) {
        return;
      }

      setIsLoading(true);
      setError(null);

      // Delete from backend
      await podcastService.deletePodcast(id);

      // Update UI
      setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));

      // Show success message
      const successMessage = document.createElement("div");
      successMessage.className = "success-message";
      successMessage.textContent = "Podcast deleted successfully";
      document.body.appendChild(successMessage);

      // Remove success message after 3 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 3000);
    } catch (err) {
      console.error("Delete error:", err);
      setError(
        err.response?.data?.error || err.message || "Failed to delete podcast"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = (podcast) => {
    setSelectedPodcast(podcast);
    setIsEditModalOpen(true);
  };

  const handleSaveTranscript = async (updatedPodcast) => {
    try {
      setIsLoading(true);
      setError(null);

      await podcastService.updatePodcast(updatedPodcast.id, {
        transcript: updatedPodcast.transcript,
        speaker: updatedPodcast.speaker,
      });

      setFiles((prevFiles) =>
        prevFiles.map((file) =>
          file.id === updatedPodcast.id ? { ...file, ...updatedPodcast } : file
        )
      );

      setIsEditModalOpen(false);
    } catch (err) {
      console.error("Update error:", err);
      setError(
        err.response?.data?.error ||
          err.message ||
          "Failed to update transcript"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <div className="project-detail">
      <aside className="project-sidebar">
        <div className="logo">
          <span className="logo-ques">Ques</span>
          <span className="logo-ai">.AI</span>
        </div>

        <nav className="sidebar-nav">
          <button className="nav-item active">
            <span className="nav-icon">+</span>
            Add your Podcast(s)
          </button>

          <button className="nav-item">
            <span className="nav-icon">⟲</span>
            Create & Repurpose
          </button>

          <button className="nav-item">
            <span className="nav-icon">▶</span>
            Podcast Widget
          </button>

          <button className="nav-item">
            <span className="nav-icon">↑</span>
            Upgrade
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item help-item">
            <BiHelpCircle size={20} />
            Help
          </button>
          {currentUser ? (
            <div className="user-info">
              <div className="user-avatar">
                {currentUser.name?.charAt(0) || "U"}
              </div>
              <div className="user-details">
                <div className="username">{currentUser.name}</div>
                <div className="user-email">{currentUser.email}</div>
              </div>
            </div>
          ) : (
            <button
              className="nav-item login-btn"
              onClick={() => navigate("/login")}
            >
              <span className="nav-icon">→</span>
              Login
            </button>
          )}
        </div>
      </aside>

      <main className="project-content">
        <header className="content-header">
          <div className="breadcrumb">
            <IoHomeOutline />
            <span>Home Page</span>
            <span>/</span>
            <span>Sample Project</span>
            <span>/</span>
            <span className="current">Add your podcast</span>
          </div>
          <div className="header-actions">
            <button className="icon-button">
              <IoNotificationsOutline size={20} />
            </button>
            {currentUser && (
              <button className="logout-button" onClick={handleLogout}>
                <FiLogOut size={20} />
                <span>Logout</span>
              </button>
            )}
          </div>
        </header>

        <div className="content-main">
          <h1>Add Podcast</h1>

          {error && <div className="error-message">{error}</div>}

          <div className="upload-options">
            <div className="upload-card">
              <div className="upload-icon">
                <TbRss size={32} />
              </div>
              <h3>RSS Feed</h3>
              <p>Lorem ipsum dolor sit. Dolor lorem sit.</p>
            </div>

            <div
              className="upload-card"
              onClick={() => setIsYoutubeModalOpen(true)}
            >
              <div className="upload-icon">
                <RiYoutubeLine size={32} />
              </div>
              <h3>Youtube Video</h3>
              <p>Lorem ipsum dolor sit. Dolor lorem sit.</p>
            </div>

            <div className="upload-card">
              <div className="upload-icon">
                <FiUpload size={32} />
              </div>
              <h3>Upload Files</h3>
              <p>Lorem ipsum dolor sit. Dolor lorem sit.</p>
            </div>
          </div>

          {files.length > 0 && (
            <div className="files-section">
              <h2>Your Files</h2>
              <div className="files-table">
                <table>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Upload Date & Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((file, index) => (
                      <tr key={file.id}>
                        <td>{index + 1}</td>
                        <td>{file.name}</td>
                        <td>{file.type}</td>
                        <td>{new Date(file.createdAt).toLocaleString()}</td>
                        <td>
                          <button
                            className="view-btn"
                            onClick={() => handleView(file)}
                            disabled={isLoading}
                          >
                            View
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(file.id, file.name)}
                            disabled={isLoading}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="upload-dropzone">
            <div className="dropzone-content">
              <div className="upload-cloud-icon">
                <FiUpload size={40} />
              </div>
              <p>
                Select a file or drag and drop here (Podcast Media or
                Transcription Text)
              </p>
              <p className="file-types">
                MP4, MOV, MP3, WAV, PDF, DOCX or TXT file
              </p>
              <button className="select-file-btn">Select File</button>
            </div>
          </div>
        </div>
      </main>

      <YoutubeUploadModal
        isOpen={isYoutubeModalOpen}
        onClose={() => setIsYoutubeModalOpen(false)}
        onSubmit={handleYoutubeUpload}
      />

      <TranscriptModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedPodcast(null);
        }}
        onSave={handleSaveTranscript}
        podcast={selectedPodcast}
      />
    </div>
  );
}

export default ProjectDetail;
