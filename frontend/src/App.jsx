import { useEffect, useState } from "react";
import "./App.css";
import SkillAssessment from "./SkillAssessment";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import InstitutionDashboard from "./pages/InstitutionDashboard";
import IndustryDashboard from "./pages/IndustryDashboard";
const API = "http://127.0.0.1:8000";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
const [userRole, setUserRole] = useState("student");
  const [dashboard, setDashboard] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [appliedOpportunities, setAppliedOpportunities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [courseSearch, setCourseSearch] = useState("");
  const [opportunitySearch, setOpportunitySearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  useEffect(() => {
    async function loadData() {
      try {
        const dashboardResponse = await fetch(
          `${API}/dashboard`
        );

        const opportunityResponse = await fetch(
          `${API}/opportunities`
        );

        const courseResponse = await fetch(
          `${API}/courses`
        );

        const dashboardData =
          await dashboardResponse.json();

        const opportunityData =
          await opportunityResponse.json();

        const courseData =
          await courseResponse.json();

        setDashboard(dashboardData);

        setOpportunities(
          opportunityData.opportunities || []
        );

        setCourses(
          courseData.courses || []
        );
      } catch (error) {
        console.error(
          "Backend connection error:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);
  if (!loggedIn) {
  return (
    <Login
      onLogin={(role) => {
        setUserRole(role);
        setLoggedIn(true);
      }}
    />
  );
}  

  if (loading) {
    return (
      <div className="loading">
        Loading SkillSphere...
      </div>
    );
  }

  const filteredCourses = courses.filter((course) =>
    `${course.title} ${course.skill} ${course.platform}`
      .toLowerCase()
      .includes(courseSearch.toLowerCase())
  );

  const filteredOpportunities = opportunities.filter(
    (opportunity) =>
      `${opportunity.title} ${opportunity.company} ${opportunity.type} ${opportunity.location} ${opportunity.skills.join(
        " "
      )}`
        .toLowerCase()
        .includes(
          opportunitySearch.toLowerCase()
        )
  );

  const handleApply = async (opportunity) => {
    if (
      appliedOpportunities.includes(
        opportunity.id
      )
    ) {
      alert(
        "You have already applied for this opportunity."
      );
      return;
    }

    try {
      const response = await fetch(
        `${API}/apply/${opportunity.id}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      alert(data.message);

      setAppliedOpportunities((previous) => [
        ...previous,
        opportunity.id,
      ]);
    } catch (error) {
      console.error(
        "Application error:",
        error
      );

      alert(
        "Unable to apply right now. Please try again."
      );
    }
  };

  const handleStartLearning = (course) => {
    if (course.url) {
      window.open(course.url, "_blank");
    } else {
      alert(
        `Course selected: ${course.title}\n\nPlatform: ${course.platform}`
      );
    }
  };
if (userRole === "institution") {
  return (
    <InstitutionDashboard
      onLogout={() => {
        setLoggedIn(false);
        setUserRole("student");
      }}
    />
  );
}
if (userRole === "industry") {
  return (
    <IndustryDashboard
      onLogout={() => {
        setLoggedIn(false);
        setUserRole("student");
      }}
    />
  );
}
  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
       <div className="logo">
  <div>SkillSphere</div>
  <small>
    {userRole === "student"
      ? "Student"
      : userRole === "industry"
      ? "Industry"
      : "Institution"}
  </small>
</div>

        <div className="nav-links">
  <a href="#dashboard">Dashboard</a>
  <a href="#skills">Skills</a>
  <a href="#assessment">Assessment</a>
  <a href="#learning">Learning</a>
  <a href="#opportunities">
    Opportunities
  </a>
  <a href="#profile">Profile</a>

  <button
    className="logout-button"
    onClick={() => {
      setLoggedIn(false);
      setUserRole("student");
    }}
  >
    Logout
  </button>
</div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <p className="tag">
            AI-POWERED CAREER PLATFORM
          </p>

          <h1>
            Build Skills.
            <br />
            Match Opportunities.
            <br />
            Build Your Career.
          </h1>

          <p className="hero-text">
            SkillSphere connects students,
            institutions and industry through
            skill mapping, learning,
            internships and career opportunities.
          </p>

          <button
            className="primary-button"
            onClick={() => {
              document
                .getElementById(
                  "opportunities"
                )
                ?.scrollIntoView({
                  behavior: "smooth",
                });
            }}
          >
            Explore Opportunities →
          </button>
        </div>
      </section>

      {/* DASHBOARD */}
      {dashboard && (
        <section
          className="section"
          id="dashboard"
        >
          <div className="section-heading">
            <p className="tag">
              STUDENT DASHBOARD
            </p>

            <h2>
              Your Career Readiness
            </h2>
          </div>

          <div className="stats-grid">

            <div className="stat-card">
              <span>
                Skill Readiness
              </span>

              <strong>
                {dashboard.skill_readiness}%
              </strong>
            </div>

            <div className="stat-card">
              <span>Skills</span>

              <strong>
                {dashboard.skills_count}
              </strong>
            </div>

            <div className="stat-card">
              <span>
                Applications
              </span>

              <strong>
                {dashboard.applications}
              </strong>
            </div>

            <div className="stat-card">
              <span>
                Matched Opportunities
              </span>

              <strong>
                {dashboard.matched_opportunities}
              </strong>
            </div>

          </div>
        </section>
      )}

      {/* SKILL GAP */}
      {dashboard && (
        <section
          className="section"
          id="skills"
        >
          <div className="section-heading">
            <p className="tag">
              AI INSIGHTS
            </p>

            <h2>
              Your Skill Gap
            </h2>
          </div>

          <div className="skills-container">
            {dashboard.skill_gap.map(
              (skill) => (
                <div
                  className="skill-card"
                  key={skill.skill}
                >
                  <div className="skill-header">
                    <span>
                      {skill.skill}
                    </span>

                    <strong>
                      {skill.score}%
                    </strong>
                  </div>

                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${skill.score}%`,
                      }}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* SKILL ASSESSMENT */}
      <section
        id="assessment"
        className="section"
      >
        <SkillAssessment />
      </section>

      {/* LEARNING */}
      <section
        className="section"
        id="learning"
      >
        <div className="section-heading">
          <p className="learning-tag">PERSONALIZED LEARNING</p>
        
          <h2>
            Recommended Learning
          </h2>

          <p>
            Improve the skills identified
            in your skill-gap analysis.
          </p>
        </div>

        {/* COURSE SEARCH */}
        <div
  className="learning-search"
  style={{
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "32px auto 30px",
  }}
>
        <input
  type="text"
  placeholder="Search courses or skills..."
  value={courseSearch}
  onChange={(e) => setCourseSearch(e.target.value)}
  style={{
    width: "100%",
    maxWidth: "560px",
    height: "54px",
    padding: "0 20px",
    background: "#111c30",
    color: "#ffffff",
    border: "1px solid #334a6b",
    borderRadius: "14px",
    fontSize: "15px",
    fontFamily: "inherit",
    outline: "none",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.22)",
  }}
/>
        </div>

        <div className="cards-grid">
          {filteredCourses.length === 0 ? (
            <p className="no-results">
              No courses found. Try another
              search.
            </p>
          ) : (
            filteredCourses.map((course) => (
              <div
                className="course-card"
                key={course.title}
              >
                <span className="badge">
                  {course.level}
                </span>

                <h3>
                  {course.title}
                </h3>

                <p>
                  Skill: {course.skill}
                </p>

                <p>
                  Platform: {course.platform}
                </p>

                <button
                  className="secondary-button"
                  onClick={() =>
                    handleStartLearning(course)
                  }
                >
                  Start Learning →
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* OPPORTUNITIES */}
      <section
        className="section"
        id="opportunities"
      >
        <div className="section-heading">
          <p className="tag">
            CAREER MATCHING
          </p>

          <h2>
            Recommended Opportunities
          </h2>

          <p>
            Opportunities matched with your
            current skill profile.
          </p>
        </div>

        {/* OPPORTUNITY SEARCH */}
        <div className="opportunity-search">
        <input
  type="text"
  placeholder="Search opportunities, companies or skills..."
  value={opportunitySearch}
  onChange={(e) => setOpportunitySearch(e.target.value)}
  className="opportunity-search-input"
  style={{
    width: "100%",
    maxWidth: "560px",
    height: "54px",
    display: "block",
    margin: "32px auto 20px",
    padding: "0 20px",
    background: "#111c30",
    color: "#ffffff",
    border: "1px solid #334a6b",
    borderRadius: "14px",
    fontSize: "15px",
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
    boxShadow: "0 10px 30px rgba(0,0,0,0.22)",
  }}
/> 
        </div>

       <div className="cards-grid opportunities-grid">
          {filteredOpportunities.length ===
          0 ? (
            <p className="no-results">
              No opportunities found. Try
              another search.
            </p>
          ) : (
            filteredOpportunities.map(
              (opportunity) => (
                <div
                  className="opportunity-card"
                  key={opportunity.id}
                >
                  <div className="opportunity-top">
                    <span className="badge">
                      {opportunity.type}
                    </span>

                    <span>
                      {opportunity.location}
                    </span>
                  </div>

                  <h3>
                    {opportunity.title}
                  </h3>

                  <p className="company">
                    {opportunity.company}
                  </p>

                  <div className="skill-tags">
                    {opportunity.skills.map(
                      (skill) => (
                        <span key={skill}>
                          {skill}
                        </span>
                      )
                    )}
                  </div>

                 <button
  className="primary-button"
  disabled={appliedOpportunities.includes(opportunity.id)}
  onClick={() => setSelectedOpportunity(opportunity)}
>
  {appliedOpportunities.includes(opportunity.id)
    ? "Applied ✓"
    : "Apply Now"}
</button>
                </div>
              )
            )
          )}
        </div>
      </section>
      {selectedOpportunity && (
  <div
    className="apply-modal-overlay"
    onClick={() => setSelectedOpportunity(null)}
  >
    <div
      className="apply-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="modal-close"
        onClick={() => setSelectedOpportunity(null)}
      >
        ×
      </button>

      <p className="modal-tag">APPLICATION</p>

      <h2>{selectedOpportunity.title}</h2>

      <p className="modal-company">
        {selectedOpportunity.company}
      </p>

      <div className="modal-details">
        <span>{selectedOpportunity.type}</span>
        <span>{selectedOpportunity.location}</span>
      </div>

      <p className="modal-message">
        Confirm that you want to apply for this opportunity.
      </p>

      <div className="modal-actions">
        <button
          className="modal-cancel"
          onClick={() => setSelectedOpportunity(null)}
        >
          Cancel
        </button>

        <button
          className="modal-submit"
          onClick={async () => {
            await handleApply(selectedOpportunity);
            setSelectedOpportunity(null);
          }}
        >
          Submit Application
        </button>
      </div>
    </div>
  </div>
)}
      {/* PROFILE */}
      <section id="profile">
        <Profile
          applications={
            appliedOpportunities.length
          }
        />
        <div className="profile-stat">
  <h3>{appliedOpportunities.length}</h3>
  <p>Applications</p>
</div>
      </section>

      {/* FOOTER */}
      <footer className="app-footer">
        <div>
          <strong>
            SkillSphere
          </strong>

          <span>
            AI-powered career & skill
            development platform
          </span>
        </div>

        <p>
          © 2026 SkillSphere. Built for
          students and professionals.
        </p>
      </footer>

    </div>
  );
}

export default App;