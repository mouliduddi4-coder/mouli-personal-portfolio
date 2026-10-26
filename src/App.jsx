
import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Java",
    "Python",
  ];

  const projects = [
    {
      title: "Personal Portfolio Website",
      description:
        "A full-stack website to showcase my profile, skills, projects, education, and achievements.",
      tech: "React.js • Node.js • MongoDB",
    },
    {
      title: "Smart Parking System",
      description:
        "A project concept for organizing parking spaces and tracking parking availability.",
      tech: "Python • IoT",
    },
    {
      title: "IoT Home Automation",
      description:
        "A project concept for monitoring and controlling home appliances using IoT technology.",
      tech: "IoT • Embedded Systems",
    },
  ];

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("");
    setSending(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to send your message."
        );
      }

      setStatus("Message sent successfully!");
      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setStatus(
        error.message === "Failed to fetch"
          ? "Cannot connect to the backend. Please check that your server is running."
          : error.message
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="portfolio">
      {/* Navigation */}
      <nav className="navbar">
        <a className="logo" href="#home">
          Mouli<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Home */}
      <section id="home" className="hero">
        <p className="tag">WELCOME TO MY PORTFOLIO</p>

        <h1>
          Hi, I'm <span>Mouli</span>
        </h1>

        <h2>B.Tech Student | Internet of Things</h2>

        <p className="intro">
          I'm learning full-stack web development and building
          useful digital experiences with modern technologies.
          Welcome to my personal portfolio!
        </p>

        <div className="hero-buttons">
          <a className="btn primary" href="#projects">
            View My Projects
          </a>

          <a className="btn secondary" href="#contact">
            Contact Me
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section">
        <p className="tag">GET TO KNOW ME</p>
        <h2>About Me</h2>

        <p className="section-text">
          Hello! I'm Mouli, a B.Tech student specializing in
          Internet of Things (IoT). I am interested in learning
          web development, programming, databases, and emerging
          technologies. I am developing my skills by creating
          practical projects and exploring full-stack development.
          My goal is to build useful, responsive, and user-friendly
          web applications.
        </p>

        <div className="about-cards">
          <div className="info-card">
            <h3>Education</h3>
            <p>B.Tech - Internet of Things</p>
          </div>

          <div className="info-card">
            <h3>Area of Interest</h3>
            <p>Full-Stack Web Development</p>
          </div>

          <div className="info-card">
            <h3>Current Goal</h3>
            <p>Learn and build real-world projects</p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section alternate">
        <p className="tag">MY TECHNICAL TOOLKIT</p>
        <h2>My Skills</h2>

        <p className="section-text">
          Technologies I am learning and using in my projects.
        </p>

        <div className="skills-grid">
          {skills.map((skill) => (
            <div className="skill-card" key={skill}>
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section">
        <p className="tag">WHAT I'M BUILDING</p>
        <h2>My Projects</h2>

        <p className="section-text">
          Here are some of my projects and project ideas.
        </p>

        <div className="projects-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <div className="project-icon">{"</>"}</div>

              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <span className="tech">{project.tech}</span>
            </article>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section alternate">
        <p className="tag">LET'S CONNECT</p>
        <h2>Contact Me</h2>

        <p className="section-text">
          Have a question or want to discuss a project?
          Send me a message using the form below.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Your Name</label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Your Email</label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Your Message</label>

          <textarea
            id="message"
            name="message"
            placeholder="Write your message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            required
          />

          <button
            className="btn primary"
            type="submit"
            disabled={sending}
          >
            {sending ? "Sending..." : "Send Message"}
          </button>

          {status && (
            <p className="form-status" role="status">
              {status}
            </p>
          )}
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Mouli</p>
        <p>Personal Portfolio Website | Full-Stack Development</p>
      </footer>
    </div>
  );
}

export default App;
