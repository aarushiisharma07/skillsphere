import { useState } from "react";
import "./InstitutionDashboard.css";


function InstitutionDashboard({ onLogout }) {
    const [studentSearch, setStudentSearch] = useState("");
  const students = [
  {
    id: 1,
    name: "Aarushi Sharma",
    department: "Computer Science",
    skills: "React, Python, SQL",
    readiness: 86,
    status: "Placement Ready",
  },
  
  {
    id: 2,
    name: "Rahul Verma",
    department: "Information Technology",
    skills: "Java, SQL, Cloud",
    readiness: 78,
    status: "Almost Ready",
  },
  {
    id: 3,
    name: "Sneha Patel",
    department: "Data Science",
    skills: "Python, Power BI, SQL",
    readiness: 91,
    status: "Placement Ready",
  },
  {
    id: 4,
    name: "Arjun Mehta",
    department: "Computer Science",
    skills: "JavaScript, React, Node.js",
    readiness: 72,
    status: "Needs Upskilling",
  },
  {
    id: 5,
    name: "Priya Nair",
    department: "Electronics",
    skills: "Python, IoT, Data Analytics",
    readiness: 81,
    status: "Placement Ready",
  },
];  
const filteredStudents = students.filter((student) =>
  `${student.name} ${student.department} ${student.skills} ${student.status}`
    .toLowerCase()
    .includes(studentSearch.toLowerCase())
);
  return (
    <div className="institution-page">

      <nav className="institution-navbar">
        <div>
          <h2>SkillSphere</h2>
          <span>INSTITUTION</span>
        </div>

        <div className="institution-nav-links">
          <a href="#institution-dashboard">Dashboard</a>
          <a href="#students">Students</a>
          <a href="#analytics">Skill Analytics</a>
          <a href="#programs">Programs</a>
          <a href="#placements">Placements</a>
          <button
  className="institution-logout"
  onClick={onLogout}
>
  Logout
</button>
        </div>
      </nav>

      <main id="institution-dashboard" className="institution-dashboard">

        <div className="institution-heading">
          <p>INSTITUTION INTELLIGENCE</p>

          <h1>Institution Dashboard</h1>

          <span>
            Monitor student skills, readiness, programs and placement outcomes.
          </span>
        </div>

        <div className="institution-stats">

          <div className="institution-stat-card">
            <span>Total Students</span>
            <h2>1,240</h2>
            <p>Active learners</p>
          </div>

          <div className="institution-stat-card">
            <span>Placement Ready</span>
            <h2>78%</h2>
            <p>Based on skill readiness</p>
          </div>

          <div className="institution-stat-card">
            <span>Skill Programs</span>
            <h2>34</h2>
            <p>Active learning programs</p>
          </div>

          <div className="institution-stat-card">
            <span>Opportunities</span>
            <h2>126</h2>
            <p>Industry opportunities</p>
          </div>

        </div>

        <div className="institution-content-grid">

          <section className="institution-panel" id="readiness-overview">
            <p className="panel-label">STUDENT READINESS</p>
            <h2>Skill Readiness</h2>

            <div className="skill-progress">
              <div>
                <span>Technical Skills</span>
                <strong>82%</strong>
              </div>
              <progress value="82" max="100"></progress>
            </div>

            <div className="skill-progress">
              <div>
                <span>Communication</span>
                <strong>74%</strong>
              </div>
              <progress value="74" max="100"></progress>
            </div>

            <div className="skill-progress">
              <div>
                <span>Problem Solving</span>
                <strong>80%</strong>
              </div>
              <progress value="80" max="100"></progress>
            </div>

            <div className="skill-progress">
              <div>
                <span>Industry Readiness</span>
                <strong>68%</strong>
              </div>
              <progress value="68" max="100"></progress>
            </div>
          </section>

          <section className="institution-panel">
            <p className="panel-label">SKILL INSIGHTS</p>
            <h2>Top Skill Gaps</h2>

            <div className="gap-item">
              <span>Advanced Python</span>
              <strong>42%</strong>
            </div>

            <div className="gap-item">
              <span>SQL & Data Analytics</span>
              <strong>36%</strong>
            </div>

            <div className="gap-item">
              <span>React Development</span>
              <strong>31%</strong>
            </div>

            <div className="gap-item">
              <span>Cloud Fundamentals</span>
              <strong>27%</strong>
            </div>
          </section>

        </div>
    <section id="students" className="institution-students">
  <div className="students-heading">
    <div>
      <p className="panel-label">STUDENT TALENT</p>
      <h2>Student Readiness</h2>
      <span>
        Monitor student skills and placement readiness.
      </span>
    </div>

   <input
  type="text"
  placeholder="Search students, department or skills..."
  className="student-search"
  value={studentSearch}
  onChange={(e) => setStudentSearch(e.target.value)}
/>
  </div>

  <div className="students-table-wrapper">
    <table className="students-table">
      <thead>
        <tr>
          <th>Student</th>
          <th>Department</th>
          <th>Top Skills</th>
          <th>Readiness</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {filteredStudents.length === 0 && (
  <tr>
    <td colSpan="5" className="students-empty">
      No students found. Try another search.
    </td>
  </tr>
)}
       {filteredStudents.map((student) => (
          <tr key={student.id}>
            <td>
              <div className="student-name">
                <div className="student-avatar">
                  {student.name.charAt(0)}
                </div>

                <span>{student.name}</span>
              </div>
            </td>

            <td>{student.department}</td>

            <td>{student.skills}</td>

            <td>
              <div className="readiness-cell">
                <span>{student.readiness}%</span>

                <div className="readiness-bar">
                  <div
                    style={{
                      width: `${student.readiness}%`,
                    }}
                  ></div>
                </div>
              </div>
            </td>

            <td>
              <span
                className={`student-status ${
                  student.readiness >= 80
                    ? "ready"
                    : student.readiness >= 75
                    ? "almost"
                    : "upskill"
                }`}
              >
                {student.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>
<section id="programs" className="institution-programs">
  <div className="section-heading">
    <p className="panel-label">LEARNING PROGRAMS</p>
    <h2>Active Skill Programs</h2>
    <span>
      Track institutional learning initiatives and student participation.
    </span>
  </div>

  <div className="program-grid">
    <div className="program-card">
      <span className="program-badge">ACTIVE</span>
      <h3>Full Stack Development</h3>
      <p>React, Node.js, APIs and databases</p>

      <div className="program-info">
        <span>240 Students</span>
        <strong>82% Complete</strong>
      </div>
    </div>

    <div className="program-card">
      <span className="program-badge">ACTIVE</span>
      <h3>Data Analytics</h3>
      <p>Python, SQL, Power BI and analytics</p>

      <div className="program-info">
        <span>185 Students</span>
        <strong>76% Complete</strong>
      </div>
    </div>

    <div className="program-card">
      <span className="program-badge">ACTIVE</span>
      <h3>Cloud Fundamentals</h3>
      <p>Cloud architecture and deployment fundamentals</p>

      <div className="program-info">
        <span>132 Students</span>
        <strong>68% Complete</strong>
      </div>
    </div>
  </div>
</section>
<section id="analytics" className="institution-analytics">
  <div className="section-heading">
    <p className="panel-label">SKILL ANALYTICS</p>
    <h2>Department Skill Performance</h2>
    <span>
      Compare student readiness and identify high-demand skill areas.
    </span>
  </div>

  <div className="analytics-grid">
    <div className="analytics-panel">
      <h3>Department Readiness</h3>

      <div className="analytics-row">
        <div className="analytics-row-top">
          <span>Computer Science</span>
          <strong>84%</strong>
        </div>
        <div className="analytics-bar">
          <div style={{ width: "84%" }}></div>
        </div>
      </div>

      <div className="analytics-row">
        <div className="analytics-row-top">
          <span>Data Science</span>
          <strong>91%</strong>
        </div>
        <div className="analytics-bar">
          <div style={{ width: "91%" }}></div>
        </div>
      </div>

      <div className="analytics-row">
        <div className="analytics-row-top">
          <span>Information Technology</span>
          <strong>78%</strong>
        </div>
        <div className="analytics-bar">
          <div style={{ width: "78%" }}></div>
        </div>
      </div>

      <div className="analytics-row">
        <div className="analytics-row-top">
          <span>Electronics</span>
          <strong>81%</strong>
        </div>
        <div className="analytics-bar">
          <div style={{ width: "81%" }}></div>
        </div>
      </div>
    </div>

    <div className="analytics-panel">
      <h3>Top Skills Across Students</h3>

      <div className="skill-analytics-item">
        <div>
          <span>Python</span>
          <small>High demand</small>
        </div>
        <strong>88%</strong>
      </div>

      <div className="skill-analytics-item">
        <div>
          <span>SQL</span>
          <small>Data & backend</small>
        </div>
        <strong>82%</strong>
      </div>

      <div className="skill-analytics-item">
        <div>
          <span>React</span>
          <small>Frontend development</small>
        </div>
        <strong>74%</strong>
      </div>

      <div className="skill-analytics-item">
        <div>
          <span>Cloud</span>
          <small>Infrastructure</small>
        </div>
        <strong>66%</strong>
      </div>
    </div>
  </div>
</section>
<section id="placements" className="institution-placements">
  <div className="section-heading">
    <p className="panel-label">PLACEMENT INTELLIGENCE</p>
    <h2>Placement Overview</h2>
    <span>
      Track placement performance, recruiters and recent student outcomes.
    </span>
  </div>

  <div className="placement-stats">
    <div className="placement-stat-card">
      <span>Students Placed</span>
      <h3>842</h3>
      <p>This academic year</p>
    </div>

    <div className="placement-stat-card">
      <span>Placement Rate</span>
      <h3>81%</h3>
      <p>Eligible students placed</p>
    </div>

    <div className="placement-stat-card">
      <span>Active Recruiters</span>
      <h3>68</h3>
      <p>Industry partners</p>
    </div>

    <div className="placement-stat-card">
      <span>Average Readiness</span>
      <h3>79%</h3>
      <p>Across eligible students</p>
    </div>
  </div>

  <div className="placement-content-grid">
    <div className="institution-panel">
      <p className="panel-label">RECENT OUTCOMES</p>
      <h2>Recent Placements</h2>

      <div className="placement-row">
        <div>
          <strong>Aarushi Sharma</strong>
          <span>Frontend Developer</span>
        </div>
        <div>
          <strong>TechNova</strong>
          <span>₹8.5 LPA</span>
        </div>
      </div>

      <div className="placement-row">
        <div>
          <strong>Sneha Patel</strong>
          <span>Data Analyst</span>
        </div>
        <div>
          <strong>DataWorks</strong>
          <span>₹9.2 LPA</span>
        </div>
      </div>

      <div className="placement-row">
        <div>
          <strong>Rahul Verma</strong>
          <span>Backend Developer</span>
        </div>
        <div>
          <strong>CloudCore</strong>
          <span>₹7.8 LPA</span>
        </div>
      </div>
    </div>

    <div className="institution-panel">
      <p className="panel-label">RECRUITER NETWORK</p>
      <h2>Top Recruiters</h2>

      <div className="recruiter-item">
        <span>TechNova</span>
        <strong>42 Hires</strong>
      </div>

      <div className="recruiter-item">
        <span>DataWorks</span>
        <strong>35 Hires</strong>
      </div>

      <div className="recruiter-item">
        <span>CloudCore</span>
        <strong>28 Hires</strong>
      </div>

      <div className="recruiter-item">
        <span>Innovate Labs</span>
        <strong>24 Hires</strong>
      </div>
    </div>
  </div>
</section>
      </main>
    </div>
  );
}

export default InstitutionDashboard;