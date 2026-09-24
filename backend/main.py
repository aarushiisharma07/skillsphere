from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI(
    title="SkillSphere API",
    description="AI-powered Academia-Industry Skill Platform",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://skillsphere.vercel.app",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# DATA MODELS
# -----------------------------

class StudentProfile(BaseModel):
    name: str
    degree: str
    skills: List[str]
    interests: List[str]


class Assessment(BaseModel):
    student_name: str
    python: int
    sql: int
    react: int
    dsa: int

class LoginRequest(BaseModel):
    email: str
    password: str
    role: str    

# -----------------------------
# LOGIN USERS
# -----------------------------

users = [
    {
    "email": "institution@skillsphere.com",
    "password": "admin123",
    "role": "institution"
},
    {
        
        "email": "aarushi@example.com",
        "password": "123456",
        "role": "student"
    },
    {
        "email": "industry@example.com",
        "password": "123456",
        "role": "industry"
    },
    {
        "email": "admin@example.com",
        "password": "123456",
        "role": "admin"
    }
]


# -----------------------------
# SAMPLE DATA
# -----------------------------

opportunities = [
    {
        "id": 1,
        "title": "Frontend Developer Intern",
        "company": "Tech Innovations",
        "type": "Internship",
        "skills": ["React", "JavaScript", "HTML", "CSS"],
        "location": "Remote",
    },
    {
        "id": 2,
        "title": "Python Developer Intern",
        "company": "AI Solutions",
        "type": "Internship",
        "skills": ["Python", "FastAPI", "SQL"],
        "location": "Bengaluru",
    },
    {
        "id": 3,
        "title": "Data Analyst Intern",
        "company": "DataWorks",
        "type": "Internship",
        "skills": ["Python", "SQL", "Excel"],
        "location": "Remote",
    },
    {
        "id": 4,
        "title": "Software Development Intern",
        "company": "FutureTech",
        "type": "Live Project",
        "skills": ["Python", "DSA", "React"],
        "location": "Hybrid",
    },
]


courses = [
    {
        "title": "Advanced Python",
        "platform": "Learning Platform",
        "skill": "Python",
        "level": "Intermediate",
    },
    {
        "title": "SQL for Data Analysis",
        "platform": "Learning Platform",
        "skill": "SQL",
        "level": "Beginner",
    },
    {
        "title": "React Fundamentals",
        "platform": "Learning Platform",
        "skill": "React",
        "level": "Beginner",
    },
    {
        "title": "Data Structures & Algorithms",
        "platform": "Learning Platform",
        "skill": "DSA",
        "level": "Intermediate",
    },
]

# -----------------------------
# LOGIN
# -----------------------------

@app.post("/login")
def login(data: LoginRequest):

    for user in users:

     if (
    user["email"].strip().lower() == data.email.strip().lower()
    and user["password"] == data.password
    and user["role"].strip().lower() == data.role.strip().lower()
):   
            return {
                "success": True,
                "message": "Login successful",
                "email": user["email"],
                "role": user["role"]
            }

    return {
        "success": False,
        "message": "Invalid email, password or role"
    }
# -----------------------------
# HOME
# -----------------------------

@app.get("/")
def home():
    return {
        "message": "Welcome to SkillSphere API",
        "status": "running"
    }


# -----------------------------
# STUDENT PROFILE
# -----------------------------

@app.post("/profile")
def create_profile(profile: StudentProfile):

    return {
        "message": "Profile created successfully",
        "profile": profile
    }


# -----------------------------
# SKILL GAP ANALYSIS
# -----------------------------

@app.post("/skill-gap")
def skill_gap(assessment: Assessment):

    skills = {
        "Python": assessment.python,
        "SQL": assessment.sql,
        "React": assessment.react,
        "DSA": assessment.dsa
    }

    gaps = []

    for skill, score in skills.items():

        if score < 50:
            level = "Needs Improvement"
            gaps.append(skill)

        elif score < 75:
            level = "Developing"

        else:
            level = "Strong"

        skills[skill] = {
            "score": score,
            "level": level
        }

    readiness = round(sum(
        item["score"] for item in skills.values()
    ) / len(skills))

    return {
        "readiness": readiness,
        "skills": skills,
        "skill_gaps": gaps
    }


# -----------------------------
# LEARNING RECOMMENDATIONS
# -----------------------------

@app.get("/courses")
def get_courses():

    return {
        "courses": courses
    }


# -----------------------------
# OPPORTUNITY MATCHING
# -----------------------------

@app.get("/opportunities")
def get_opportunities():

    return {
        "opportunities": opportunities
    }


# -----------------------------
# MATCH STUDENT WITH OPPORTUNITIES
# -----------------------------

@app.post("/match")
def match_student(profile: StudentProfile):

    student_skills = {
        skill.lower()
        for skill in profile.skills
    }

    results = []

    for opportunity in opportunities:

        required = {
            skill.lower()
            for skill in opportunity["skills"]
        }

        matched = student_skills.intersection(required)

        if required:
            score = round(
                len(matched) / len(required) * 100
            )
        else:
            score = 0

        results.append({
            **opportunity,
            "match_score": score,
            "matched_skills": list(matched)
        })

    results.sort(
        key=lambda x: x["match_score"],
        reverse=True
    )

    return {
        "matches": results
    }


# -----------------------------
# APPLICATION
# -----------------------------

@app.post("/apply/{opportunity_id}")
def apply(opportunity_id: int):

    return {
        "message": "Application submitted successfully",
        "opportunity_id": opportunity_id,
        "status": "Applied"
    }


# -----------------------------
# DASHBOARD
# -----------------------------

@app.get("/dashboard")
def dashboard():

    return {
        "skill_readiness": 72,
        "skills_count": 8,
        "applications": 3,
        "matched_opportunities": 12,

        "skill_gap": [
            {
                "skill": "Python",
                "score": 70
            },
            {
                "skill": "SQL",
                "score": 50
            },
            {
                "skill": "React",
                "score": 30
            },
            {
                "skill": "DSA",
                "score": 61
            }
        ]
    }


# -----------------------------
# RUNNING CHECK
# -----------------------------

@app.get("/health")
def health():

    return {
        "status": "healthy",
        "service": "SkillSphere backend"
    }