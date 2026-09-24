import { useState } from "react";
import "./SkillAssessment.css";

function SkillAssessment() {
  const [skills, setSkills] = useState({
    Python: 60,
    SQL: 45,
    React: 55,
    DSA: 40,
  });

  const [submitted, setSubmitted] = useState(false);

  const updateSkill = (skill, value) => {
    setSkills((prev) => ({
      ...prev,
      [skill]: Number(value),
    }));

    setSubmitted(false);
  };

  const skillEntries = Object.entries(skills);

  const average = Math.round(
    skillEntries.reduce((sum, [, value]) => sum + value, 0) /
      skillEntries.length
  );

  const strongestSkill = skillEntries.reduce((best, current) =>
    current[1] > best[1] ? current : best
  );

  const weakestSkill = skillEntries.reduce((weakest, current) =>
    current[1] < weakest[1] ? current : weakest
  );

  const getLevel = (score) => {
    if (score >= 80) return "Advanced";
    if (score >= 60) return "Intermediate";
    if (score >= 40) return "Beginner";
    return "Needs Improvement";
  };

  const getIcon = (skill) => {
    const icons = {
      Python: "🐍",
      SQL: "🗄️",
      React: "⚛️",
      DSA: "🧠",
    };

    return icons[skill] || "💻";
  };

  return (
    <div className="assessment-page">

      {/* HEADER */}
      <div className="assessment-header">
        <span className="assessment-label">
          SKILL INTELLIGENCE
        </span>

        <h1>Skill Assessment</h1>

        <p>
          Evaluate your current technical skills and identify
          areas that need improvement.
        </p>
      </div>

      {/* READINESS */}
      <div className="readiness-card">
        <span>Overall Readiness</span>

        <strong>{average}%</strong>

        <small>{getLevel(average)}</small>
      </div>

      {/* SKILLS */}
      <div className="assessment-skills">

        {skillEntries.map(([skill, score]) => (
          <div className="assessment-skill-card" key={skill}>

            <div className="skill-top">

              <div className="skill-icon">
                {getIcon(skill)}
              </div>

              <div className="skill-title">
                <h3>{skill}</h3>

                <span className={`skill-level level-${getLevel(score)
                  .toLowerCase()
                  .replace(" ", "-")}`}>
                  {getLevel(score)}
                </span>
              </div>

              <strong className="skill-score">
                {score}%
              </strong>

            </div>

            {/* PROGRESS */}
            <div className="assessment-progress">
              <div
                className="assessment-progress-fill"
                style={{ width: `${score}%` }}
              ></div>
            </div>

            {/* SLIDER */}
            <input
              type="range"
              min="0"
              max="100"
              value={score}
              onChange={(e) =>
                updateSkill(skill, e.target.value)
              }
              className="skill-slider"
            />

            <div className="slider-labels">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>

          </div>
        ))}

      </div>

      {/* SUBMIT */}
      <button
        className="assessment-submit"
        onClick={() => setSubmitted(true)}
      >
        Analyze My Skills
      </button>

      {/* ANALYSIS */}
      {submitted && (
        <div className="analysis-result">

          <div className="analysis-heading">
            <span>YOUR RESULTS</span>
            <h2>Skill Gap Analysis</h2>
          </div>

          <div className="analysis-items">

            {skillEntries.map(([skill, score]) => (
              <div className="analysis-item" key={skill}>
                <span>{skill}</span>

                <strong>{score}%</strong>

                <small>
                  {score >= 60
                    ? "Good foundation"
                    : "Needs improvement"}
                </small>
              </div>
            ))}

            <div className="analysis-item">
              <span>Strongest Skill</span>
              <strong>{strongestSkill[0]}</strong>
              <small>{strongestSkill[1]}%</small>
            </div>

            <div className="analysis-item">
              <span>Weakest Skill</span>
              <strong>{weakestSkill[0]}</strong>
              <small>{weakestSkill[1]}%</small>
            </div>

          </div>

        </div>
      )}

      {/* RECOMMENDATION */}
      <div className="recommendation-card">

        <span>RECOMMENDED FOCUS</span>

        <h2>
          Improve {weakestSkill[0]}
        </h2>

        <p>
          Based on your current assessment, focusing on{" "}
          <strong>{weakestSkill[0]}</strong> can help
          strengthen your overall technical profile.
        </p>

      </div>

    </div>
  );
}

export default SkillAssessment;
