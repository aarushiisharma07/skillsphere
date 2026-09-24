function Opportunities() {
  const opportunities = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "TechNova Solutions",
      type: "Internship",
      mode: "Remote",
      skills: ["React", "JavaScript", "HTML", "CSS"],
      duration: "3 Months",
      match: 92,
    },
    {
      id: 2,
      title: "Python Developer Intern",
      company: "DataSphere Labs",
      type: "Internship",
      mode: "Hybrid",
      skills: ["Python", "SQL", "FastAPI"],
      duration: "6 Months",
      match: 86,
    },
    {
      id: 3,
      title: "Software Development Intern",
      company: "InnovateX",
      type: "Internship",
      mode: "On-site",
      skills: ["DSA", "Java", "Python"],
      duration: "4 Months",
      match: 78,
    },
  ];

  return (
    <div className="opportunities-page">

      <div className="opportunities-header">
        <div>
          <span className="opportunities-label">
            CAREER OPPORTUNITIES
          </span>

          <h1>Find Your Next Opportunity</h1>

          <p>
            Discover internships and industry opportunities
            matched to your skills and career interests.
          </p>
        </div>

        <div className="match-summary">
          <span>AI Matching</span>
          <strong>92%</strong>
          <small>Top Match</small>
        </div>
      </div>

      <div className="opportunities-grid">

        {opportunities.map((opportunity) => (

          <div
            className="opportunity-card"
            key={opportunity.id}
          >

            <div className="opportunity-top">

              <div className="company-icon">
                {opportunity.company.charAt(0)}
              </div>

              <span className="match-badge">
                {opportunity.match}% Match
              </span>

            </div>

            <h2>
              {opportunity.title}
            </h2>

            <h3>
              {opportunity.company}
            </h3>

            <div className="opportunity-info">
              <span>{opportunity.type}</span>
              <span>{opportunity.mode}</span>
              <span>{opportunity.duration}</span>
            </div>

            <div className="opportunity-skills">

              {opportunity.skills.map((skill) => (
                <span className="skill-chip" key={skill}>
  {skill}
</span>
              ))}

            </div>

            <button className="apply-button">
              View Opportunity
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Opportunities;