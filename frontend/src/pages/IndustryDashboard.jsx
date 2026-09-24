import { useState } from "react";
import "./IndustryDashboard.css";

function IndustryDashboard({ onLogout }) {
    const [shortlisted, setShortlisted] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [talentSearch, setTalentSearch] = useState("");
    const [showPostModal, setShowPostModal] = useState(false);
    const [applicationStatus, setApplicationStatus] = useState({});
    const [postedOpportunities, setPostedOpportunities] = useState([]);

const [newOpportunity, setNewOpportunity] = useState({
  title: "",
  type: "Internship",
  location: "Remote",
  skills: "",
});
    const candidates = [
  {
    id: 1,
    name: "Aarushi Sharma",
    department: "Computer Science",
    skills: ["React", "JavaScript", "Python"],
    readiness: 86,
    status: "Available",
  },
  {
    id: 2,
    name: "Sneha Patel",
    department: "Data Science",
    skills: ["Python", "SQL", "Power BI"],
    readiness: 91,
    status: "Available",
  },
  {
    id: 3,
    name: "Rahul Verma",
    department: "Information Technology",
    skills: ["Java", "SQL", "Cloud"],
    readiness: 78,
    status: "Available",
  },
  {
    id: 4,
    name: "Arjun Mehta",
    department: "Computer Science",
    skills: ["React", "Node.js", "JavaScript"],
    readiness: 74,
    status: "Available",
  },
];
const filteredCandidates = candidates.filter((candidate) =>
  `${candidate.name} ${candidate.department} ${candidate.skills.join(" ")}`
    .toLowerCase()
    .includes(talentSearch.toLowerCase())
);
  return (
    <div className="industry-page">
      <nav className="industry-navbar">
        <div>
          <h2>SkillSphere</h2>
          <span>INDUSTRY</span>
        </div>

        <div className="industry-nav-links">
          <a href="#industry-dashboard">Dashboard</a>
          <a href="#talent">Talent</a>
          <a href="#opportunities">Opportunities</a>
          <a href="#matches">Skill Matches</a>
          <a href="#applications">Applications</a>

          <button
            className="industry-logout"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      <main
        id="industry-dashboard"
        className="industry-dashboard"
      >
        <div className="industry-heading">
          <p>INDUSTRY TALENT INTELLIGENCE</p>

          <h1>Industry Dashboard</h1>

          <span>
            Discover skilled talent, publish opportunities,
            and track candidate applications.
          </span>
        </div>

        <div className="industry-stats">
          <div className="industry-stat-card">
            <span>Available Talent</span>
            <h2>1,240</h2>
            <p>Student profiles</p>
          </div>

          <div className="industry-stat-card">
            <span>Skill Matches</span>
            <h2>186</h2>
            <p>Relevant candidates</p>
          </div>

          <div className="industry-stat-card">
            <span>Active Opportunities</span>
            <h2>12</h2>
            <p>Jobs and internships</p>
          </div>

          <div className="industry-stat-card">
            <span>Applications</span>
            <h2>94</h2>
            <p>Candidate applications</p>
          </div>
        </div>
        <section id="talent" className="industry-section">
  <div className="industry-section-heading">
    <p>TALENT DISCOVERY</p>
    <h2>Recommended Candidates</h2>
    <span>
      Discover candidates based on skills, readiness and role relevance.
    </span>
  </div>
  <input
  type="text"
  className="talent-search"
  placeholder="Search candidates, departments or skills..."
  value={talentSearch}
  onChange={(e) => setTalentSearch(e.target.value)}
/>

  <div className="talent-grid">
    {filteredCandidates.length === 0 && (
  <div className="no-candidates">
    No candidates found. Try another name, department, or skill.
  </div>
)}
    {filteredCandidates.map((candidate) => (
      <div className="talent-card" key={candidate.id}>
        <div className="talent-top">
          <div className="talent-avatar">
            {candidate.name.charAt(0)}
          </div>

          <div>
            <h3>{candidate.name}</h3>
            <p>{candidate.department}</p>
          </div>
        </div>

        <div className="talent-skills">
          {candidate.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>

        <div className="talent-readiness">
          <div>
            <span>Readiness</span>
            <strong>{candidate.readiness}%</strong>
          </div>

          <div className="talent-bar">
            <div
              style={{
                width: `${candidate.readiness}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="talent-actions">
         <button
  className="secondary-action"
  onClick={() => setSelectedCandidate(candidate)}
>
  View Profile
</button>

          <button
  className="primary-action"
  onClick={() => {
    if (!shortlisted.includes(candidate.id)) {
      setShortlisted([...shortlisted, candidate.id]);
    }
  }}
>
  {shortlisted.includes(candidate.id)
    ? "Shortlisted ✓"
    : "Shortlist"}
</button>
        </div>
      </div>
    ))}
  </div>
</section>

{/* ===== SKILL MATCHES ===== */}
<section id="matches" className="industry-section">
  <div className="industry-section-heading">
    <p>SKILL MATCHING</p>
    <h2>Top Candidate Matches</h2>
    <span>
      Candidates ranked by alignment with your current hiring needs.
    </span>
  </div>

  <div className="match-grid">

    <div className="match-card">
      <div className="match-top">
        <div className="match-avatar">S</div>

        <div>
          <h3>Sneha Patel</h3>
          <p>Data Science</p>
        </div>

        <strong className="match-score">94%</strong>
      </div>

      <div className="match-role">
        Best match for:
        <strong> Data Analytics Project</strong>
      </div>

      <div className="match-skills">
        <span>Python</span>
        <span>SQL</span>
        <span>Power BI</span>
      </div>

      <button
        className="match-profile-button"
        onClick={() =>
          setSelectedCandidate(
            candidates.find((candidate) => candidate.id === 2)
          )
        }
      >
        View Candidate
      </button>
    </div>

    <div className="match-card">
      <div className="match-top">
        <div className="match-avatar">A</div>

        <div>
          <h3>Aarushi Sharma</h3>
          <p>Computer Science</p>
        </div>

        <strong className="match-score">91%</strong>
      </div>

      <div className="match-role">
        Best match for:
        <strong> Frontend Developer Intern</strong>
      </div>

      <div className="match-skills">
        <span>React</span>
        <span>JavaScript</span>
        <span>Python</span>
      </div>

      <button
        className="match-profile-button"
        onClick={() =>
          setSelectedCandidate(
            candidates.find((candidate) => candidate.id === 1)
          )
        }
      >
        View Candidate
      </button>
    </div>

    <div className="match-card">
      <div className="match-top">
        <div className="match-avatar">R</div>

        <div>
          <h3>Rahul Verma</h3>
          <p>Information Technology</p>
        </div>

        <strong className="match-score">84%</strong>
      </div>

      <div className="match-role">
        Best match for:
        <strong> Python Backend Developer</strong>
      </div>

      <div className="match-skills">
        <span>Python</span>
        <span>SQL</span>
        <span>Cloud</span>
      </div>

      <button
        className="match-profile-button"
        onClick={() =>
          setSelectedCandidate(
            candidates.find((candidate) => candidate.id === 3)
          )
        }
      >
        View Candidate
      </button>
    </div>

  </div>
</section>

{showPostModal && (
  <div
    className="post-modal-overlay"
    onClick={() => setShowPostModal(false)}
  >
    <form
      className="post-modal"
      onClick={(e) => e.stopPropagation()}
      onSubmit={(e) => {
        e.preventDefault();

        if (!newOpportunity.title.trim()) {
          alert("Please enter an opportunity title.");
          return;
        }

        const opportunity = {
          id: Date.now(),
          ...newOpportunity,
        };

        setPostedOpportunities([
          ...postedOpportunities,
          opportunity,
        ]);

        setNewOpportunity({
          title: "",
          type: "Internship",
          location: "Remote",
          skills: "",
        });

        setShowPostModal(false);
      }}
    >
      <button
        type="button"
        className="post-modal-close"
        onClick={() => setShowPostModal(false)}
      >
        ×
      </button>

      <p className="post-modal-tag">
        CREATE OPPORTUNITY
      </p>

      <h2>Post New Opportunity</h2>

      <label>Opportunity Title</label>
      <input
        type="text"
        placeholder="e.g. React Developer Intern"
        value={newOpportunity.title}
        onChange={(e) =>
          setNewOpportunity({
            ...newOpportunity,
            title: e.target.value,
          })
        }
      />

      <label>Opportunity Type</label>
      <select
        value={newOpportunity.type}
        onChange={(e) =>
          setNewOpportunity({
            ...newOpportunity,
            type: e.target.value,
          })
        }
      >
        <option>Internship</option>
        <option>Job</option>
        <option>Live Project</option>
      </select>

      <label>Location</label>
      <input
        type="text"
        placeholder="Remote / Bengaluru / Hybrid"
        value={newOpportunity.location}
        onChange={(e) =>
          setNewOpportunity({
            ...newOpportunity,
            location: e.target.value,
          })
        }
      />

      <label>Required Skills</label>
      <input
        type="text"
        placeholder="React, JavaScript, CSS"
        value={newOpportunity.skills}
        onChange={(e) =>
          setNewOpportunity({
            ...newOpportunity,
            skills: e.target.value,
          })
        }
      />

      <button
        type="submit"
        className="publish-opportunity-button"
      >
        Publish Opportunity
      </button>
    </form>
  </div>
)}
{selectedCandidate && (
  <div
    className="candidate-modal-overlay"
    onClick={() => setSelectedCandidate(null)}
  >
    <div
      className="candidate-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="candidate-modal-close"
        onClick={() => setSelectedCandidate(null)}
      >
        ×
      </button>

      <div className="candidate-modal-avatar">
        {selectedCandidate.name.charAt(0)}
      </div>

      <h2>{selectedCandidate.name}</h2>

      <p className="candidate-modal-department">
        {selectedCandidate.department}
      </p>

      <div className="candidate-modal-skills">
        {selectedCandidate.skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>

      <div className="candidate-modal-readiness">
        <span>Career Readiness</span>
        <strong>{selectedCandidate.readiness}%</strong>
      </div>

      <div className="candidate-modal-bar">
        <div
          style={{
            width: `${selectedCandidate.readiness}%`,
          }}
        ></div>
      </div>

      <button
        className="candidate-modal-shortlist"
        onClick={() => {
          if (!shortlisted.includes(selectedCandidate.id)) {
            setShortlisted([
              ...shortlisted,
              selectedCandidate.id,
            ]);
          }
        }}
      >
        {shortlisted.includes(selectedCandidate.id)
          ? "Shortlisted ✓"
          : "Shortlist Candidate"}
      </button>
    </div>
  </div>
)}
<section id="opportunities" className="industry-section">
  <div className="industry-section-heading">
    <p>OPPORTUNITY MANAGEMENT</p>
    <h2>Active Opportunities</h2>
    <span>
      Manage internships, jobs and live projects published by your organization.
    </span>
  </div>

  <div className="industry-opportunity-grid">
    <div className="industry-opportunity-card">
      <div className="industry-opportunity-top">
        <span className="industry-opportunity-type">INTERNSHIP</span>
        <span className="industry-opportunity-status">Active</span>
      </div>

      <h3>Frontend Developer Intern</h3>
      <p>React, JavaScript and responsive web development.</p>

      <div className="industry-opportunity-meta">
        <span>24 Applications</span>
        <span>Remote</span>
      </div>

      <button className="manage-opportunity-button">
        Manage Opportunity
      </button>
    </div>

    <div className="industry-opportunity-card">
      <div className="industry-opportunity-top">
        <span className="industry-opportunity-type">JOB</span>
        <span className="industry-opportunity-status">Active</span>
      </div>

      <h3>Python Backend Developer</h3>
      <p>Python, FastAPI, SQL and REST API development.</p>

      <div className="industry-opportunity-meta">
        <span>31 Applications</span>
        <span>Bengaluru</span>
      </div>

      <button className="manage-opportunity-button">
        Manage Opportunity
      </button>
    </div>

    <div className="industry-opportunity-card">
      <div className="industry-opportunity-top">
        <span className="industry-opportunity-type">LIVE PROJECT</span>
        <span className="industry-opportunity-status">Active</span>
      </div>

      <h3>Data Analytics Project</h3>
      <p>SQL, Python, dashboards and business analytics.</p>

      <div className="industry-opportunity-meta">
        <span>18 Applications</span>
        <span>Hybrid</span>
      </div>

      <button className="manage-opportunity-button">
        Manage Opportunity
      </button>
    </div>
    {postedOpportunities.map((opportunity) => (
  <div
    className="industry-opportunity-card"
    key={opportunity.id}
  >
    <div className="industry-opportunity-top">
      <span className="industry-opportunity-type">
        {opportunity.type}
      </span>

      <span className="industry-opportunity-status">
        Active
      </span>
    </div>

    <h3>{opportunity.title}</h3>

    <p>{opportunity.skills}</p>

    <div className="industry-opportunity-meta">
      <span>0 Applications</span>
      <span>{opportunity.location}</span>
    </div>

    <button className="manage-opportunity-button">
      Manage Opportunity
    </button>
  </div>
))}
  </div>

 <button
  className="post-opportunity-button"
  onClick={() => setShowPostModal(true)}
>
  + Post New Opportunity
</button>
</section>
<section id="applications" className="industry-section">
  <div className="industry-section-heading">
    <p>APPLICATION MANAGEMENT</p>
    <h2>Candidate Applications</h2>
    <span>
      Review applicants and update their recruitment status.
    </span>
  </div>

  <div className="applications-table-wrapper">
    <table className="applications-table">
      <thead>
        <tr>
          <th>Candidate</th>
          <th>Opportunity</th>
          <th>Skills</th>
          <th>Readiness</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {[
          {
            id: 1,
            name: "Aarushi Sharma",
            role: "Frontend Developer Intern",
            skills: "React, JavaScript, Python",
            readiness: 86,
          },
          {
            id: 2,
            name: "Sneha Patel",
            role: "Data Analytics Project",
            skills: "Python, SQL, Power BI",
            readiness: 91,
          },
          {
            id: 3,
            name: "Rahul Verma",
            role: "Python Backend Developer",
            skills: "Python, FastAPI, SQL",
            readiness: 78,
          },
        ].map((application) => {
          const status =
            applicationStatus[application.id] || "Pending";

          return (
            <tr key={application.id}>
              <td>
                <div className="application-candidate">
                  <div className="application-avatar">
                    {application.name.charAt(0)}
                  </div>

                  <strong>{application.name}</strong>
                </div>
              </td>

              <td>{application.role}</td>

              <td>{application.skills}</td>

              <td>
                <strong className="application-readiness">
                  {application.readiness}%
                </strong>
              </td>

              <td>
                <span
                  className={`application-status ${status.toLowerCase()}`}
                >
                  {status}
                </span>
              </td>

              <td>
                <div className="application-actions">
                  <button
                    className="shortlist-application"
                    onClick={() =>
                      setApplicationStatus({
                        ...applicationStatus,
                        [application.id]: "Shortlisted",
                      })
                    }
                  >
                    Shortlist
                  </button>

                  <button
                    className="reject-application"
                    onClick={() =>
                      setApplicationStatus({
                        ...applicationStatus,
                        [application.id]: "Rejected",
                      })
                    }
                  >
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</section>
      </main>
    </div>
  );
}

export default IndustryDashboard;