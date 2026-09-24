import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("aarushi@example.com");
const [password, setPassword] = useState("123456");
 const handleRoleSelect = (selectedRole) => {
  setRole(selectedRole);

  if (selectedRole === "student") {
    setEmail("aarushi@example.com");
    setPassword("123456");
  }

  if (selectedRole === "industry") {
    setEmail("industry@example.com");
    setPassword("123456");
  }

  if (selectedRole === "institution") {
    setEmail("institution@skillsphere.com");
    setPassword("admin123");
  }
};
const handleLogin = async (event) => {
    event.preventDefault();

   

    try {
      const response = await 
      fetch("https://skillsphere-t975.onrender.com/login",
        
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            role,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      onLogin(data.role);
    } catch (error) {
      console.error("Login error:", error);
      alert(
        "Unable to connect to SkillSphere server."
      );
    }
  };

  return (
    <div className="login-page">

      <div className="login-background-glow glow-one"></div>
      <div className="login-background-glow glow-two"></div>

      <div className="login-card">

        {/* BRAND */}
        <div className="login-brand">
          <div className="login-logo">S</div>

          <div>
            <h2>SkillSphere</h2>
            <span>
              Career Intelligence Platform
            </span>
          </div>
        </div>

        {/* HEADING */}
        <div className="login-heading">
          <span className="login-eyebrow">
            WELCOME BACK
          </span>

          <h1>
            Build your skills.
            <br />
            Shape your <span>future.</span>
          </h1>

          <p>
            Sign in to continue your personalized
            learning and career journey.
          </p>
        </div>

        {/* FORM */}
        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          <div className="input-group">
            <label htmlFor="email">
              Email address
            </label>

            <input

              id="email"
              name="email"
              value={email}
onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              defaultValue="aarushi@example.com"
              required
            />
          </div>

          <div className="input-group">
            <div className="password-label">
              <label htmlFor="password">
                Password
              </label>

              <span>
                Secure login
              </span>
            </div>

            <input
              id="password"
              name="password"
              value={password}
onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              defaultValue="123456"
              required
            />
          </div>

          {/* ROLE */}
          <div className="role-section">

            <div className="role-heading">
              <label>
                Continue as
              </label>

              <span>
                Select your role
              </span>
            </div>

            <div className="role-grid">

              <button
                type="button"
                className={
                  role === "student"
                    ? "role-card active"
                    : "role-card"
                }
                 onClick={() =>
                  handleRoleSelect("student")
                }
              >
                <div className="role-icon">
                  🎓
                </div>

                <div>
                  <strong>Student</strong>
                  <span>
                    Learn & grow
                  </span>
                </div>
              </button>

              <button
                type="button"
                className={
                  role === "industry"
                    ? "role-card active"
                    : "role-card"
                }
                onClick={() =>
                  handleRoleSelect("industry")
                }
              >
                <div className="role-icon">
                  🏢
                </div>

                <div>
                  <strong>Industry</strong>
                  <span>
                    Hire talent
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect("institution")}
                className={
                  role === "institution"
                    ? "role-card active"
                    : "role-card"
                }
             
                
              >
                <div className="role-icon">
                  🏫
                </div>

                <div>
                  <strong>Institution</strong>
                  <span>
                    Manage talent
                  </span>
                </div>
              </button>

            </div>
          </div>

          <button
            className="login-submit"
            type="submit"
          >
            <span>Sign in to SkillSphere</span>
            <strong>→</strong>
          </button>
          <p className="demo-note">
  Demo mode: Select a role to autofill test credentials.
</p>
        </form>

        {/* FOOTER */}
        <div className="login-bottom">
          <span className="security-dot"></span>

          <span>
            Secure prototype access
          </span>

          <span className="separator">•</span>

          <span>
            SkillSphere
          </span>
        </div>

      </div>

    </div>
  );
}

export default Login;