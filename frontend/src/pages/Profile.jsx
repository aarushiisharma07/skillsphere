import React, { useState } from "react";
import "../Profile.css";

function Profile({ applications = 0 }) {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(false);

  const [name, setName] = useState("Aarushi Kumari");
  const [location, setLocation] = useState("India");

  const addProject = () => {
    const projectName = prompt("Enter project name:");

    if (!projectName || !projectName.trim()) {
      return;
    }

    setProjects((prevProjects) => [
      ...prevProjects,
      {
        title: projectName.trim(),
        description:
          "New project added to your portfolio.",
        tags: ["Project"],
        status: "Active",
      },
    ]);
  };

  return (
    <div className="profile-page">

      {/* PROFILE HEADER */}
      <section className="profile-header-card">

        <div className="profile-cover"></div>

        <div className="profile-header-content">

          <div className="profile-avatar">
            AK
          </div>

          <div className="profile-identity">

            <div className="profile-name">
              <h1>{name}</h1>

              <span className="verified-badge">
                ✓ Verified
              </span>
            </div>

            <p>
              B.Tech • Computer Science & Engineering
            </p>

            <span className="location">
              📍 {location}
            </span>

          </div>

          <button
            className="edit-button"
            onClick={() => setEditing(true)}
          >
            ✎ Edit Profile
          </button>

        </div>
      </section>

      {/* EDIT PROFILE */}
      {editing && (
        <div className="profile-edit-box">

          <h2>Edit Profile</h2>

          <label>Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <label>Location</label>

          <input
            type="text"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
          />

          <div className="edit-actions">

            <button
              className="complete-button"
              onClick={() => setEditing(false)}
            >
              Save Changes
            </button>

            <button
              className="add-button"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>

          </div>

        </div>
      )}

      {/* PROFILE STATS */}
      <section className="profile-stats">

        <div>
          <span>Skills</span>
          <strong>8</strong>
        </div>

        <div>
          <span>Projects</span>
          <strong>
            {4 + projects.length}
          </strong>
        </div>

        <div>
          <span>Certificates</span>
          <strong>3</strong>
        </div>

        <div>
          <span>Applications</span>
          <strong>{applications}</strong>
        </div>

        <div>
          <span>Readiness</span>
          <strong>72%</strong>
        </div>

      </section>

      {/* MAIN GRID */}
      <section className="profile-grid">

        {/* LEFT COLUMN */}
        <div>

          {/* ABOUT */}
          <div className="profile-card">

            <span className="label">
              ABOUT
            </span>

            <h2>About Me</h2>

            <p className="about">
              I am a Computer Science and
              Engineering student interested in
              software development, artificial
              intelligence, web technologies and
              building practical technology
              solutions.
            </p>

          </div>

          {/* SKILLS */}
          <div className="profile-card">

            <div className="card-heading">

              <div>
                <span className="label">
                  TECHNICAL SKILLS
                </span>

                <h2>My Skills</h2>
              </div>

              <strong>
                8 Skills
              </strong>

            </div>

            <div className="skills">

              <div>
                <span>Python</span>
              </div>

              <div>
                <span>JavaScript</span>
              </div>

              <div>
                <span>React</span>
              </div>

              <div>
                <span>HTML</span>
              </div>

              <div>
                <span>CSS</span>
              </div>

              <div>
                <span>SQL</span>
              </div>

              <div>
                <span>FastAPI</span>
              </div>

              <div>
                <span>Git</span>
              </div>

            </div>

          </div>

          {/* PROJECTS */}
          <div className="profile-card">

            <div className="card-heading">

              <div>
                <span className="label">
                  PROJECT PORTFOLIO
                </span>

                <h2>Projects</h2>
              </div>

              <button
                className="add-button"
                onClick={addProject}
              >
                + Add Project
              </button>

            </div>

            <Project
              icon="⚡"
              title="SkillSphere"
              description="AI-powered academia-industry collaboration platform for skill mapping, learning and career opportunities."
              tags={[
                "React",
                "FastAPI",
                "AI",
              ]}
              status="Active"
            />

            <Project
              icon="💻"
              title="Student Management System"
              description="Web-based application for managing student records and academic information."
              tags={[
                "Python",
                "SQL",
                "HTML",
              ]}
              status="Completed"
            />

            {projects.map(
              (project, index) => (
                <Project
                  key={`${project.title}-${index}`}
                  icon="🚀"
                  title={project.title}
                  description={
                    project.description
                  }
                  tags={project.tags}
                  status={project.status}
                />
              )
            )}

          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div>

          {/* PROFILE COMPLETION */}
          <div className="profile-card">

            <div className="card-heading">

              <div>
                <span className="label">
                  PROFILE HEALTH
                </span>

                <h2>
                  Profile Completion
                </h2>
              </div>

              <strong className="completion">
                85%
              </strong>

            </div>

            <div className="completion-bar">
              <div
                style={{
                  width: "85%",
                }}
              ></div>
            </div>

            <p className="muted">
              Your profile is almost complete.
              Add another project and
              certification to improve your
              profile.
            </p>

            <button
              className="complete-button"
              onClick={() =>
                alert(
                  "Profile completion workflow started!"
                )
              }
            >
              Complete Profile
            </button>

          </div>

          {/* EDUCATION */}
          <div className="profile-card">

            <span className="label">
              EDUCATION
            </span>

            <h2>
              Academic Background
            </h2>

            <div className="education">

              <div className="education-icon">
                🎓
              </div>

              <div>

                <h3>
                  Bachelor of Technology
                </h3>

                <p>
                  Computer Science &
                  Engineering
                </p>

                <span>
                  2024 — 2028
                </span>

              </div>

            </div>

          </div>

          {/* CERTIFICATIONS */}
          <div className="profile-card">

            <span className="label">
              VERIFIED ACHIEVEMENTS
            </span>

            <h2>
              Certifications
            </h2>

            <Certificate
              title="Python Programming"
            />

            <Certificate
              title="Web Development"
            />

            <Certificate
              title="SQL Fundamentals"
            />

          </div>

        </div>

      </section>
    </div>
  );
}

/* =========================================
   PROJECT COMPONENT
========================================= */

function Project({
  icon,
  title,
  description,
  tags,
  status,
}) {
  return (
    <div className="project">

      <div className="project-icon">
        {icon}
      </div>

      <div className="project-content">

        <div className="project-title">

          <h3>{title}</h3>

          <span className="status">
            {status}
          </span>

        </div>

        <p>{description}</p>

        <div className="project-tags">

          {tags.map((tag) => (
            <span key={tag}>
              {tag}
            </span>
          ))}

        </div>

      </div>

    </div>
  );
}

/* =========================================
   CERTIFICATE COMPONENT
========================================= */

function Certificate({ title }) {
  return (
    <div className="certificate">

      <div className="certificate-icon">
        ✓
      </div>

      <div>

        <h3>{title}</h3>

        <span>
          Verified Certificate
        </span>

      </div>

    </div>
  );
}

export default Profile;