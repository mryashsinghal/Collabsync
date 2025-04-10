import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const demoProjects = [
  { name: "AI Chatbot", description: "A chatbot powered by AI to assist users." },
  { name: "Task Manager", description: "A simple task management app with real-time updates." },
];

const demoUsers = [
  { name: "John Doe", expertise: "Full Stack Developer" },
  { name: "Jane Smith", expertise: "Data Scientist" },
];

const HomePage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = [
    "Collabsync helped me find the perfect team for my startup!",
    "This platform makes project collaboration seamless and efficient!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1f2937", marginBottom: "1.5rem" }}>Welcome to Collabsync</h1>
      <p style={{ color: "#4b5563", fontSize: "1.125rem", marginBottom: "1.5rem" }}>Collaborate and build projects with students from different colleges.</p>
      
      {/* Animated Testimonial Banner */}
      <div style={{ backgroundColor: "#e0f2fe", padding: "1rem", borderRadius: "0.5rem", marginBottom: "1.5rem", textAlign: "center", width: "80%", transition: "opacity 0.5s ease-in-out" }}>
        <p style={{ fontSize: "1rem", fontWeight: "500", color: "#2563eb" }}>{testimonials[currentTestimonial]}</p>
      </div>

      {/* Explore Buttons */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <Link to="/explore-projects">
          <button style={{ padding: "0.5rem 1rem", backgroundColor: "#2563eb", color: "white", borderRadius: "0.5rem", border: "none", cursor: "pointer", transition: "background-color 0.2s" }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#1e40af"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#2563eb"}>
            Explore Projects
          </button>
        </Link>
        <Link to="/explore-users">
          <button style={{ padding: "0.5rem 1rem", backgroundColor: "#059669", color: "white", borderRadius: "0.5rem", border: "none", cursor: "pointer", transition: "background-color 0.2s" }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#047857"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#059669"}>
            Explore Users
          </button>
        </Link>
      </div>

      {/* Demo Projects & Users */}
      <div style={{ display: "flex", gap: "2rem" }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1f2937", marginBottom: "1rem" }}>Demo Projects</h2>
          {demoProjects.map((project, index) => (
            <div key={index} style={{ backgroundColor: "#fff", padding: "1rem", borderRadius: "0.5rem", marginBottom: "0.5rem", boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" }}>
              <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#2563eb" }}>{project.name}</h3>
              <p style={{ color: "#4b5563" }}>{project.description}</p>
            </div>
          ))}
        </div>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1f2937", marginBottom: "1rem" }}>Demo Users</h2>
          {demoUsers.map((user, index) => (
            <div key={index} style={{ backgroundColor: "#fff", padding: "1rem", borderRadius: "0.5rem", marginBottom: "0.5rem", boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" }}>
              <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#059669" }}>{user.name}</h3>
              <p style={{ color: "#4b5563" }}>{user.expertise}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
