import React, { useEffect, useRef, useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaPython, FaCss3Alt } from 'react-icons/fa';
import { SiExpress } from 'react-icons/si';
import './Projects.css';

const techIcons = {
  'React':   <FaReact />,
  'Node.js': <FaNodeJs />,
  'Express': <SiExpress />,
  'Python':  <FaPython />,
  'CSS':     <FaCss3Alt />,
};

const projects = [
  {
    number: '01',
    name: 'TasteLogic',
    description: 'A comprehensive backend system designed to manage culinary data efficiently. Built with a focus on scalable architecture, clean code, and fast response times to serve front-end applications seamlessly.',
    techs: ['React', 'Node.js', 'Express', 'Python', 'CSS'],
    github: 'https://github.com/tu-usuario/tastelogic',
    demo: 'https://tastelogic.com',
  },
];

const Projects = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`projects ${visible ? 'projects-show' : 'projects-hide'}`} ref={ref}>
      <div className="projects-content">

        <h2 className="projects-title">Projects</h2>

        <div className="projects-list">
          {projects.map((project, index) => (
            <div
              key={project.number}
              className="project-card"
            >
              <span className="project-number">{project.number}</span>

              <div className="project-info">
                <h3 className="project-name">{project.name}</h3>
                <p className="project-desc">{project.description}</p>

                <div className="project-techs">
                  {project.techs.map((tech) => (
                    <span
                      key={tech}
                      data-tech={tech} 
                      className="project-tech"
                      title={tech}
                    >
                      {techIcons[tech]}
                      <span className="tech-name">{tech}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="project-links">
                <a href={project.github} target="_blank" rel="noreferrer" className="project-link" aria-label="Ver código en GitHub">
                  <FaGithub />
                </a>
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer" className="project-link" aria-label="Visitar Demo">
                    <FaExternalLinkAlt />
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Projects;